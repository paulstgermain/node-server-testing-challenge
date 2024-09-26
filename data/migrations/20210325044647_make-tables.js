
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments('user_id');
        tbl.string('username', 128).notNullable().unique();
        tbl.string('email', 128).notNullable().unique();
        tbl.string('password', 128).notNullable().unique();
    })
    .createTable('genres', tbl => {
        tbl.increments('genre_id');
        tbl.string('genre_name', 128).notNullable().unique();
    })
    .createTable('books', tbl => {
        tbl.increments('book_id');
        tbl.string('title', 128).notNullable();
        tbl.string('author', 128).notNullable();
        tbl.integer('genre_id')
            .unsigned()
            .notNullable()
            .references('genre_id')
            .inTable('genres')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.integer('pages').defaultTo(null);
        tbl.boolean('hasRead').defaultTo(false);
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('books')
    .dropTableIfExists('genres')
    .dropTableIfExists('users')
};
