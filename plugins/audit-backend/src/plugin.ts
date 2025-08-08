import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import { createTodoListService } from './services/TodoListService';
import Router from 'express-promise-router';
import express from 'express';

/**
 * auditPlugin backend plugin
 *
 * @public
 */
export const  auditPlugin =  createBackendPlugin({
  pluginId: 'audit',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        database: coreServices.database,
        httpAuth: coreServices.httpAuth, // adicione essa dependência
      },
      async init({ logger, httpRouter, database }) {
         const router = await createRouter({ logger, database });
          httpRouter.use(router);
      },
    });
  },
});





