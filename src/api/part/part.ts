import axiosInstance from '../axiosInstance';
import type { ObjectsByCategoryResponse } from './type';

export async function getObjectsByCategory(
  category: string,
): Promise<ObjectsByCategoryResponse> {
  const response = await axiosInstance.get<ObjectsByCategoryResponse>(
    '/api/objects',
    {
      params: { category },
    },
  );

  return response.data;
}

export async function getObjectById(id: string) {
  const response = await axiosInstance.get(`/api/objects/${id}`);
  return response.data;
}
