import axiosInstance from '@/shared/api/axiosInstance';

export interface AiChatRequest {
  message: string;
  objectName: string;
  sessionId?: string | null;
  selectedPart?: string | null;
}

export interface AiChatResponse {
  sessionId: string;
  answer: string;
  messageId: number;
  newSession: boolean;
}

export interface ChatMessage {
  id: number;
  role: 'USER' | 'ASSISTANT';
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
  const response = await axiosInstance.post('/api/ai/chat', data, {
    timeout: 40000,
  });
  return response.data;
};

export const getAIHistory = async (
  sessionId: string,
): Promise<ChatHistoryResponse> => {
  const response = await axiosInstance.get(
    `/api/ai/chat/history?sessionId=${sessionId}`,
  );
  return response.data;
};

export const deleteAISession = async (
  sessionId: string,
): Promise<CommonResponse> => {
  const response = await axiosInstance.delete('/api/ai/chat/session', {
    params: { sessionId },
  });
  return response.data;
};

export const getAllSessions = async (
  objectName: string,
): Promise<ChatHistoryResponse[]> => {
  const response = await axiosInstance.get<ChatHistoryResponse[]>(
    `/api/ai/chat/history/all?objectName=${objectName}`,
  );
  return response.data;
};
