'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '../../components/Loading';
import { cn } from '../../lib/utils';
import { SidebarProvider } from '../../components/ui/sidebar';
import AppSidebar from '../../components/AppSidebar';
import { useUser } from '@clerk/nextjs';
import Navbar from '../../components/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access this page</div>;

  return (
    <SidebarProvider>
      <div className='dashboard'>
        <AppSidebar />
        <div className='dashboard__content'>
          {/* { chapter sidbar will go} */}
          <div
            className={cn('dashboard__main')}
            style={{ height: '100vh' }}
          >
            <Navbar isCoursePage={true} />
            <main className='dashboard__body'>{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
