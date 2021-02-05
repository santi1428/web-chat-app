exports.up = function(knex) {
   return knex.schema.withSchema('public').createTable('user', function (table) {
        table.increments('id');
        table.string('name', 60);
        table.string('last_name', 60);
        table.string('email', 100);
        table.unique('email');
        table.string('password');
        table.string('profile_photo', 200);
        table.boolean('profile_photo_set');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("user");
};
