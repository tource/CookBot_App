import { useState } from "react";
import { RecipeList } from "./RecipeList";
import { Asset, Top, Text } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import "./IngredientInput.css";
import ErrorState from "./ErrorState";

export function IngredientInput() {
  const [ingredients, setIngredients] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    if (!ingredients.trim()) {
      alert("재료를 입력해주세요");
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    setRecipes([]);

    try {
      const prompt = `
당신은 요리 전문가이자 JSON 데이터만 출력하는 AI입니다.
사용자가 입력한 재료로 만들 수 있는 간단하고 맛있는 요리 5가지를 추천하세요.

출력 형식은 반드시 JSON 배열로만 작성하세요.
JSON 이외의 설명, 문장, 주석, 문법 표시는 절대 포함하지 마세요.

각 레시피는 다음 구조를 따릅니다:

[
  {
    "id": 1,
    "name": "요리 이름",
    "category": "한식/양식/중식 등",
    "difficulty": "하/중/상",
    "cookingTime": "조리 시간 (예: 15분)",
    "aiReason": "이 요리를 추천한 이유 (입력된 재료를 어떻게 활용하는지 설명)",
    "aiConfidence": 0.9,
    "estimatedCost": 3000,
    "nutritionScore": 80,
    "description": "짧고 직관적인 요리 소개",
    "ingredients": ["재료1", "재료2", "재료3"],
    "instructions": [
      "1단계 - 재료 계량: 닭고기 300g, 양파 1개, 식용유 2큰술, 케찹 3큰술, 치즈 50g",
      "2단계 - 구체적인 조리 설명 (예: 팬에 식용유를 두르고 달걀을 익힌다.)",
      "3단계 - 구체적인 조리 설명",
      "4단계 - 완성 및 플레이팅 설명"
    ]
  }
]

조건:
- 출력은 반드시 유효한 JSON 배열 형태여야 합니다.
- 'instructions'에는 최소 2단계 이상 포함되어야 합니다.
- 각 단계는 '1단계 -' 형태로 시작하고, 구체적 조리 동작을 설명하세요.
- 입력된 재료를 반드시 활용하세요.
- 한국어로 작성하세요.

입력된 재료: ${ingredients}
`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
        }),
      });

      if (!res.ok) throw new Error("AI 요청 실패");

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "";

      const jsonStart = content.indexOf("[");
      const jsonEnd = content.lastIndexOf("]");
      const jsonString = content.slice(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(jsonString);

      setRecipes(parsed);
    } catch (error) {
      console.error("AI 요청 실패:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const handleSelectRecipe = (recipe) => {
    alert(`'${recipe.name}' 레시피를 선택했습니다`);
  };

  if (isError) {
    return (
      <ErrorState
        description="예상치 못한 오류가 발생했어요."
        detail={isError} // <-- isError 상태 사용
        onRetry={() => {
          setIsError(""); // 오류 초기화
          setStep("intro");
        }}
      />
    );
  }
  if (isLoading) {
    // 로딩 UI
    return (
      <div
        className="loading-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <Top
          subtitleBottom={
            <Top.SubtitleParagraph
              color={adaptive.grey500}
              style={{
                whiteSpace: "normal",
                wordBreak: "keep-all",
                lineHeight: "1.4",
                textAlign: "center",
                display: "block",
              }}
            >
              🍳 AI가 맛있는 레시피를 찾는 중이에요...
            </Top.SubtitleParagraph>
          }
        />

        <div style={{ marginTop: 24 }} />

        <Asset.Lottie
          frameShape={{ width: 220 }}
          src="https://static.toss.im/lotties/loading/load-ripple.json"
          loop
          speed={1}
          aria-hidden={true}
        />

        <Text
          color={adaptive.grey600}
          typography="t7"
          fontWeight="regular"
          style={{ marginTop: 12 }}
        >
          잠시만 기다려주세요
        </Text>
      </div>
    );
  }

  // 메인 입력 UI
  return (
    <div className="ingredient-input">
      <h2>🍳 가지고 있는 재료를 알려주세요</h2>
      <p className="description">
        냉장고에 있는 재료들을 쉼표로 구분해서 입력해주세요
      </p>

      <div className="input-container">
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          onBlur={() => {
            // 키보드 닫힐 때 원래 위치 복원
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          placeholder="예: 계란, 양파, 밥, 치즈"
          className="ingredient-textarea"
        />
      </div>

      <div className="button-container">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !ingredients.trim()}
          className="submit-button"
        >
          {isSubmitting ? "AI가 요리 중..." : "레시피 추천받기"}
        </button>
      </div>

      <RecipeList
        recipes={recipes}
        onSelectRecipe={handleSelectRecipe}
        isLoading={isLoading}
      />
    </div>
  );
}
