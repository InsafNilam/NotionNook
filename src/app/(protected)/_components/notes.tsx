import { useGetPosts } from "@/hooks/use-get-notes";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HashLoader, PropagateLoader, RiseLoader } from "react-spinners";

const Notes = () => {
  const { data: notes, isLoading } = useGetPosts();
  if (isLoading) {
    return (
      <section className="bg-white dark:bg-gray-900 rounded-md w-full h-full">
        <div className="mx-auto w-full h-full px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto flex flex-col justify-center max-w-screen-sm h-full text-center space-y-4">
            <HashLoader
              color="#36d7b7"
              cssOverride={{
                display: "block",
                margin: "0 auto",
                borderColor: "red",
              }}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <h1 className="font-sans font-semibold text-4xl dark:text-white">
              Loading
            </h1>
          </div>
        </div>
      </section>
    );
  }
  if (notes?.error)
    return (
      <section className="bg-white dark:bg-gray-900 rounded-md w-full h-full">
        <div className="mx-auto w-full h-full px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto flex flex-col justify-center max-w-screen-sm h-full text-center">
            <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">
              500
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Internal Server Error.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry something went wrong.
            </p>
          </div>
        </div>
      </section>
    );
  if (notes?.success)
    return (
      <ScrollArea className="w-full h-full">
        <LayoutGrid cards={notes.success} />
      </ScrollArea>
    );
};

export default Notes;
