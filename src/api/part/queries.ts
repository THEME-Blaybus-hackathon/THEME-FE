import { useQuery } from '@tanstack/react-query';
import { getObjectsByCategory } from './part';
import type { ObjectsByCategoryResponse } from './type';
import { getObjectById } from './part';

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
