/** @param {import('knex').Knex} knex */
exports.up = async function(knex) {
  await knex.schema.createTable('proxy_logs', table => {
    table.increments('id').primary();
    table.string('method').notNullable();
    table.string('path').notNullable();
    table.integer('status').nullable();
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  });
};

/** @param {import('knex').Knex} knex */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('proxy_logs');
};





