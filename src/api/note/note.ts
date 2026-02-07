import axiosInstance from "../axiosInstance";

// 메모 데이터 타입
export interface MemoData {
  content: string;
}

/** 메모 가져오기 (GET) */
export const getMemo = async (partName: string) => {
  const response = await axiosInstance.get<MemoData>(`/api/memos/${partName}`);
  return response.data;
};

/** 메모 저장하기 (POST) */
export const saveMemo = async (partName: string, content: string) => {
  const response = await axiosInstance.post("/api/memos", {
    partName,
    content,
  });
  return response.data;
};
