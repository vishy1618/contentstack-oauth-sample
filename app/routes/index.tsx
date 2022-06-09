import {
  useEffect,
  useState,
} from 'react';

import {
  API_KEY,
  ENTRY_URL,
  REDIRECT_URL,
} from '~/constants';
import { oauthTokenContainer } from '~/cookies';

import {
  json,
  redirect,
} from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useTransition,
} from '@remix-run/react';

const LOGIN_ACTION = 'LOGIN_ACTION';
const UPDATE_ENTRY_ACTION = 'UPDATE_ENTRY_ACTION';

export async function loader({ request }: { request: Request }) {
  const cookieHeader = request.headers.get("Cookie");
  const oauthToken: string | null = await oauthTokenContainer.parse(cookieHeader);
  const isLoggedIn = !!oauthToken;
  let post;
  if (isLoggedIn) {
    post = await getPost(oauthToken);
  }

  return json({ isLoggedIn, post });
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  switch (formData.get('action')) {
    case LOGIN_ACTION:
      return redirect(REDIRECT_URL);

    case UPDATE_ENTRY_ACTION:
      const title = formData.get("title");
      const body = formData.get("body");
      const cookieHeader = request.headers.get("Cookie");
      const oauthToken: string | null = await oauthTokenContainer.parse(cookieHeader);
      if (!oauthToken) {
        throw new Error("No oauth token");
      }
      await updatePost(oauthToken, title?.toString() as any, body?.toString() as any);
      return null;
  }
}

export default function Index() {
  const { isLoggedIn } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to the entry editor! {isLoggedIn ? <LogoutForm /> : null}</h1>
      {
        isLoggedIn ? <EntryForm /> : <LoginForm />
      }
    </div>
  );
}

async function getPost(oauthToken: string) {
  const response = await fetch(ENTRY_URL, {
    headers: {
      api_key: API_KEY,
      Authorization: `Bearer ${oauthToken}`,
    }
  });

  const responseJSON = await response.json();

  return responseJSON.entry;
}

async function updatePost(oauthToken: string, title: string, body: string) {
  await fetch(ENTRY_URL, {
    method: 'PUT',
    headers: {
      api_key: API_KEY,
      Authorization: `Bearer ${oauthToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      entry: {
        title,
        body,
      }
    }),
  });
}

function logoutAction(e: any) {
  e.preventDefault();
  document.cookie = "x-cs-oauth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.reload();
}

function LogoutForm() {
  return (
    <a href="#"
      type="submit"
      onClick={logoutAction}
      style={{ fontSize: '1.5rem' }}
    >
      (Logout)
    </a>
  )
}


function LoginForm() {
  return (
    <Form method="post">
      <p>
        You are not logged in.
      </p>
      <p className="text-right">
        <button
          type="submit"
          name="action"
          value={LOGIN_ACTION}
        >
          Login
        </button>
      </p>
    </Form>
  )
}

function EntryForm() {
  const { post } = useLoaderData();
  const transition = useTransition();
  const isUpdating = Boolean(transition.submission);
  const [previouslyUpdated, setPreviouslyUpdated] = useState(false);
  const [updateButtonText, setUpdateButtonText] = useState('Update Post');
  useEffect(() => {
    if (isUpdating) {
      setPreviouslyUpdated(true);
      setUpdateButtonText('Updating...');
    } else {
      if (previouslyUpdated) {
        setUpdateButtonText('Updated successfully!');
        setPreviouslyUpdated(false);
        setTimeout(() => {
          setUpdateButtonText('Update Post');
        }, 1000);
      }
    }
  });

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input
            type="text"
            name="title"
            defaultValue={post.title}
          />
        </label>
      </p>
      <p>
        <label>
          Post Body:{" "}
          <textarea
            name="body"
            defaultValue={post.body}
          />
        </label>
      </p>
      <p className="text-right">
        <button
          type="submit"
          name="action"
          value={UPDATE_ENTRY_ACTION}
          disabled={isUpdating}
        >
          {updateButtonText}
        </button>
      </p>
    </Form>
  )
}
