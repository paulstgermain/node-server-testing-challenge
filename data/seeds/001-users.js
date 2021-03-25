
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Bob', email: 'blacklodge@twinpeaks.com', password: 'blacklodge'},
        {username: 'AgentCooper', email: 'twinpeaks@twinpeaks.com', password: 'twinpeaks'},
        {username: 'Mike', email: 'runaway@twinpeaks.com', password: 'runaway'}
      ]);
    });
};
