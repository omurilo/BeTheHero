import * as Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('ongs', function (table) {
    table.uuid('id').defaultTo(uuidv4()).primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('whatsapp').notNullable();
    table.string('cidade').notNullable();
    table.string('uf', 2).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('ongs');
}
