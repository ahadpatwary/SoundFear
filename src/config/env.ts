const mockFlag = process.env.NEXT_PUBLIC_AUTH_MOCK;

export const env = {
  /** Base URL of the backend API. The auth module appends `/auth/...`. */
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1',
  /**
   * Built-in fake auth backend (no server required).
   * Explicit NEXT_PUBLIC_AUTH_MOCK=true|false always wins; when it is not set at all,
   * mock is ON in `next dev` and OFF in production builds.
   */
  authMock: mockFlag !== undefined && mockFlag !== '' ? mockFlag === 'true' : process.env.NODE_ENV !== 'production',
} as const;
