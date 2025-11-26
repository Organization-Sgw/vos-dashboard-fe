import { useParams } from 'react-router-dom'

export function useBreadcrumbs() {
  const { id } = useParams()

  const breadcrumbs = [
    { label: 'CDR', path: '/cdr' },
    { label: 'Records', path: '/records' },
  ]

  if (id) {
    breadcrumbs.push({
      label: id,
      path: `/records/${id}`,
    })
  }

  return breadcrumbs
}
