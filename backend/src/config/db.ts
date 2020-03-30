interface KnexConfig {
  [key: string]: object;
}

const KnexConfig: KnexConfig = {
  development: {
    client: 'sqlite3',
    debug: true,
    connection: {
      filename: `${process.env.DB_FILENAME}`,
    },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
    timezone: 'UTC-3',
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      acquireConnectionTimeout: 10000,
    },
    pool: { min: 2, max: 7 },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
    timezone: 'UTC-3',
  },
};

export default KnexConfig;
