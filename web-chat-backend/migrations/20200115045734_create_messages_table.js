exports.up = function(knex) {
    return knex.schema.withSchema('public').createTable('message', function (table) {
        table.increments('id');
        table.integer('senderId').notNullable();
        table.integer('receiverId').notNullable();
        table.foreign('senderId').references('user.id');
        table.foreign('receiverId').references('user.id');
        table.text('message').notNullable();
        table.datetime('sentAt', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("message");
};
