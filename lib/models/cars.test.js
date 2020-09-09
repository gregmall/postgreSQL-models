const fs = require('fs');
const Vehicle = require('./cars');
const pool = require('../utils/pool');


describe('Vehicle model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('inserts a new car into the database', async() => {
    const createCar = await Vehicle.insert({
      name: 'ford',
      type: 'truck',
      cost: 20000
    });
    const { rows } = await pool.query(
      'SELECT * FROM cars WHERE id = $1',
      [createCar.id]
    );
    expect(rows[0]).toEqual(createCar);

  });

  it('finds a car by id', async() => {
    const myCar = await Vehicle.insert({
      name: 'ford',
      type: 'truck',
      cost: 20000
    });
    const foundCar = await Vehicle.findById(myCar.id);
    expect(foundCar).toEqual({
      id: myCar.id,
      name: 'ford',
      type: 'truck',
      cost: 20000
    });



  });
  it('returns null if it cannot find a car by id', async() => {
    const car = await Vehicle.findById(777);
    expect(car).toEqual(null);
  });
  
  it('finds all guitars', async() => {
    await Promise.all([
      Vehicle.insert({
        name: 'ford',
        type: 'truck',
        cost: 20000
         
      }),
      Vehicle.insert({
        name: 'volkswagon',
        type: 'SUV',
        cost: 25000
         
      }),
      Vehicle.insert({
        name: 'kia',
        type: 'car',
        cost: 17000
         
      })

    ]);
    const guitars = await Vehicle.find();

    expect(guitars).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'ford', type: 'truck', cost: 20000 },
      { id: expect.any(String), name: 'volkswagon', type: 'SUV', cost: 25000 },
      { id: expect.any(String), name: 'kia', type: 'car', cost: 17000 }
    ]));

  });

  it('updates a row by id', async() => {
    const createCar = await Vehicle.insert({
      name: 'ford',
      type: 'truck',
      cost: '20000'
    });

    const updatedCar = await Vehicle.update(createCar.id, {
      name: 'ford',
      type: 'SUV',
      cost: 24000
    });

    expect(updatedCar).toEqual({
      id: createCar.id,
      name: 'ford',
      type: 'SUV',
      cost: 24000

    });
  });
  it('deletes a row by id', async() => {
    const createdCar= await Vehicle.insert({
      name: 'ford',
      type: 'truck',
      cost: 20000
    });
    const deletedCar = await Vehicle.delete(createdCar.id);

    expect(deletedCar).toEqual({
      id: createdCar.id,
      name: 'ford',
      type: 'truck',
      cost: 20000
    });

  });

});
