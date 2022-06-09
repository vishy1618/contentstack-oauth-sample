import {
  CLIENT_ID,
  CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
  TOKEN_URL,
} from '~/constants';
import { oauthTokenContainer } from '~/cookies';

import { redirect } from '@remix-run/node';

export async function loader({ request }: { request: any }) {
  const code = new URL(request.url).searchParams.get('code');
  if (!code) {
    throw new Error('No code');
  }
  const token = await getToken(code);
  const cookie = await oauthTokenContainer.serialize(token);

  return redirect('/', {
    headers: {
      "Set-Cookie": cookie,
    }
  });
}

async function getToken(code: string) {
  const response = await fetch(
    TOKEN_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        redirect_uri: OAUTH_REDIRECT_URI,
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    },
  );
  const responseJSON = await response.json();
  const { access_token } = responseJSON;
  return access_token;
}

export default function OAuthCallback() {
  return (
    <p>
      Loading...
    </p>
  )
}