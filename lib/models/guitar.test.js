const fs = require('fs');
const Guitar = require('./guitar');
const pool = require('../utils/pool');

describe('Guitar model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new guitar into the database', async() => {
    const createGuitar = await Guitar.insert({
      name: 'gibson',
      type: 'guitar',
      cost: 900
    });
    const { rows } = await pool.query(
      'SELECT * FROM guitars WHERE id = $1',
      [createGuitar.id]
    );
    expect(rows[0]).toEqual(createGuitar);

  });



});
