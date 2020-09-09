const express = require('express');
const app = express();
const Guitar = require('./models/guitar');

app.use(express.json());

app.post('/api/guitars', async(req, res, next) => {
  try {
    const createdGuitar = await Guitar.insert(req.body);
    res.send(createdGuitar);
        
  } catch(error) {
    next(error);
        
  }
});

app.get('/api/guitars/:id', async(req, res, next) => {
  try {
    const guitarId = req.params.id;
    const data = await Guitar.find(`
        SELECT * FROM guitars
        WHERE id = $1`, [guitarId]);

    res.send(data.rows[0]);

  } catch(error) {
    next(error);
        
  }
});

app.delete('/api/guitars/:id', async(req, res, next) => {
  try {
    const deletedGuitar = await Guitar.delete(req.params.id);
    res.send(deletedGuitar);
  } catch(error) {
    next(error);
        
  }
});



app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
