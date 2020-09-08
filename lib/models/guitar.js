const pool = require('../utils/pool');

class Guitar {
    id;
    name;
    type;
    cost;

    constructor(row){
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
      this.cost = row.cost;
    }
    static async insert(guitar) {
      const { rows } = await pool.query(
        `INSERT INTO guitars (name, type, cost) 
        VALUES ($1, $2, $3)
        RETURNING * `,
        [guitar.name, guitar.type, guitar.cost]
      );
      return new Guitar(rows[0]);
    }

}
module.exports = Guitar;
