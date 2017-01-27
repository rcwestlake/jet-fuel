exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('folders', function(table) {
        table.increments('id').primary();
        table.string('title');
      }),

    knex.schema.createTable('urls', function(table){
      table.string('urlKey').primary().unique();
      table.string('url');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('count');
      table.integer('folder_id')
           .references('id')
           .inTable('folders')
           .onDelete('CASCADE');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('folders'),
    knex.schema.dropTable('urls'),
  ])
};
