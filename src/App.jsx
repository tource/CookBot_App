import { useState } from "react";
import { WelcomePage } from "./components/WelcomePage";
import { IngredientInput } from "./components/IngredientInput";
import { RecipeList } from "./components/RecipeList";
import { AdModal } from "./components/AdModal";
import { useRewardedAd } from "./hooks/useRewardedAd";
import { getAIRecipeRecommendations } from "./services/recipeService";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome"); // 'welcome', 'main'
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingIngredients, setPendingIngredients] = useState("");
  const [notification, setNotification] = useState("");

  const { isAdReady, showRewardAd } = useRewardedAd();

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleIngredientsSubmit = async (ingredients) => {
    setPendingIngredients(ingredients);

    if (isAdReady) {
      // 광고가 준비되어 있으면 바로 광고를 보여줌
      setShowAdModal(true);
    } else {
      // 광고가 준비되지 않았으면 바로 레시피 추천
      await getRecipes(ingredients);
    }
  };

  const getRecipes = async (ingredients) => {
    setIsLoading(true);
    try {
      const recommendedRecipes = await getAIRecipeRecommendations(ingredients);
      setRecipes(recommendedRecipes);
    } catch (error) {
      console.error("레시피 추천 실패:", error);
      showNotification("레시피를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdReward = () => {
    // 광고 시청 완료 후 레시피 추천
    getRecipes(pendingIngredients);
    setPendingIngredients("");
    showNotification("광고 시청 완료 AI가 레시피를 추천해드릴게요 🎉");
  };

  const handleAdClose = () => {
    setShowAdModal(false);
    setPendingIngredients("");
  };

  const handleSelectRecipe = (recipe) => {
    showNotification(
      `${recipe.name} 레시피를 선택하셨습니다 맛있게 요리해보세요 👨‍🍳`
    );
  };

  const handleNewSearch = () => {
    setRecipes([]);
    setPendingIngredients("");
  };

  const handleStartApp = (ingredients = "") => {
    if (ingredients) {
      setPendingIngredients(ingredients);
    }
    setCurrentPage("main");
  };

  const handleBackToWelcome = () => {
    setCurrentPage("welcome");
    setRecipes([]);
    setPendingIngredients("");
  };

  if (currentPage === "welcome") {
    return <WelcomePage onStart={handleStartApp} />;
  }

  return (
    <div className="App">
      <div className="App-content">
        {recipes.length === 0 ? (
          <IngredientInput onIngredientsSubmit={handleIngredientsSubmit} />
        ) : (
          <div className="results-section">
            <div className="results-header">
              <h2>추천 결과</h2>
              <button onClick={handleNewSearch} className="new-search-button">
                새로운 검색
              </button>
            </div>
            <RecipeList
              recipes={recipes}
              onSelectRecipe={handleSelectRecipe}
              isLoading={isLoading}
            />
          </div>
        )}

        <div className="features">
          <h2>주요 기능</h2>
          <ul>
            <li>🤖 AI 기반 레시피 추천</li>
            <li>📱 보상형 광고로 무료 이용</li>
            <li>🍳 재료 기반 맞춤 추천</li>
            <li>⏱️ 조리 시간 및 난이도 표시</li>
            <li>💰 예상 비용 및 영양 정보</li>
          </ul>
        </div>
      </div>

      <AdModal
        isOpen={showAdModal}
        onClose={handleAdClose}
        onReward={handleAdReward}
      />

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default App;
