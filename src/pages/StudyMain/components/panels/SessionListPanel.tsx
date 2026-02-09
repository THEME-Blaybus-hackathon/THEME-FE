import type { FC } from 'react';
import { useDownloadPDF } from '../../../../api/pdf/queries';
import type { PDFDownloadRequest } from '../../../../api/pdf/pdf';

interface SavedSession {
  sessionId: string;
  title: string;
  objectName: string;
  timestamp: number;
}

interface Props {
  sessions: SavedSession[];
  onClose: () => void;
  selectedModel: string;
  selectedMeshName: string | null;
}

const SessionListPanel: FC<Props> = ({ sessions, onClose, selectedModel }) => {
  const { mutate: downloadPDF, isPending: isDownloading } = useDownloadPDF();

  const handleSessionClick = (sessionId: string) => {
    const payload: PDFDownloadRequest = {
      title: `${selectedModel} 학습 리포트`,
      sessionId: sessionId,
      objectName: selectedModel.toLowerCase(),
      quizId: '',
      partName: selectedModel.toLowerCase(),
    };

    downloadPDF(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div
      style={{
        width: '280px',
        backgroundColor: '#1e1e2e',
        borderRadius: '12px',
        padding: '15px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        border: '1px solid #3f3f5a',
        color: 'white',
        marginBottom: '0px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {isDownloading ? '리포트 생성 중...' : '리포트 대상 선택'}
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          opacity: isDownloading ? 0.5 : 1,
          pointerEvents: isDownloading ? 'none' : 'auto',
        }}
      >
        {sessions.length === 0 ? (
          <div
            style={{
              fontSize: '12px',
              color: '#666',
              textAlign: 'center',
              padding: '10px',
            }}
          >
            기록이 없습니다.
          </div>
        ) : (
          sessions.map((s) => (
            <div
              key={s.sessionId}
              onClick={() => handleSessionClick(s.sessionId)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#2a2a3d',
                cursor: 'pointer',
                fontSize: '12px',
                border: '1px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = '#2f54eb')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'transparent')
              }
            >
              <div
                style={{
                  fontWeight: '600',
                  marginBottom: '2px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.title}
              </div>
              <div style={{ fontSize: '10px', color: '#888' }}>
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
