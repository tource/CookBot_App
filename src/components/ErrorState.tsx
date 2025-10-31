import { Asset, Result } from "@toss/tds-mobile";

interface ErrorStateProps {
  title?: string;
  description?: string;
  detail?: string;
  onRetry: () => void;
}

export default function ErrorState({
  title = "레시피를 불러오는 중 오류가 발생했습니다.",
  description = "페이지를 불러올 수 없습니다\n다시 시도해주세요",
  detail,
  onRetry,
}: ErrorStateProps) {
  const descriptionDetail = detail ? detail : description;

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh", // ✅ 모바일에서도 꽉 차게
        display: "flex", // ✅ 가운데 정렬
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <Result
        figure={
          <Asset.Icon
            name="icn-info-line"
            frameShape={Asset.frameShape.CleanH24}
          />
        }
        title={
          <span style={{ color: "#000" }}>{title}</span> // ✅ 혹시 대비 문제 대비
        }
        description={
          <span style={{ whiteSpace: "pre-line", color: "#666" }}>
            {descriptionDetail}
          </span>
        }
        button={<Result.Button onClick={onRetry}>재시도</Result.Button>}
      />
    </div>
  );
}
