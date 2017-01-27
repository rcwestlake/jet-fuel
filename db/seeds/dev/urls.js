exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        urlKey: 'irw.in-clcld00d',
        url: 'www.uggs.com',
        count: 0,
        folder_id: 1,
      }),
      knex('urls').insert({
        urlKey: 'irw.in-jkfladkl22',
        url: 'www.nike.com',
        count: 0,
        folder_id: 1,
      }),
      knex('urls').insert({
        urlKey: 'irw.in-axl13903',
        url: 'www.cnn.com',
        count: 0,
        folder_id: 1,
      }),
    ]);
  });
};
