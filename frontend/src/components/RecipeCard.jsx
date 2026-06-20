import React, { useState, useEffect } from 'react';
import { Clock, Flame, ListChecks, Printer, ChefHat, RotateCcw } from 'lucide-react';

export default function RecipeCard({ recipe, onReset }) {
  // Store the checked state of instructions
  const [checkedSteps, setCheckedSteps] = useState({});

  // Reset checked steps whenever the recipe changes
  useEffect(() => {
    setCheckedSteps({});
  }, [recipe]);

  if (!recipe) return null;

  const { recipeName, preparationTime, ingredients, instructions, estimatedCalories } = recipe;

  const toggleStep = (index) => {
    setCheckedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-card" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div className="recipe-card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <h2 className="recipe-title">{recipeName}</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePrint}
              className="theme-toggle-btn"
              title="Print Recipe"
              style={{ width: '38px', height: '38px' }}
            >
              <Printer size={16} />
            </button>
            <button
              onClick={onReset}
              className="theme-toggle-btn"
              title="Generate Another"
              style={{ width: '38px', height: '38px' }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        <div className="recipe-meta-grid" style={{ marginTop: '1rem' }}>
          <div className="meta-badge">
            <Clock size={16} />
            <div>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>TIME</span>
              <strong>{preparationTime}</strong>
            </div>
          </div>
          <div className="meta-badge">
            <Flame size={16} />
            <div>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>CALORIES</span>
              <strong>{estimatedCalories}</strong>
            </div>
          </div>
          <div className="meta-badge">
            <ChefHat size={16} />
            <div>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>DIFFICULTY</span>
              <strong>Medium</strong>
            </div>
          </div>
          <div className="meta-badge">
            <ListChecks size={16} />
            <div>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>STEPS</span>
              <strong>{instructions.length} Steps</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-section">
        <h3 className="section-heading">
          <ChefHat size={20} />
          Ingredients
        </h3>
        <div className="ingredients-grid">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <div className="ingredient-bullet"></div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {ingredient}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-section" style={{ marginBottom: 0 }}>
        <h3 className="section-heading">
          <ListChecks size={20} />
          Step-by-Step Instructions
        </h3>
        <div>
          {instructions.map((step, index) => {
            const isChecked = !!checkedSteps[index];
            return (
              <div
                key={index}
                className={`instruction-step ${isChecked ? 'checked' : ''}`}
                onClick={() => toggleStep(index)}
              >
                <input
                  type="checkbox"
                  className="step-checkbox"
                  checked={isChecked}
                  onChange={() => {}} // Handled by container click
                />
                <span className="step-number">{index + 1}</span>
                <p className="step-text">{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
