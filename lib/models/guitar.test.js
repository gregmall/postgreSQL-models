const fs = require('fs');
const Guitar = require('./guitar');
const pool = require('../utils/pool');
const { update } = require('./beer');

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

  it('finds a guitar by id', async() => {
    const myGuitar = await Guitar.insert({
      name: 'gibson',
      type: 'guitar',
      cost: 900
    });
    const foundGuitar = await Guitar.findById(myGuitar.id);
    expect(foundGuitar).toEqual({
      id: myGuitar.id,
      name: 'gibson',
      type: 'guitar',
      cost: 900
    });



  });
  it('returns null if it cannot find a guitar by id', async() => {
    const guitar = await Guitar.findById(777);
    expect(guitar).toEqual(null);
  });
  
  it('finds all guitars', async() => {
    await Promise.all([
      Guitar.insert({
        name: 'gibson',
        type: 'guitar',
        cost: 900
         
      }),
      Guitar.insert({
        name: 'fender',
        type: 'bass',
        cost: 600
         
      }),
      Guitar.insert({
        name: 'music man',
        type: 'bass',
        cost: 1200
         
      })

    ]);
    const guitars = await Guitar.find();

    expect(guitars).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'gibson', type: 'guitar', cost: 900 },
      { id: expect.any(String), name: 'fender', type: 'bass', cost: 600 },
      { id: expect.any(String), name: 'music man', type: 'bass', cost: 1200 }
    ]));

  });

  it('updates a row by id', async() => {
    const createGuitar = await Guitar.insert({
      name: 'gibson',
      type: 'guitar',
      cost: '900'
    });

    const updatedGuitar = await Guitar.update(createGuitar.id, {
      name: 'gibson',
      type: 'bass',
      cost: 500
    });

    expect(updatedGuitar).toEqual({
      id: createGuitar.id,
      name: 'gibson',
      type: 'bass',
      cost: 500

    });
  });
  it('deletes a row by id', async() => {
    const createdGuitar = await Guitar.insert({
      name: 'gibson',
      type: 'guitar',
      cost: 900
    });
    const deletedGuitar = await Guitar.delete(createdGuitar.id);

    expect(deletedGuitar).toEqual({
      id: createdGuitar.id,
      name: 'gibson',
      type: 'guitar',
      cost: 900
    });

  });

});







