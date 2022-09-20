import { createCookie } from '@remix-run/node';

import {
  CODE_VERIFIER_COOKIE_NAME,
  OAUTH_TOKEN_COOKIE_NAME,
} from './cookie-names';

export const oauthTokenContainer = createCookie(OAUTH_TOKEN_COOKIE_NAME, {
  maxAge: 3600,
});

export const codeVerifierContainer = createCookie(CODE_VERIFIER_COOKIE_NAME, {
  maxAge: 600,
});
