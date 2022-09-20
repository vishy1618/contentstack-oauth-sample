const APP_URL = process.env['APP_URL'] || 'https://app.contentstack.com';
const API_URL = process.env['API_URL'] || 'https://api.contentstack.io';
const ENTRY_UID = process.env['ENTRY_UID'] || 'blt3a7fea4498429bc2';
const CONTENT_TYPE_UID = process.env['CONTENT_TYPE_UID'] || 'test_content_type';
export const CLIENT_ID = process.env['CLIENT_ID'] || 'QhEyHzxDIYeGZFN_';
export const CLIENT_SECRET = process.env['CLIENT_SECRET'];
if (!CLIENT_SECRET) {
  throw new Error('CLIENT_SECRET environment variable is not defined!');
}
const APP_UID = process.env['APP_UID'] || '628ba758d922620018019fac';
export const OAUTH_REDIRECT_URI = process.env['OAUTH_REDIRECT_URI'] || 'http://localhost:3000/oauth/callback';
export const ENTRY_URL = `${API_URL}/v3/content_types/${CONTENT_TYPE_UID}/entries/${ENTRY_UID}`;
export const REDIRECT_URL = `${APP_URL}/apps/${APP_UID}/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(OAUTH_REDIRECT_URI)}&response_type=code`;
export const TOKEN_URL = `${APP_URL}/apps-api/apps/token`;
export const API_KEY = process.env['API_KEY'] || 'blt167ab95ac670dcac';
