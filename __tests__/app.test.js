const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Guitar = require('../lib/models/guitar');

describe('postgreSQL-models routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new guitar via POST', async() => {
    const response = await request(app)
      .post('/api/guitars')
      .send({ name: 'gibson', type: 'guitar', cost: 900 });

    expect(response.body).toEqual({
      id: expect.any(String),                
      name: 'gibson',
      type: 'guitar',
      cost: 900                                             
    });

  });
  // it('finds a guitar by ID via GET', async() => {
  //   const searchedGuitars = await Guitar.insert({
  //     name: 'gibson',
  //     type: 'guitar',
  //     cost: 900
  //   });
  //   const response = await request(app)
  //     .get(`/api/guitars/${searchedGuitars.id}`);

  //   expect(response.body).toEqual({
  //     id: searchedGuitars.id,
  //     name: 'gibson',
  //     type: 'guitar',
  //     cost: 900
  //   });


  // });

  it('deletes a guitar by id with DELETE', async() => {
    const createdGuitar = await Guitar.insert({
      name: 'gibson',
      type: 'guitar',
      cost: 900
    });
    const response = await request(app)
      .delete(`/api/guitars/${createdGuitar.id}`);

    expect(response.body).toEqual({
      id: createdGuitar.id,
      name: 'gibson',
      type: 'guitar',
      cost: 900

    });
  });



});
