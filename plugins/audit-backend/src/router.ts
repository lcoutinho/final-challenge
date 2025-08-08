import { PluginDatabaseManager } from '@backstage/backend-common';
import { LoggerService, HttpAuthService } from '@backstage/backend-plugin-api';
import { InputError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import { TodoListService } from './services/TodoListService/types';
import { PluginEnvironment } from '@backstage/backend-plugin-api';
import expressPromiseRouter from 'express-promise-router';

type RouterDeps = {
  logger: LoggerService;
  database: PluginDatabaseManager;
};


export async function createRouter({ logger, database }: RouterDeps): Promise<express.Router> {
  const router = expressPromiseRouter();
  const db = await database.getClient();

  router.use(express.json());

  router.post('/log', async (req, res) => {
    const { method, path, user, status } = req.body;

    if (!method || !path) {
      return res.status(400).json({ error: 'Campos obrigatórios: method e path' });
    }

    try {
      await db('proxy_logs').insert({
        method,
        path,
        user: user ?? null,
        status: status ?? null,
        timestamp: new Date().toISOString(),
      });

      res.status(200).json({ message: 'Log auditado com sucesso' });
    } catch (err) {
      logger.error('Erro ao auditar:', err);
      res.status(500).json({ error: 'Erro ao salvar auditoria' });
    }
  });

  return router;
}
