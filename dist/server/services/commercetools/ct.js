"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProject = void 0;
const client_1 = require("./client");
const platform_sdk_1 = require("@commercetools/platform-sdk");
const { CT_PROJECT_KEY = '' } = process.env;
// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = (0, platform_sdk_1.createApiBuilderFromCtpClient)(client_1.ctpClient).withProjectKey({
    projectKey: CT_PROJECT_KEY,
});
// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
const getProject = () => {
    return apiRoot.products().get().execute();
};
exports.getProject = getProject;
