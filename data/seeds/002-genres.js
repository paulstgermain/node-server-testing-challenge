
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('genres').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('genres').insert([
        {genre_name: 'horror'},
        {genre_name: 'drama'},
        {genre_name: 'fantasy'},
        {genre_name: 'biography'},
        {genre_name: 'comic'}
      ]);
    });
};
