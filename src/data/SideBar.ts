import { GalleryVerticalEnd, SquareTerminal } from 'lucide-react'

export const SideBarData = {
  user: {
    name: 'User',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  header: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'CDR',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
        },
        {
          title: 'Call Records',
          url: '/records',
        },
        {
          title: 'Interupt Analysis',
          url: '/interupt',
        },
      ],
    },
  ],
}
