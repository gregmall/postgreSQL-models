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

  it('returns null if it cannot find a beer by id', async() => {
    const beer = await Beer.findById(666);
    expect(beer).toEqual(null);

  });

  it('finds all beers', async() => {
    await Promise.all([
      Beer.insert({ 
       
        name: 'Pabst',
        type: 'lager',
        cost: 2
      }),
      Beer.insert({ 
       
        name: 'Sierra Nevada',
        type: 'ale',
        cost: 4
      }),
      Beer.insert({ 
       
        name: 'Pfreem',
        type: 'pilsner',
        cost: 4
      })
    ]);

    const beers = await Beer.find();

    expect(beers).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'Pabst', type: 'lager', cost: 2 },
      { id: expect.any(String), name: 'Sierra Nevada', type: 'ale', cost: 4 },
      { id: expect.any(String), name: 'Pfreem', type: 'pilsner', cost: 4 }


    ]));


  });

  it('updates a row by id', async() => {
    const createBeer = await Beer.insert({
      name: 'Pabst',
      type: 'lager',
      cost: 2

    });
    const updatedBeer = await Beer.update(createBeer.id, {
      name: 'Pabst',
      type: 'lager',
      cost: 3
    });

  });
  it('deletes a row by id')






});
