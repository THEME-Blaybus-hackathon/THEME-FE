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
      // 답변 수신 성공 시 해당 세션의 히스토리 갱신
      queryClient.invalidateQueries({
        queryKey: ['aiSessions', objectName],
      });
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => deleteAISession(sessionId),
    onSuccess: (_, sessionId) => {
      // 삭제 성공 시 캐시 제거
      queryClient.removeQueries({ queryKey: ['aiHistory', sessionId] });
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
