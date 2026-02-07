import { useQuery } from '@tanstack/react-query';
import { getObjectsByCategory } from './part';
import type { ObjectsByCategoryResponse } from './type';

export function useObjects(category: string) {
  return useQuery<ObjectsByCategoryResponse>({
    queryKey: ['objects', category],
    queryFn: () => getObjectsByCategory(category),
    enabled: !!category,
  });
}
