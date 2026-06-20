import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, ChefHat, Heart, Link } from 'lucide-react';
import RecipeForm from './components/RecipeForm';
import RecipeCard from './components/RecipeCard';
import Loader from './components/Loader';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('recipe-app-theme') || 'light';
  });
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('recipe-app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleGenerateRecipe = async ({ ingredients, cuisine }) => {
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const response = await fetch('/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients, cuisine })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate recipe. Please try again.');
      }

      setRecipe(data);
    } catch (err) {
      console.error('Frontend error generating recipe:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-inner">
          <a href="/" className="app-logo">
            <div className="logo-icon">
              <ChefHat size={22} />
            </div>
            <span className="logo-text">AI Recipe Generator</span>
          </a>

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">Turn Ingredients into Gourmet Meals</h1>
          <p className="hero-subtitle">
            Enter the ingredients you have on hand, select your favorite cuisine, and let AI cook up the perfect recipe for you.
          </p>
        </section>

        <div className="container-grid">
          <div className="form-column">
            <RecipeForm onSubmit={handleGenerateRecipe} loading={loading} />
            
            {error && (
              <div className="error-alert" style={{ marginTop: '1.5rem' }}>
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="display-column">
            {loading && <Loader />}
            
            {!loading && recipe && (
              <RecipeCard recipe={recipe} onReset={() => setRecipe(null)} />
            )}

            {!loading && !recipe && (
              <div className="empty-state glass-card">
                <ChefHat className="empty-icon" />
                <h3 className="empty-title">Ready to cook?</h3>
                <p>Your generated recipe will appear here. Fill out the form on the left to start!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Made with <Heart size={14} style={{ color: 'var(--accent-red)', display: 'inline', fill: 'var(--accent-red)' }} /> Sejal Saini <a href="https://www.linkedin.com/in/sejal-58b972324/">LinkedIn</a> &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
