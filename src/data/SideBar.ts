import { GalleryVerticalEnd, SquareTerminal } from 'lucide-react'

export const SideBarData = {
  user: {
    name: 'shadcn',
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
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '#',
        },
        {
          title: 'Call Records',
          url: '#',
        },
      ],
    },
  ],
}
