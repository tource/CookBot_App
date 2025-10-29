import { useCallback, useRef, useState } from "react";

// 웹 환경에서는 실제 광고 대신 모의 광고를 사용합니다
const MOCK_AD_GROUP_ID = "mock-rewarded-ad-id";

export function useRewardedAd() {
  const [loading, setLoading] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);
  const cleanupRef = useRef(null);
  const rewardCallbackRef = useRef(null);
  const dismissCallbackRef = useRef(null);

  const loadRewardAd = useCallback(() => {
    setLoading(true);
    setIsAdReady(false);

    // 웹 환경에서는 즉시 로드 완료로 처리
    setTimeout(() => {
      setLoading(false);
      setIsAdReady(true);
    }, 1000);
  }, []);

  const showRewardAd = useCallback(
    ({ onRewarded, onDismiss }) => {
      if (!isAdReady) {
        console.warn("광고가 준비되지 않았습니다.");
        return;
      }

      rewardCallbackRef.current = onRewarded;
      dismissCallbackRef.current = onDismiss;

      // 웹 환경에서는 모의 광고 시청 시뮬레이션
      const adDuration = 3000; // 3초 광고 시청 시뮬레이션

      // 광고 시청 시작
      console.log("광고 시청 시작...");

      setTimeout(() => {
        // 광고 시청 완료 후 보상 지급
        console.log("광고 시청 완료 보상 지급");
        rewardCallbackRef.current?.();
        rewardCallbackRef.current = null;
        dismissCallbackRef.current?.();
        dismissCallbackRef.current = null;
      }, adDuration);
    },
    [isAdReady]
  );

  return {
    loading,
    isAdReady,
    loadRewardAd,
    showRewardAd,
  };
}
