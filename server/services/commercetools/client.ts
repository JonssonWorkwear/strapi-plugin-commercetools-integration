import fetch from 'node-fetch';

import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const {
  CT_PROJECT_KEY = '',
  CT_CLIENT_ID = '',
  CT_CLIENT_SECRET = '',
  CT_SCOPE = '',
  CT_REGION = '',
} = process.env;

const projectKey = CT_PROJECT_KEY;
const scopes = [CT_SCOPE];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${CT_REGION}.commercetools.com`,
  projectKey: projectKey,
  credentials: {
    clientId: CT_CLIENT_ID,
    clientSecret: CT_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${CT_REGION}.commercetools.com`,
  fetch,
};

// Get the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const client = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: CT_PROJECT_KEY,
});
