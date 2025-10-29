import { useEffect } from "react";
import "./AdModal.css";

export function AdModal({ isOpen, onClose, onReward }) {
  useEffect(() => {
    if (isOpen) {
      // 광고 시청 시뮬레이션
      const timer = setTimeout(() => {
        onReward();
        onClose();
      }, 3000); // 3초 후 자동으로 보상 지급

      return () => clearTimeout(timer);
    }
  }, [isOpen, onReward, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className="ad-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ad-content">
          <div className="ad-header">
            <h2>🎬 광고 시청 중...</h2>
            <p>잠시만 기다려주세요</p>
          </div>

          <div className="ad-video">
            <div className="video-placeholder">
              <div className="play-button">▶️</div>
              <p>광고 영상 재생 중...</p>
            </div>
          </div>

          <div className="ad-info">
            <div className="reward-info">
              <span className="reward-icon">🎁</span>
              <span className="reward-text">
                광고 시청 후 AI 레시피를 받으세요!
              </span>
            </div>
            <div className="countdown">
              <span className="countdown-text">광고 종료까지</span>
              <span className="countdown-number">3초</span>
            </div>
          </div>

          <div className="ad-actions">
            <button onClick={onClose} className="ad-close-button">
              나중에 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
