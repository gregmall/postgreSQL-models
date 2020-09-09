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
    const searchedGuitar = await Guitar.get(req.params.id);
    res.send(searchedGuitar);
  } catch(error) {
    next(error);
        
  }
});




app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
