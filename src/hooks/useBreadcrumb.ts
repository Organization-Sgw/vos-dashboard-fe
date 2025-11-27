import { useMatches } from 'react-router-dom'

export function useBreadcrumbs() {
  const matches = useMatches()

  return matches
    .filter((match: any) => match.data?.breadcrumb)
    .map((match: any) => ({
      label: match.data.breadcrumb,
      path: match.pathname,
    }))
}
