"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const sdk_client_v2_1 = require("@commercetools/sdk-client-v2");
const platform_sdk_1 = require("@commercetools/platform-sdk");
const { CT_PROJECT_KEY = '', CT_CLIENT_ID = '', CT_CLIENT_SECRET = '', CT_SCOPE = '', CT_REGION = '', } = process.env;
const projectKey = CT_PROJECT_KEY;
const scopes = [CT_SCOPE];
// Configure authMiddlewareOptions
const authMiddlewareOptions = {
    host: `https://auth.${CT_REGION}.commercetools.com`,
    projectKey: projectKey,
    credentials: {
        clientId: CT_CLIENT_ID,
        clientSecret: CT_CLIENT_SECRET,
    },
    scopes,
    fetch: node_fetch_1.default,
};
// Configure httpMiddlewareOptions
const httpMiddlewareOptions = {
    host: `https://api.${CT_REGION}.commercetools.com`,
    fetch: node_fetch_1.default,
};
// Get the ClientBuilder
const ctpClient = new sdk_client_v2_1.ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
exports.client = (0, platform_sdk_1.createApiBuilderFromCtpClient)(ctpClient).withProjectKey({
    projectKey: CT_PROJECT_KEY,
});
