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





});
