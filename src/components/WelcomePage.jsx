import { useState, useEffect } from "react";
// import { IngredientInputPage } from "./IngredientInputPage";
import "./WelcomePage.css";

export function WelcomePage({ onStart }) {
  const [currentStep, setCurrentStep] = useState(0);
  // const [showIngredientPage, setShowIngredientPage] = useState(false);

  useEffect(() => {
    // 이미 환영 화면을 본 적이 있으면 바로 메인으로 이동
    const seen = localStorage.getItem("cookbot_seen_welcome");
    if (seen === "1") {
      // 재료가 없을 수 있으므로 빈 배열로 시작 호출
      onStart([]);
    }
  }, [onStart]);

  const steps = [
    {
      number: 1,
      title: "재료를 입력해주세요",
      description: "냉장고에 있는 재료들을 쉼표로 구분해서 입력하세요",
    },
    {
      number: 2,
      title: "광고를 시청하세요",
      description: "짧은 광고 시청 후 AI 레시피를 받으세요",
    },
    {
      number: 3,
      title: "맛있는 요리 완성",
      description: "AI가 추천한 레시피로 맛있는 요리를 만들어보세요",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 더 이상 별도 입력 페이지 없이 바로 시작.
      localStorage.setItem("cookbot_seen_welcome", "1");
      onStart([]); // 재료 입력 페이지가 없으므로 빈 배열로 시작
    }
  };

  // 삭제된 컴포넌트 관련 핸들러 제거
  // const handleIngredientNext = (ingredients) => { ... }
  // const handleBackToWelcome = () => { ... }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // if (showIngredientPage) { ... IngredientInputPage ... }

  return (
    <div className="welcome-page">
      {/* Main Content */}
      <div className="welcome-content">
        <div className="welcome-image">
          <div className="cookbot-illustration">
            <img
              src="/assets/cookbot.png"
              alt="CookBot AI Chef"
              className="cookbot-image"
            />
          </div>
        </div>

        <div className="welcome-text">
          <h2 className="welcome-subtitle">
            AI가 추천하는 맞춤 레시피를 만나보세요
          </h2>
          <p className="welcome-description">
            가지고 있는 재료만으로도 맛있는 요리를 만들 수 있어요
          </p>
        </div>

        {/* Steps */}
        <div className="steps-container">
          <h3 className="steps-title">사용 방법</h3>
          <div className="steps-list">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`step-item ${index === currentStep ? "active" : ""}`}
              >
                <div className="step-number">
                  <span className="step-number-text">{step.number}</span>
                </div>
                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < steps.length - 1 && <div className="step-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="welcome-footer">
        <button className="next-button" onClick={handleNext}>
          {currentStep < steps.length - 1 ? "다음" : "시작하기"}
        </button>
      </div>
    </div>
  );
}
