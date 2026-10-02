import Link from 'next/link';

const ROUTES = [
  { href: '/login', label: 'Login: step 1 (email + password)' },
  { href: '/preview/login/otp', label: 'Login: step 2 (OTP after "Forgot password")' },
  { href: '/preview/login/new-password', label: 'Login: step 3 (change password, skippable)' },
  { href: '/register', label: 'Register: step 1 (email)' },
  { href: '/preview/register/otp', label: 'Register: step 2 (OTP)' },
  { href: '/preview/register/password', label: 'Register: step 3 (password + confirm)' },
  { href: '/auth/callback?status=success&popup_id=test&provider=google', label: 'Popup: success screen' },
  { href: '/auth/callback?status=error&popup_id=test&provider=github', label: 'Popup: error screen' },
  { href: '/auth/mock-provider?provider=google&popup_id=test', label: 'Popup: fake Google screen (mock mode)' },
  { href: '/dashboard', label: 'Dashboard (needs a session)' },
];

export default function PreviewIndexPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Auth screens</h1>
      <p className="text-sm text-muted-foreground">Dev-only index. Not available in production builds.</p>
      <ul className="divide-y rounded-lg border bg-surface">
        {ROUTES.map((route) => (
          <li key={route.href}>
            <Link href={route.href} className="block px-4 py-3 text-sm hover:bg-surface-2">
              <span className="block font-medium">{route.label}</span>
              <code className="break-all text-xs text-muted-foreground">{route.href}</code>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
