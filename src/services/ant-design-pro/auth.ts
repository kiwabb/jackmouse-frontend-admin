import { Log, User, UserManager } from 'oidc-client';

const baseUrl = 'http://localhost:8000'; //app base url

const oidcConfig = {
  authority: 'http://localhost:8000/oidc', //The URL of the OIDC/OAuth2 provider.
  client_id: 'jack-mouse-client', //Your client application's identifier as registered with the OIDC/OAuth2 provider.
  response_type: 'code', //The type of response desired from the OIDC/OAuth2 provider.
  redirect_uri: `${baseUrl}/signin-redirect-callback`, //The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
  silent_redirect_uri: `${baseUrl}/signin-silent-callback`,
  post_logout_redirect_uri: `${baseUrl}/signout-redirect-callback`,
  scope: 'openid profile offline_access', //The scope being requested from the OIDC/OAuth2 provider.
  tokenUrl: `${baseUrl}/oidc/oauth2/token`, // 自定义 token URL
};

const userManager = new UserManager(oidcConfig);
Log.logger = console;
Log.level = Log.DEBUG;
export async function getUser(): Promise<User | null> {
  return await userManager.getUser();
}
export async function signinRedirect(): Promise<void> {
  return userManager.signinRedirect();
}

export async function signinSilent(): Promise<User> {
  return userManager.signinSilent();
}

export async function signinSilentCallback(): Promise<User | undefined> {
  return userManager.signinSilentCallback();
}

export async function signinRedirectCallback(): Promise<User> {
  return userManager.signinRedirectCallback();
}
