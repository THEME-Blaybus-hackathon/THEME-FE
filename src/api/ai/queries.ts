import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  askAI,
  getAIHistory,
  deleteAISession,
  getAllSessions,
  type AiChatRequest,
} from './ai';

export interface ChatHistoryResponse {
  sessionId: string;
  objectName: string;
  messages: ChatMessage[];
  totalMessages: number;
}
export interface ChatMessage {
  id: number;
  role: 'USER' | 'ASSISTANT'; // 백엔드 대문자 기준
  content: string;
  selectedPart?: string;
  createdAt: string;
}

export const useAIHistory = (sessionId: string | null) => {
  return useQuery({
    queryKey: ['aiHistory', sessionId],
    queryFn: () => getAIHistory(sessionId!),
    enabled: !!sessionId, // sessionId가 있을 때만 자동 실행
  });
};
export const useAskAI = (objectName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AiChatRequest) => askAI(request),

    onSuccess: (data) => {
      const sessionId = data.sessionId;
      queryClient.invalidateQueries({
        queryKey: ['aiSessions', objectName],
      });
      queryClient.invalidateQueries({
        queryKey: ['aiHistory', sessionId],
      });
    },
  });
};

export const useDeleteSession = (objectName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => deleteAISession(sessionId),

    onSuccess: (_, sessionId) => {
      queryClient.removeQueries({
        queryKey: ['aiHistory', sessionId],
      });

      queryClient.invalidateQueries({
        queryKey: ['aiSessions', objectName],
      });
    },
  });
};

export const useAiSessions = (objectName: string) => {
  return useQuery<ChatHistoryResponse[]>({
    queryKey: ['aiSessions', objectName],
    queryFn: () => getAllSessions(objectName),
    enabled: !!objectName,
  });
};
