# Contentstack OAuth Sample

This is a simple web app for demoing Contentstack's OAuth capabilities

To run locally,

Create a new `.env` file in the root directory. You can customize the following environment variables here.

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
