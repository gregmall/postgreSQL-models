const pool = require('../utils/pool');


class Bicycle {
    id;
    brand;
    type;
    cost;

    constructor(row){
      this.id = row.id;
      this.brand = row.brand;
      this.type = row.type;
      this.cost = row.cost;
    }
    static async insert(bicycle) {
      const { rows } = await pool.query(
        `INSERT INTO bicycles (brand, type, cost) 
        VALUES ($1, $2, $3)
        RETURNING * `,
        [bicycle.brand, bicycle.type, bicycle.cost]
      );
      return new Bicycle(rows[0]);
    }
    static async findById(id){
      const { rows } = await pool.query(
        'SELECT * FROM bicycles WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Bicycle(rows[0]);
    }

    static async find(){
      const { rows } = await pool.query(
        'SELECT * FROM bicycles '
      );
      return rows.map(row => new Bicycle(row));

    }

    static async update(id, updatedBicycle) {
      const { rows } = await pool.query(
        `UPDATE bicycles 
         SET brand = $1,
             type = $2,
             cost = $3
         WHERE id = $4
         RETURNING * 
         `, [updatedBicycle.brand, updatedBicycle.type, updatedBicycle.cost, id]
      );
      return new Bicycle(rows[0]);

    
    }
    static async delete(id){
      const { rows } = await pool.query(
        'DELETE FROM bicycles WHERE id = $1 RETURNING *',
        [id]
      );
      return new Bicycle(rows[0]);

    }



}
module.exports = Bicycle;
