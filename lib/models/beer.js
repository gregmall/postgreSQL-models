const pool = require('../utils/pool');

class Beer {
    id;
    name;
    type;
    cost;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
      this.cost = row.cost;

    }

    static async insert(beer) {
      const { rows } = await pool.query(
        'INSERT INTO beers (name, type, cost) VALUES ($1, $2, $3) RETURNING *',
        [beer.name, beer.type, beer.cost]

      );

      return new Beer(rows[0]);

    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM beers WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Beer(rows[0]);

    }

    
}
module.exports = Beer;
