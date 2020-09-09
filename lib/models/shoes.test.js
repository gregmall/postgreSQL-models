const fs = require('fs');
const Shoe = require('./shoes');
const pool = require('../utils/pool');


describe('Shoe model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new shoe into the database', async() => {
    const createShoe = await Shoe.insert({
      name: 'nike',
      type: 'running',
      cost: 40
    });
    const { rows } = await pool.query(
      'SELECT * FROM shoes WHERE id = $1',
      [createShoe.id]
    );
    expect(rows[0]).toEqual(createShoe);

  });

  it('finds a shoe by id', async() => {
    const myShoe = await Shoe.insert({
      name: 'nike',
      type: 'running',
      cost: 40
    });
    const foundShoe = await Shoe.findById(myShoe.id);
    expect(foundShoe).toEqual({
      id: myShoe.id,
      name: 'nike',
      type: 'running',
      cost: 40
    });



  });
  it('returns null if it cannot find a shoe by id', async() => {
    const shoe = await Shoe.findById(777);
    expect(shoe).toEqual(null);
  });
  
  it('finds all shoes', async() => {
    await Promise.all([
      Shoe.insert({
        name: 'nike',
        type: 'running',
        cost: 40
         
      }),
      Shoe.insert({
        name: 'puma',
        type: 'golf',
        cost: 60
         
      }),
      Shoe.insert({
        name: 'adidas',
        type: 'basketball',
        cost: 80
         
      })

    ]);
    const shoes = await Shoe.find();

    expect(shoes).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'nike', type: 'running', cost: 40 },
      { id: expect.any(String), name: 'puma', type: 'golf', cost: 60 },
      { id: expect.any(String), name: 'adidas', type: 'basketball', cost: 80 }
    ]));

  });

  it('updates a row by id', async() => {
    const createShoe = await Shoe.insert({
      name: 'nike',
      type: 'running',
      cost: 40
    });

    const updatedShoe = await Shoe.update(createShoe.id, {
      name: 'nike',
      type: 'track',
      cost: 50
    });

    expect(updatedShoe).toEqual({
      id: createShoe.id,
      name: 'nike',
      type: 'track',
      cost: 50

    });
  });
  it('deletes a row by id', async() => {
    const createdShoe = await Shoe.insert({
      name: 'nike',
      type: 'running',
      cost: 40
    });
    const deletedShoe = await Shoe.delete(createdShoe.id);

    expect(deletedShoe).toEqual({
      id: createdShoe.id,
      name: 'nike',
      type: 'running',
      cost: 40
    });

  });

});

