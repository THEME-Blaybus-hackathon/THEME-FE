import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMemo, saveMemo } from "./note";
// queryKey나 이름이 겹치지 않게 변경
export function useMemoData(partName: string) {
  // 이름을 useMemo -> useMemoData로 변경
  return useQuery({
    queryKey: ["memos", partName],
    queryFn: () => getMemo(partName),
    enabled: !!partName,
  });
}
export function useSaveMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      partName,
      content,
    }: {
      partName: string;
      content: string;
    }) => saveMemo(partName, content),
    onSuccess: (_, variables) => {
      // 저장이 성공하면 해당 메모 데이터를 최신화(다시 가져오기)
      queryClient.invalidateQueries({
        queryKey: ["memos", variables.partName],
      });
      alert("성공적으로 저장되었습니다!");
    },
  });
}
