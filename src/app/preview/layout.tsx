import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { AuthShell } from '@/modules/auth';

/** Dev-only screens for reviewing individual auth steps. Returns 404 in production builds. */
export default function PreviewLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === 'production') notFound();
  return <AuthShell>{children}</AuthShell>;
}
