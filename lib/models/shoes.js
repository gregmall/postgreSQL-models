const pool = require('../utils/pool');


class Shoe {
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
    static async insert(shoe) {
      const { rows } = await pool.query(
        `INSERT INTO shoes (name, type, cost) 
        VALUES ($1, $2, $3)
        RETURNING * `,
        [shoe.name, shoe.type, shoe.cost]
      );
      return new Shoe(rows[0]);
    }
    static async findById(id){
      const { rows } = await pool.query(
        'SELECT * FROM shoes WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Shoe(rows[0]);
    }

    static async find(){
      const { rows } = await pool.query(
        'SELECT * FROM shoes'
      );
      return rows.map(row => new Shoe(row));

    }

    static async update(id, updatedShoe) {
      const { rows } = await pool.query(
        `UPDATE shoes
         SET name = $1,
             type = $2,
             cost = $3
         WHERE id = $4
         RETURNING * 
         `, [updatedShoe.name, updatedShoe.type, updatedShoe.cost, id]
      );
      return new Shoe(rows[0]);

    
    }
    static async delete(id){
      const { rows } = await pool.query(
        'DELETE FROM shoes WHERE id = $1 RETURNING *',
        [id]
      );
      return new Shoe(rows[0]);
      
    }



}
module.exports = Shoe;
