import { useQuery } from '@tanstack/react-query';
import { getObjectsByCategory, getObjectById } from './partApi';
import type { ObjectsByCategoryResponse } from './type';

export function useObjects(category: string) {
  return useQuery<ObjectsByCategoryResponse>({
    queryKey: ['objects', category],
    queryFn: () => getObjectsByCategory(category),
    enabled: !!category,
  });
}

export function useObject(id: string) {
  return useQuery({
    queryKey: ['object', id],
    queryFn: () => getObjectById(id),
    enabled: !!id,
  });
}
