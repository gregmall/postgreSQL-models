const fs = require('fs');
const Bicycle = require('./bicycles');
const pool = require('../utils/pool');


describe('Bicycle model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new bicycle into the database', async() => {
    const createBicycle = await Bicycle.insert({
      brand: 'trek',
      type: 'road',
      cost: 900
    });
    const { rows } = await pool.query(
      'SELECT * FROM bicycles WHERE id = $1',
      [createBicycle.id]
    );
    expect(rows[0]).toEqual(createBicycle);

  });

  it('finds a bicycle by id', async() => {
    const myBicycle = await Bicycle.insert({
      brand: 'trek',
      type: 'road',
      cost: 900
    });
    const foundBicycle = await Bicycle.findById(myBicycle.id);
    expect(foundBicycle).toEqual({
      id: myBicycle.id,
      brand: 'trek',
      type: 'road',
      cost: 900
    });



  });
  it('returns null if it cannot find a bicycle by id', async() => {
    const bicycle = await Bicycle.findById(777);
    expect(bicycle).toEqual(null);
  });
  
  it('finds all bicycle', async() => {
    await Promise.all([
      Bicycle.insert({
        brand: 'trek',
        type: 'road',
        cost: 900
         
      }),
      Bicycle.insert({
        brand: 'cannondale',
        type: 'mountain',
        cost: 1200
         
      }),
      Bicycle.insert({
        brand: 'redline',
        type: 'bmx',
        cost: 600
         
      })

    ]);
    const bicycles = await Bicycle.find();

    expect(bicycles).toEqual(expect.arrayContaining([
      { id: expect.any(String), brand: 'trek', type: 'road', cost: 900 },
      { id: expect.any(String), brand: 'cannondale', type: 'mountain', cost: 1200 },
      { id: expect.any(String), brand: 'redline', type: 'bmx', cost: 600}
    ]));

  });

  it('updates a row by id', async() => {
    const createBicycle = await Bicycle.insert({
      brand: 'trek',
      type: 'road',
      cost: 900
    });

    const updatedBicycle = await Bicycle.update(createBicycle.id, {
      brand: 'trek',
      type: 'mountain',
      cost: 1100
    });

    expect(updatedBicycle).toEqual({
      id: createBicycle.id,
      brand: 'trek',
      type: 'mountain',
      cost: 1100

    });
  });
  it('deletes a row by id', async() => {
    const createdBicycle = await Bicycle.insert({
      brand: 'trek',
      type: 'road',
      cost: 900
    });
    const deletedBicycle = await Bicycle.delete(createdBicycle.id);

    expect(deletedBicycle).toEqual({
      id: createdBicycle.id,
      brand: 'trek',
      type: 'road',
      cost: 900
    });

  });

});
