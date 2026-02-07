import axiosInstance from './axiosInstance';

export function getObjectsByCategory(category: string) {
  return axiosInstance.get(`/api/objects`, {
    params: { category },
  });
}
