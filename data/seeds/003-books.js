
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre_id: 3, pages: 309, hasRead: true, user_id: 2},
        {title: 'The Outsiders', author: 'S.E. Hinton', genre_id: 2, pages: 192, hasRead: true, user_id: 3},
        {title: 'It', author: 'Stephen King', genre_id: 1, user_id: 1}
      ]);
    });
};
