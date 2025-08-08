const { loadConfigSync } = require('@backstage/config-loader');
const path = require('path');

// Esta função carrega a configuração dos seus arquivos app-config.yaml
const configs = loadConfigSync({
  root: path.resolve(__dirname, '../../'), // Vai para a raiz do projeto
  env: process.env.NODE_ENV || 'development',
});

// A configuração do Knex agora vem DIRETAMENTE do app-config.yaml
// Esta é a única fonte de verdade.
module.exports = configs[0].get('backend.database');