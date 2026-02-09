import type { FC } from "react";
import { useDownloadPDF } from "../../../../api/pdf/queries"; // 경로 확인
import type { PDFDownloadRequest } from "../../../../api/pdf/pdf";

interface SavedSession {
  sessionId: string;
  title: string;
  objectName: string;
  timestamp: number;
}

interface Props {
  sessions: SavedSession[];
  onClose: () => void;
  // 부품 이름 등 외부 상태가 필요하므로 추가로 받습니다.
  selectedModel: string;
  selectedMeshName: string | null;
}

const SessionListPanel: FC<Props> = ({
  sessions,
  onClose,
  selectedModel,
  selectedMeshName,
}) => {
  // ✅ 1. 패널 내부에서 다운로드 훅 사용
  const { mutate: downloadPDF, isPending: isDownloading } = useDownloadPDF();

  // ✅ 2. 세션 클릭 시 바로 PDF 요청 실행
  const handleSessionClick = (sessionId: string) => {
    const payload: PDFDownloadRequest = {
      title: `${selectedModel} 학습 리포트`,
      sessionId: sessionId,
      objectName: selectedModel.toLowerCase(),
      quizId: "",
      partName: selectedModel.toLowerCase(),
    };

    downloadPDF(payload, {
      onSuccess: () => {
        onClose(); // 다운로드 시작 성공 시 패널 닫기
      },
    });
  };

  return (
    <div
      style={{
        // position: "absolute" 제거 (부모가 flex이므로 필요 없음)
        width: "280px",
        backgroundColor: "#1e1e2e",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        border: "1px solid #3f3f5a",
        color: "white",
        marginBottom: "0px", // 하단 정렬을 위해 필요시 조절
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          {isDownloading ? "리포트 생성 중..." : "리포트 대상 선택"}
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          opacity: isDownloading ? 0.5 : 1, // 다운로드 중엔 클릭 방지 시각화
          pointerEvents: isDownloading ? "none" : "auto",
        }}
      >
        {sessions.length === 0 ? (
          <div
            style={{
              fontSize: "12px",
              color: "#666",
              textAlign: "center",
              padding: "10px",
            }}
          >
            기록이 없습니다.
          </div>
        ) : (
          sessions.map((s) => (
            <div
              key={s.sessionId}
              onClick={() => handleSessionClick(s.sessionId)} // ✅ 직접 실행
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#2a2a3d",
                cursor: "pointer",
                fontSize: "12px",
                border: "1px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2f54eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
            >
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "2px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.title}
              </div>
              <div style={{ fontSize: "10px", color: "#888" }}>
                {new Date(s.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SessionListPanel;
