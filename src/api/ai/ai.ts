import api from '../axiosInstance';

// === 인터페이스 정의 ===
export interface AiChatRequest {
  message: string; // 필수
  objectName: string; // 필수
  sessionId?: string | null; // 선택 (없으면 새 세션)
  selectedPart?: string | null; // 선택
}
export interface AiChatResponse {
  sessionId: string;
  answer: string; // ✅ 'content'가 아니라 'answer'여야 합니다!
  messageId: number;
  newSession: boolean;
}
export interface ChatMessage {
  id: number;
  role: 'USER' | 'ASSISTANT'; // 백엔드 대문자 기준
  content: string;
  selectedPart?: string;
  createdAt: string;
}

export interface ChatHistoryResponse {
  sessionId: string;
  objectName: string;
  messages: ChatMessage[];
  totalMessages: number;
}

export interface ChatSession {
  sessionId: string;
  lastMessage: string;
  objectName: string;
  date: string;
}

export interface CommonResponse {
  success: boolean;
  message: string;
  data: string;
}

export const askAI = async (data: AiChatRequest): Promise<AiChatResponse> => {
  const response = await api.post('/api/ai/chat', data, {
    timeout: 40000,
  });
  return response.data;
};
export const getAIHistory = async (
  sessionId: string,
): Promise<ChatHistoryResponse> => {
  // URL에 직접 붙여서 명확하게 전달
  const response = await api.get(`/api/ai/chat/history?sessionId=${sessionId}`);
  return response.data;
};
// 3. 세션 삭제 (DELETE)
export const deleteAISession = async (
  sessionId: string,
): Promise<CommonResponse> => {
  const response = await api.delete('/api/ai/chat/session', {
    params: { sessionId },
  });
  return response.data;
};

export const getAllSessions = async (
  objectName: string,
): Promise<ChatHistoryResponse[]> => {
  const response = await api.get<ChatHistoryResponse[]>(
    `/api/ai/chat/history/all?objectName=${objectName}`,
  );
  return response.data;
};
