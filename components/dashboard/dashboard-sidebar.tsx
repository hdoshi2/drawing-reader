import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'

import {
  ArrowLeft,
  MessageCircleCode,
  Star,
  LayoutList
} from 'lucide-react'

// Menu items.
const items = [
  {
    title: 'Ask AI',
    url: '/dashboard/ask',
    icon: Star
  },
  {
    title: 'Extract PDF Data',
    url: '/dashboard/extract',
    icon: MessageCircleCode
  },
  {
    title: 'Analyze PDF Data',
    url: '/dashboard/analyze',
    icon: LayoutList
  },
]

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/' className='text-sky-700 hover:text-sky-600'>
                <ArrowLeft />
                <span>Back to main page</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
