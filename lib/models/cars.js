const pool = require('../utils/pool');


class Vehicle {
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
    static async insert(car) {
      const { rows } = await pool.query(
        `INSERT INTO cars (name, type, cost) 
        VALUES ($1, $2, $3)
        RETURNING * `,
        [car.name, car.type, car.cost]
      );
      return new Vehicle(rows[0]);
    }
    static async findById(id){
      const { rows } = await pool.query(
        'SELECT * FROM cars WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Vehicle(rows[0]);
    }

    static async find(){
      const { rows } = await pool.query(
        'SELECT * FROM cars'
      );
      return rows.map(row => new Vehicle(row));

    }

    static async update(id, updatedCar) {
      const { rows } = await pool.query(
        `UPDATE cars
         SET name = $1,
             type = $2,
             cost = $3
         WHERE id = $4
         RETURNING * 
         `, [updatedCar.name, updatedCar.type, updatedCar.cost, id]
      );
      return new Vehicle(rows[0]);

    
    }
    static async delete(id){
      const { rows } = await pool.query(
        'DELETE FROM cars WHERE id = $1 RETURNING *',
        [id]
      );
      return new Vehicle(rows[0]);

    }



}
module.exports = Vehicle;
