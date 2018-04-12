const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

MongoClient.connect('mongodb://localhost/library', (err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const app = express();
  const db = client.db('library');
  const notes = db.collection('notes');
  app.use(jsonParser);

  app.post('/notes', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    notes.insertOne(req.body, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
      client.close();
    });
    res.sendStatus(201);
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
});
