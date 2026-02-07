import { useQuery } from '@tanstack/react-query';
import { getObjectCategories } from '../model/model';

export function useObjectCategories() {
  return useQuery({
    queryKey: ['objects', 'categories'],
    queryFn: getObjectCategories,
  });
}
