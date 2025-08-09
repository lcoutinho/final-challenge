import { PluginDatabaseManager } from '@backstage/backend-common';
import { LoggerService, HttpAuthService, DatabaseService } from '@backstage/backend-plugin-api';
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

async function setupDatabase(logger: LoggerService, database: PluginDatabaseManager): Promise<Knex> {
  const dbClient = await database.getClient();
  const tableName = 'proxy_logs';

  const tableExists = await dbClient.schema.hasTable(tableName);

  if (!tableExists) {
    logger.info(`Tabela '${tableName}' não encontrada, a criar...`);
    await dbClient.schema.createTable(tableName, table => {
      table.increments('id').primary();
      table.string('method').notNullable();
      table.text('path').notNullable(); // 'text' é melhor para URLs
      table.string('user').nullable();
      table.integer('status').nullable();
      table.timestamp('timestamp').defaultTo(dbClient.fn.now());
    });
    logger.info(`Tabela '${tableName}' criada com sucesso.`);
  }

  return dbClient;
}

export async function createRouter({ logger, database }: RouterDeps): Promise<express.Router> {
  const router = expressPromiseRouter();
  //const db = await database.getClient();
  const db = await setupDatabase(logger, database);

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
