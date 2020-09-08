const fs = require('fs');
const Beer = require('./beer');
const pool = require('../utils/pool');

describe('Beer model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

  });

  it('inserts a new beer into the database', async() => {
    const createBeer = await Beer.insert({
      name: 'Pabst',
      type: 'lager',
      cost: 2

    });

    const { rows } = await pool.query(
      'SELECT * FROM beers WHERE id = $1',
      [createBeer.id] 
    );
    expect(rows[0]).toEqual(createBeer);
  });

  it('finds a beer by id', async() => {

    const pabst = await Beer.insert({
      name: 'Pabst',
      type: 'lager',
      cost: 2
    });
    const foundPabst = await Beer.findById(pabst.id);

    expect(foundPabst).toEqual({
      id: pabst.id,
      name: 'Pabst',
      type: 'lager',
      cost: 2
    });


  });




});
