import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMemosByPart, createMemo, updateMemo, deleteMemo } from "./note";

export function useMemoData(partName: string) {
  return useQuery({
    queryKey: ["memos", partName],
    queryFn: () => getMemosByPart(partName),
    enabled: !!partName,
  });
}
export function useCreateMemo() {
  const queryClient = useQueryClient();
  return useMutation({
    // ✅ vars 타입에 title을 추가합니다.
    mutationFn: (vars: { partName: string; content: string; title: string }) =>
      createMemo(vars.partName, vars.content, vars.title),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["memos", vars.partName] });
      alert("저장되었습니다!");
    },
  });
}
export function useUpdateMemo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      id: number;
      content: string;
      title: string;
      partName: string;
    }) => updateMemo(vars.id, vars.content, vars.title, vars.partName), // ✅ title 추가
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["memos", vars.partName] });
      alert("수정되었습니다!");
    },
  });
}

export function useDeleteMemo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; partName: string }) => deleteMemo(vars.id),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["memos", vars.partName] });
      alert("삭제되었습니다!");
    },
  });
}
