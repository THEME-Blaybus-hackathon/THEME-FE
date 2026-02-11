import React, { useState, useEffect, useRef } from 'react';
import {
  useAIHistory,
  useAskAI,
  useDeleteSession,
  useAiSessions,
} from '../../../../api/ai/queries';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  objectName: string;
  selectedPart?: string | null;
}

interface SavedSession {
  sessionId: string;
  title: string;
  objectName: string;
  timestamp: number;
}

export interface AISessionSummary {
  sessionId: string;
  objectName: string;
}

const AIAvatar = () => (
  <div
    style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom right, #7388f5, #9e7bf2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      fontSize: '14px',
    }}
  >
    ✦
  </div>
);

const AIAssistantPanel: React.FC<Props> = ({ objectName, selectedPart }) => {
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: history, isLoading } = useAIHistory(sessionId);
  const { mutate: ask, isPending } = useAskAI(objectName);
  const { mutate: deleteSession } = useDeleteSession(objectName);
  const { data: aiSessions = [] } = useAiSessions(objectName);
  const [lastSentMessage, setLastSentMessage] = useState('');

  const [sessionList, setSessionList] = useState<SavedSession[]>(() => {
    const saved =
      typeof window !== 'undefined'
        ? localStorage.getItem('ai_chat_sessions')
        : null;
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isPending]);

  const saveSessionToList = (newId: string, firstMsg: string) => {
    const newList = [
      { sessionId: newId, title: firstMsg, objectName, timestamp: Date.now() },
      ...sessionList.filter((s) => s.sessionId !== newId),
    ];
    setSessionList(newList);
    localStorage.setItem('ai_chat_sessions', JSON.stringify(newList));
  };
  const handleSend = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      if ('preventDefault' in e) e.preventDefault();
    }

    if (!input.trim() || isPending) return;

    const currentInput = input;
    setLastSentMessage(currentInput);
    setInput('');

    ask(
      {
        message: currentInput,
        objectName: objectName.toLowerCase(),
        sessionId: sessionId,
        selectedPart: selectedPart || null,
      },
      {
        onSuccess: (res) => {
          setLastSentMessage('');
          if (!sessionId && res.sessionId) {
            setSessionId(res.sessionId);
            saveSessionToList(res.sessionId, currentInput);
          }
        },
      },
    );
  };

  const handleNewChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionId(null);
    setInput('');
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('이 대화를 삭제하시겠습니까?')) {
      deleteSession(id, {
        onSuccess: () => {
          const newList = sessionList.filter((s) => s.sessionId !== id);
          setSessionList(newList);
          localStorage.setItem('ai_chat_sessions', JSON.stringify(newList));
          if (sessionId === id) setSessionId(null);
        },
      });
    }
  };

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        display: 'flex',
        height: '550px',
        width: isSidebarOpen ? '550px' : '550px',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        background: 'linear-gradient(135deg, #5868CD30 0%, #DFE2E54D 100%)',
        backdropFilter: 'blur(15px)',
        fontFamily: 'sans-serif',
        zIndex: 1000,
        pointerEvents: 'auto',
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // 부드러운 애니메이션
      }}
    >
      {/* ⬅️ 왼쪽: 세션 리스트 사이드바 (아코디언 기능) */}
      <div
        style={{
          width: isSidebarOpen ? '220px' : '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRight: isSidebarOpen
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : 'none',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.4s ease',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div style={{ padding: '20px', minWidth: '220px' }}>
          <button
            onClick={handleNewChat}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(47, 84, 235, 0.8)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
            }}
          >
            + New Chat
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 12px 20px',
            minWidth: '220px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              opacity: 0.5,
              marginBottom: '10px',
              paddingLeft: '8px',
            }}
          >
            최근 대화 목록
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {aiSessions.map((s) => (
              <div
                key={s.sessionId}
                onClick={(e) => {
                  e.stopPropagation();
                  setSessionId(s.sessionId);
                }}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  backgroundColor:
                    sessionId === s.sessionId
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  border:
                    sessionId === s.sessionId
                      ? '1px solid rgba(255,255,255,0.2)'
                      : '1px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    fontSize: '10px',
                    opacity: 0.5,
                    marginTop: '4px',
                  }}
                >
                  <span>{s.objectName}</span>
                  <span
                    style={{
                      fontSize: '9px',
                      opacity: 0.6,
                      fontFamily: 'monospace',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {s.sessionId}
                  </span>
                </div>
                <button
                  onClick={(e) => handleDeleteSession(s.sessionId, e)}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '14px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    opacity: 0.3,
                    cursor: 'pointer',
                    fontSize: '10px',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ➡️ 오른쪽: 메인 채팅 영역 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* ✅ 사이드바 토글 버튼 (아코디언) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen(!isSidebarOpen);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              marginRight: '10px',
              transition: 'transform 0.4s',
              transform: isSidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <span style={{ fontSize: '14px', fontWeight: 'bold', flex: 1 }}>
            AI Assistant
          </span>
          <span style={{ fontSize: '11px', opacity: 0.6 }}>{objectName}</span>
        </div>

        {/* 메시지 영역 */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {isLoading && (
            <div
              style={{ textAlign: 'center', opacity: 0.5, fontSize: '12px' }}
            >
              기록 로딩 중...
            </div>
          )}

          {(!history || history.messages.length === 0) &&
            !isLoading &&
            !isPending && (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                }}
              >
                <AIAvatar />
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '12px 16px',
                    borderRadius: '2px 18px 18px 18px',
                    fontSize: '13px',
                    maxWidth: '80%',
                  }}
                >
                  해당 3D 모델에 대해 궁금한 점을 질문해주세요.
                </div>
              </div>
            )}
          {/* 1. 기존 대화 목록 */}
          {history?.messages.map((msg: any) => {
            // ✅ role 확인: 콘솔에서 보셨을 때 대문자면 "USER", 소문자면 "user"
            const isUser = msg.role === 'USER' || msg.role === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start', // 사용자면 오른쪽
                  width: '100%',
                  marginBottom: '15px',
                }}
              >
                {/* AI일 때만 아바타 표시 */}
                {!isUser && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px',
                    }}
                  >
                    <AIAvatar />
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>
                      Assistant
                    </span>
                  </div>
                )}

                <div
                  style={{
                    backgroundColor: isUser ? '#2F54EB' : 'transparent',
                    padding: '10px 14px',
                    borderRadius: isUser
                      ? '16px 16px 2px 16px'
                      : '2px 16px 16px 16px',
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: isUser ? '85%' : '95%',
                    fontSize: '13.5px',
                  }}
                >
                  {isUser ? (
                    msg.content
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => (
                          <p style={{ marginBottom: '8px', lineHeight: 1.6 }}>
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul
                            style={{
                              paddingLeft: '18px',
                              marginBottom: '10px',
                              listStyle: 'none',
                            }}
                          >
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li style={{ marginBottom: '6px' }}>{children}</li>
                        ),
                        strong: ({ children }) => (
                          <span style={{ fontWeight: 700, color: '#9FB7FF' }}>
                            {children}
                          </span>
                        ),
                      }}
                    >
                      {msg.answer || msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            );
          })}

          {/* ✅ 2. 추가: 답변 기다리는 동안 내 질문 즉시 보여주기 */}
          {isPending && lastSentMessage && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%',
                marginBottom: '15px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#2F54EB',
                  padding: '10px 14px',
                  borderRadius: '16px 16px 2px 16px',
                  alignSelf: 'flex-end',
                  maxWidth: '85%',
                  fontSize: '13.5px',
                  color: 'white',
                }}
              >
                {lastSentMessage}
              </div>
            </div>
          )}

          {/* 3. AI 분석 중... 로딩 표시 */}
          {isPending && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                }}
              >
                <AIAvatar />
                <span style={{ fontSize: '11px', opacity: 0.7 }}>
                  AI 분석 중...
                </span>
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '12px 16px',
                  borderRadius: '2px 16px 16px 16px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                답변을 생성하고 있습니다...
              </div>
            </div>
          )}
        </div>

        {/* 입력 영역 */}
        <div
          style={{ padding: '20px', background: 'rgba(0,0,0,0.15)' }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {selectedPart && (
            <div
              style={{
                marginBottom: '10px',
                fontSize: '10px',
                backgroundColor: 'rgba(47, 84, 235, 0.4)',
                width: 'fit-content',
                padding: '3px 10px',
                borderRadius: '10px',
                border: '1px solid rgba(47, 84, 235, 0.6)',
              }}
            >
              📍 {selectedPart}
            </div>
          )}
          <div style={{ position: 'relative' }}>
            <input
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '12px 45px 12px 18px',
                color: 'white',
                fontSize: '13px',
                outline: 'none',
              }}
              value={input}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="질문을 입력하세요..."
            />
            <button
              onClick={handleSend}
              disabled={isPending || !input.trim() || isLoading}
              style={{
                position: 'absolute',
                right: '6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor:
                  isPending || !input.trim()
                    ? 'rgba(255,255,255,0.1)'
                    : '#2F54EB',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;
