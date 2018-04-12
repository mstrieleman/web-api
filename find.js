const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost/library', (err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const db = client.db('library');
  const notes = db.collection('notes');

  notes.find().toArray((err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }

    client.close();
  });
});
