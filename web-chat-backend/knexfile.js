// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '172.17.0.1',
      user : 'admin',
      port: '5432',
      password : '123456',
      database : 'WebChat'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host : '172.17.0.1',
      user : 'admin',
      password : '123456',
      database : 'WebChat'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host : '172.17.0.1',
      user : 'admin',
      password : '123456',
      database : 'WebChat'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
