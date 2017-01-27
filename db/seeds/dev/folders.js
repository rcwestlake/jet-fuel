exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(function() {
    return Promise.all([
      knex('folders').insert({
        title: 'shoes',
      }),
      knex('folders').insert({
        title: 'news',
      }),
    ]);
  })
}
