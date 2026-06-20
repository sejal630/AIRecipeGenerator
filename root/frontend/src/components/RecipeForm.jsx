import React, { useState } from 'react';
import { Sparkles, Plus, X, Utensils } from 'lucide-react';

const SUGGESTED_INGREDIENTS = [
  'Tomato', 'Onion', 'Garlic', 'Paneer', 'Chicken', 
  'Potato', 'Spinach', 'Mushroom', 'Bell Pepper', 'Cheese'
];

const CUISINES = [
  { value: 'Any', label: 'Any Cuisine' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Mexican', label: 'Mexican' }
];

export default function RecipeForm({ onSubmit, loading }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [cuisine, setCuisine] = useState('Any');
  const [error, setError] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const cleaned = inputValue.trim().replace(/,$/, '');
    if (cleaned === '') return;
    
    if (tags.some(tag => tag.toLowerCase() === cleaned.toLowerCase())) {
      setError('Ingredient already added!');
      setTimeout(() => setError(''), 2000);
      return;
    }
    
    setTags([...tags, cleaned]);
    setInputValue('');
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const addSuggested = (ingredient) => {
    if (tags.some(tag => tag.toLowerCase() === ingredient.toLowerCase())) {
      return;
    }
    setTags([...tags, ingredient]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // We can also treat whatever is in the input box as a tag if they forgot to press enter
    let finalTags = [...tags];
    const cleanedInput = inputValue.trim();
    if (cleanedInput !== '') {
      if (!finalTags.some(tag => tag.toLowerCase() === cleanedInput.toLowerCase())) {
        finalTags.push(cleanedInput);
      }
    }

    if (finalTags.length === 0) {
      setError('Please add at least one ingredient.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    onSubmit({
      ingredients: finalTags.join(', '),
      cuisine
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <h2 className="form-title">
        <Utensils size={24} style={{ color: 'var(--accent-orange)' }} />
        What's in your fridge?
      </h2>

      <div className="form-group">
        <label className="form-label">Available Ingredients</label>
        <div className="tags-input-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag-pill">
              {tag}
              <button
                type="button"
                className="tag-close"
                onClick={() => removeTag(index)}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <input
            type="text"
            className="tags-input"
            placeholder={tags.length === 0 ? "Type e.g., paneer, press Enter" : "Add more..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            disabled={loading}
          />
        </div>
        <p className="helper-text">
          Type an ingredient and press <strong>Enter</strong> or <strong>Comma</strong>
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Popular Suggestions</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {SUGGESTED_INGREDIENTS.map((ing) => {
            const isAdded = tags.some(t => t.toLowerCase() === ing.toLowerCase());
            return (
              <button
                key={ing}
                type="button"
                className="tag-pill"
                style={{
                  cursor: isAdded ? 'default' : 'pointer',
                  opacity: isAdded ? 0.5 : 1,
                  background: isAdded ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                  borderColor: isAdded ? 'transparent' : 'var(--border-color)',
                  color: isAdded ? 'var(--text-muted)' : 'var(--text-secondary)'
                }}
                onClick={() => !isAdded && addSuggested(ing)}
                disabled={loading || isAdded}
              >
                <Plus size={12} style={{ marginRight: '4px', display: isAdded ? 'none' : 'inline' }} />
                {ing}
              </button>
            );
          })}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="cuisine-dropdown">Cuisine Type</label>
        <select
          id="cuisine-dropdown"
          className="custom-select"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          disabled={loading}
        >
          {CUISINES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        <Sparkles size={18} />
        {loading ? 'Generating Recipe...' : 'Generate Recipe'}
      </button>

      {error && (
        <div className="error-alert">
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
