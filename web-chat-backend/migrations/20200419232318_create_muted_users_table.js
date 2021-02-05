
exports.up = function(knex) {

    return knex.schema.withSchema('public').createTable("muted", function (table) {
        table.increments('id');
        table.integer('userId').notNullable();
        table.integer('muted_user_id').notNullable();
        table.unique('muted_user_id');
        table.foreign('userId').references('user.id');
    });
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("muted");  
};
