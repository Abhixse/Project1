import { useEffect } from "react";

interface DocumentTitleOptions {
  restoreOnUnmount?: boolean;
}

/**
 * Custom hook for managing document title
 * @param title - The document title
 * @param options - Options for title management
 */
export function useDocumentTitle(
  title: string,
  options: DocumentTitleOptions = {}
): void {
  const { restoreOnUnmount = false } = options;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitle;
      }
    };
  }, [title, restoreOnUnmount]);
}
