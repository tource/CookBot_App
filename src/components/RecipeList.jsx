import { RecipeCard } from "./RecipeCard";
import "./RecipeList.css";

export function RecipeList({ recipes, onSelectRecipe, isLoading }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="recipe-list">
        <div className="empty-state">
          <div className="empty-icon">🍳</div>
          <h3>추천할 레시피가 없어요</h3>
          <p>다른 재료를 입력해보시거나 더 많은 재료를 추가해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>🤖 AI 추천 레시피</h2>
        <p className="recipe-count">{recipes.length}개의 레시피를 찾았어요</p>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelectRecipe={onSelectRecipe}
          />
        ))}
      </div>
    </div>
  );
}
