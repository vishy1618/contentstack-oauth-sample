import { createCookie } from '@remix-run/node';

export const oauthTokenContainer = createCookie("x-cs-oauth-token", {
  maxAge: 3600,
});
