"use client";

import { fetchNotes } from "@/actions/notes";
import { useQuery } from "@tanstack/react-query";

export function useGetPosts() {
  return useQuery({
    queryFn: async () => await fetchNotes(),
    queryKey: ["notes"],
  });
}
