import { useState } from "react";
import "./RecipeCard.css";

export function RecipeCard({ recipe, onSelectRecipe }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelect = () => {
    onSelectRecipe(recipe);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <h3 className="recipe-name">{recipe.name}</h3>
        <div className="recipe-badges">
          <span className="badge badge-secondary">{recipe.category}</span>
          <span className="badge badge-outline">{recipe.difficulty}</span>
          <span className="badge badge-outline">{recipe.cookingTime}</span>
        </div>
      </div>

      <p className="recipe-description">{recipe.description}</p>

      {recipe.aiReason && (
        <div className="ai-reason">
          <span className="ai-icon">🤖</span>
          <span className="ai-text">{recipe.aiReason}</span>
        </div>
      )}

      <div className="recipe-stats">
        <div className="stat">
          <span className="stat-label">AI 신뢰도</span>
          <span className="stat-value">
            {Math.round(recipe.aiConfidence * 100)}%
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">예상 비용</span>
          <span className="stat-value">
            {recipe.estimatedCost.toLocaleString()}원
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">영양 점수</span>
          <span className="stat-value">{recipe.nutritionScore}점</span>
        </div>
      </div>

      <div className="recipe-ingredients">
        <h4>필요한 재료</h4>
        <div className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <span key={index} className="ingredient-tag">
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div className="recipe-actions">
        <button onClick={toggleExpanded} className="action-button outline">
          {isExpanded ? "접기" : "상세보기"}
        </button>
      </div>

      {isExpanded && (
        <div className="recipe-details">
          <h4>조리 방법</h4>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="instruction">
                <strong>{instruction}</strong>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
