import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useCSVData(searchQuery: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`csv`, searchQuery],
    queryFn: async () => {
      const res = await api.get(`/api/users`, {
        params: { q: searchQuery },
      });
      return res.data.data;
    },
  });

  return { data, isLoading, error };
}
