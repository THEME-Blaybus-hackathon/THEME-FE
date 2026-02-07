import axiosInstance from '../axiosInstance';
import type { ObjectCategoriesResponse } from './type';

export async function getObjectCategories() {
  const response = await axiosInstance.get<ObjectCategoriesResponse>(
    '/api/objects/categories',
  );
  console.log(response.data);

  return response.data;
}
