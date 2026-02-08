import axiosInstance from "../axiosInstance";

export async function getMemosByPart(partName: string) {
  const response = await axiosInstance.get(`/api/memos`, {
    params: { partName },
  });
  return response.data;
}
export async function createMemo(
  partName: string,
  content: string,
  title: string,
) {
  const response = await axiosInstance.post("/api/memos", {
    partName,
    content,
    title: title || `${partName} Memo`,
  });
  return response.data;
}

export async function updateMemo(
  id: number,
  content: string,
  title: string,
  partName: string,
) {
  const response = await axiosInstance.put(`/api/memos/${id}`, {
    title,
    content,
    partName,
  });
  return response.data;
}

export async function deleteMemo(id: number) {
  const response = await axiosInstance.delete(`/api/memos/${id}`);
  return response.data;
}
