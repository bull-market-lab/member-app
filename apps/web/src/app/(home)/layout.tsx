import HomeHeader from '@/src/components/header/HomeHeader'
import { LayoutWithSidebar } from '@/src/components/sidebar/LayoutWithSidebar'

import { ReactNode } from 'react'

type HomeLayoutProps = { children: ReactNode }

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <HomeHeader />
      <LayoutWithSidebar>{children}</LayoutWithSidebar>
    </>
  )
}
