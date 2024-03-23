import { BackgroundBeams } from "@/components/ui/background-beams";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BentoGridDemo } from "@/app/_components/hero";
import { fetchNotes } from "@/actions/notes";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: async () => fetchNotes(),
  });

  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-between bg-neutral-950">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ScrollArea className="h-full w-full relative z-10 px-4 py-8 scroll-smooth">
          <BentoGridDemo />
        </ScrollArea>
      </HydrationBoundary>
      <BackgroundBeams />
    </main>
  );
}
