# Contentstack OAuth Sample

This is a simple web app for demoing Contentstack's OAuth capabilities

First, create an app on the [Contentstack Developer Hub].

Next, add the following user token scopes:

- cm.entries.management:read
- cm.entries.management:write
- cm.entry:read
- cm.entry:write

In a stack in your organization, you can create a sample content type with a single line text box field called "body".

To run locally,

Create a new `.env` file in the root directory. You can customize the following environment variables here. All except `CLIENT_SECRET` is optional.

```
APP_URL="https://app.contentstack.com"
API_URL="https://api.contentstack.io"
APP_UID="628ba758d922620018019fac"
CLIENT_ID="QhEyHzxDIYeGZFN_"
CLIENT_SECRET="<needs to be provided>"
API_KEY="blt167ab95ac670dcac"
CONTENT_TYPE_UID="test_content_type"
ENTRY_UID="blt3a7fea4498429bc2"
OAUTH_REDIRECT_URI="http://localhost:3000/oauth/callback"
```

Then, start the application using the fillowing command.

```
$ npm run dev
```

[Contentstack Developer Hub]: https://www.contentstack.com/docs/developers/developer-hub/