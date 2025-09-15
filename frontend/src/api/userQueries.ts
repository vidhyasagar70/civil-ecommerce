import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from './auth';
import type { User } from './auth';

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        // Check if we have a token first
        const token = localStorage.getItem('token');
        if (!token) {
          return null;
        }
        
        const user = await getCurrentUser();
        return user;
      } catch (error) {
        // If there's an error (e.g., token expired), clear auth
        localStorage.removeItem('token');
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useUserInvalidate = () => {
  const queryClient = useQueryClient();
  
  const invalidateUser = () => {
    queryClient.invalidateQueries({
      queryKey: ['user'],
    });
  };

  return invalidateUser;
};