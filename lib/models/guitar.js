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
    static async findById(id){
      const { rows } = await pool.query(
        'SELECT * FROM guitars WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Guitar(rows[0]);
    }

    static async find(){
      const { rows } = await pool.query(
        'SELECT * FROM guitars'
      );
      return rows.map(row => new Guitar(row));

    }

    static async update(id, updatedGuitar) {
      const { rows } = await pool.query(
        `UPDATE guitars
         SET name = $1,
             type = $2,
             cost = $3
         WHERE id = $4
         RETURNING * 
         `, [updatedGuitar.name, updatedGuitar.type, updatedGuitar.cost, id]
      );
      return new Guitar(rows[0]);

    
    }
    static async delete(id){
      const { rows } = await pool.query(
        'DELETE FROM guitars WHERE id = $1 RETURNING *',
        [id]
      );
      return new Guitar(rows[0]);

    }



}
module.exports = Guitar;
