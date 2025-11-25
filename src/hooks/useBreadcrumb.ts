import { useMatches } from "react-router-dom";

export function useBreadcrumbs() {
  const matches = useMatches();

  return matches
    .filter((match) => match.data?.breadcrumb)
    .map((match) => ({
      label: match.data.breadcrumb,
      path: match.pathname,
    }));
}
