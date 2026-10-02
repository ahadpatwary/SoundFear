# SoundFear — auth frontend module

Next.js 14 (App Router) · TypeScript · Tailwind · react-hook-form + Zod · TanStack Query · axios · Zustand

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /login)
```

`.env.local` ships with `NEXT_PUBLIC_AUTH_MOCK=true` (and if it is missing, `npm run dev` defaults to mock too), so everything works **without a backend**. Dev-only index of every screen, including the OTP / password steps: `/preview`.

| Thing            | Demo value                                   |
| ---------------- | -------------------------------------------- |
| Login            | `demo@soundfear.app` / `Password123!`        |
| OTP code         | `123456`                                     |
| "Taken" email    | `taken@example.com` (registration rejects it) |
| Google / GitHub  | opens a fake consent screen in the popup     |

Switch to the real backend: set `NEXT_PUBLIC_AUTH_MOCK=false` and `NEXT_PUBLIC_API_URL`.

## Flows

**Register** — 1) email (+ Google/GitHub on top) → 2) OTP → 3) password + confirm → account created.
**Login** — 1) email + password, "Forgot password?" (+ Google/GitHub on top) → 2) OTP (same screen) → 3) new password, **skippable**.

Google/GitHub open a popup. The main window never reloads; the popup lands on `/auth/callback`,
reports the result through a same-origin `BroadcastChannel` (with `postMessage` fallback) and closes itself.
The main window then exchanges the refresh cookie for an access token and navigates client-side.

## Layout

- `lg+`: form on the left half, picture on the right half.
- below `lg`: picture hidden, only the form.
- Your picture: put it in `/public/images/…` and set `siteConfig.auth.heroImage` in `src/config/site.ts`.
  While it is `null`, a designed waveform panel is shown.
- Colors come only from the tokens in `src/app/globals.css` (light + dark). Theme toggle is in the header.

## Structure

```
src/modules/auth/
  components/   shell, hero, flows, steps, OAuth buttons, OTP step, password form
  hooks/        mutations (TanStack Query), OAuth popup, countdown, session guard
  services/     auth.api.ts (contract) · auth.http.ts (real) · auth.mock.ts (demo)
  store/        Zustand — access token in memory only
  lib/          popup helpers, safe ?next= redirect
  schemas.ts    Zod schemas + password rules
  index.ts      public API of the module
src/lib/http.ts shared axios client (error normalisation, bearer token, cookies)
```

## Backend contract (what the frontend calls)

Errors: `{ "error": { "code": "OTP_INVALID", "message": "…" } }` — codes in `src/lib/api-error.ts`.

| Call | Body | Returns |
| ---- | ---- | ------- |
| `POST /auth/register/request-otp` | `{ email }` | `{ expiresInSeconds, resendAfterSeconds }` |
| `POST /auth/password/request-otp` | `{ email }` | same (do not reveal if the email exists) |
| `POST /auth/otp/verify` | `{ email, otp, purpose: "register" \| "reset-password" }` | `{ ticket }` |
| `POST /auth/register/complete` | `{ ticket, password }` | `{ user, accessToken }` |
| `POST /auth/login` | `{ email, password }` | `{ user, accessToken }` |
| `POST /auth/login/ticket` | `{ ticket }` (the "skip" button) | `{ user, accessToken }` |
| `POST /auth/password/reset` | `{ ticket, password }` | `{ user, accessToken }` |
| `POST /auth/refresh` | cookie | `{ user, accessToken }` |
| `POST /auth/logout` | cookie | — |
| `GET /auth/oauth/:provider?mode=popup&popup_id=…` | — | provider flow, then redirect the popup to `{APP_URL}/auth/callback?status=success\|error&popup_id=<echo>&provider=<provider>[&error=access_denied\|email_unverified]` |

The refresh token must be set as an httpOnly cookie before redirecting to `/auth/callback`.
CORS needs `credentials: true` for the frontend origin.
