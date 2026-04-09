import axiosInstance from '@/shared/api/axiosInstance';
import type { ObjectCategoriesResponse } from './type';

export async function getObjectCategories(): Promise<ObjectCategoriesResponse> {
  const response = await axiosInstance.get<ObjectCategoriesResponse>(
    '/api/objects/categories',
  );
  return response.data;
}
