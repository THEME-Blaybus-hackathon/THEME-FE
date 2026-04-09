import { useQuery } from '@tanstack/react-query';
import { getObjectCategories } from './modelApi';

export function useObjectCategories() {
  return useQuery({
    queryKey: ['objects', 'categories'],
    queryFn: getObjectCategories,
  });
}
