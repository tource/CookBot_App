// AI 레시피 추천 서비스
// 실제 환경에서는 OpenAI API나 다른 AI 서비스를 사용할 수 있습니다

const SAMPLE_RECIPES = [
  {
    id: 1,
    name: "계란 볶음밥",
    description: "간단하고 맛있는 기본 볶음밥",
    ingredients: ["계란", "밥", "양파", "대파"],
    instructions: [
      "1. 팬에 기름을 두르고 계란을 풀어서 스크램블",
      "2. 계란을 덜어내고 양파를 볶기",
      "3. 밥을 넣고 볶다가 계란을 다시 넣기",
      "4. 대파를 넣고 마무리",
    ],
    cookingTime: "15분",
    difficulty: "쉬움",
    category: "한식",
  },
  {
    id: 2,
    name: "토마토 파스타",
    description: "신선한 토마토로 만드는 이탈리안 파스타",
    ingredients: ["토마토", "파스타면", "마늘", "올리브오일", "바질"],
    instructions: [
      "1. 파스타면을 끓는 물에 삶기",
      "2. 팬에 올리브오일과 마늘을 볶기",
      "3. 토마토를 넣고 끓이기",
      "4. 삶은 파스타면을 넣고 볶기",
      "5. 바질을 넣고 마무리",
    ],
    cookingTime: "20분",
    difficulty: "보통",
    category: "양식",
  },
  {
    id: 3,
    name: "치즈 토스트",
    description: "간단한 아침식사용 토스트",
    ingredients: ["빵", "치즈", "버터"],
    instructions: [
      "1. 빵에 버터를 바르기",
      "2. 치즈를 올리기",
      "3. 오븐이나 토스터에서 5분간 굽기",
    ],
    cookingTime: "5분",
    difficulty: "쉬움",
    category: "간식",
  },
  {
    id: 4,
    name: "김치찌개",
    description: "얼큰하고 시원한 김치찌개",
    ingredients: ["김치", "돼지고기", "두부", "대파", "고춧가루"],
    instructions: [
      "1. 돼지고기를 볶기",
      "2. 김치를 넣고 볶기",
      "3. 물을 넣고 끓이기",
      "4. 두부를 넣고 끓이기",
      "5. 대파와 고춧가루로 마무리",
    ],
    cookingTime: "30분",
    difficulty: "보통",
    category: "한식",
  },
  {
    id: 5,
    name: "샐러드",
    description: "신선한 야채로 만드는 건강한 샐러드",
    ingredients: ["양상추", "토마토", "오이", "양파", "올리브오일", "식초"],
    instructions: [
      "1. 모든 야채를 적당한 크기로 자르기",
      "2. 올리브오일과 식초로 드레싱 만들기",
      "3. 야채에 드레싱을 뿌리기",
    ],
    cookingTime: "10분",
    difficulty: "쉬움",
    category: "샐러드",
  },
];

// 재료 기반으로 레시피를 필터링하는 함수
export function findRecipesByIngredients(inputIngredients) {
  const ingredients = inputIngredients
    .toLowerCase()
    .split(",")
    .map((ing) => ing.trim());

  return SAMPLE_RECIPES.filter((recipe) => {
    return ingredients.some((ingredient) =>
      recipe.ingredients.some(
        (recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(ingredient) ||
          ingredient.includes(recipeIngredient.toLowerCase())
      )
    );
  });
}

// AI 레시피 추천 시뮬레이션 (실제로는 AI API 호출)
export async function getAIRecipeRecommendations(ingredients) {
  // 실제 환경에서는 여기서 AI API를 호출합니다
  // 예: OpenAI API, Claude API 등

  return new Promise((resolve) => {
    setTimeout(() => {
      const recipes = findRecipesByIngredients(ingredients);

      // AI가 추천하는 것처럼 보이도록 추가 정보 생성
      const recommendations = recipes.map((recipe) => ({
        ...recipe,
        aiConfidence: Math.random() * 0.3 + 0.7, // 70-100% 신뢰도
        aiReason: generateAIReason(recipe, ingredients),
        estimatedCost: Math.floor(Math.random() * 10000) + 5000, // 5천원~1만5천원
        nutritionScore: Math.floor(Math.random() * 40) + 60, // 60-100점
      }));

      resolve(recommendations);
    }, 2000); // 2초 지연으로 AI 처리 시뮬레이션
  });
}

// AI가 추천하는 이유 생성
function generateAIReason(recipe, ingredients) {
  const reasons = [
    `입력하신 재료 중 ${recipe.ingredients
      .filter((ing) =>
        ingredients.some(
          (inputIng) =>
            inputIng.includes(ing.toLowerCase()) ||
            ing.toLowerCase().includes(inputIng)
        )
      )
      .join(", ")}를 활용할 수 있어요`,
    `현재 계절에 딱 맞는 ${recipe.category} 요리입니다.`,
    `조리 시간이 ${recipe.cookingTime}로 적당해요.`,
    `영양 균형이 잘 맞춰진 건강한 요리입니다.`,
    `간단하면서도 맛있는 ${recipe.difficulty} 난이도 요리예요.`,
  ];

  return reasons[Math.floor(Math.random() * reasons.length)];
}

// 레시피 상세 정보 가져오기
export function getRecipeById(id) {
  return SAMPLE_RECIPES.find((recipe) => recipe.id === parseInt(id));
}
