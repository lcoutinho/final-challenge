import { createRouter } from '@backstage/plugin-auth-backend';
import { GithubAuthProvider } from '@backstage/plugin-auth-backend-module-github';
import { PluginEnvironment } from '../types'; // seu tipo de environment

export async function createPlugin(env: PluginEnvironment) {
  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    providerFactories: {
      github: GithubAuthProvider.factory({
        clientId: env.config.getString('auth.providers.github.clientId'),
        clientSecret: env.config.getString('auth.providers.github.clientSecret'),
      }),
    },
  });
}