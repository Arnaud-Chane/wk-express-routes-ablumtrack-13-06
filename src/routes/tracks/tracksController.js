const connexion = require('../../../db-config');
const db = connexion.promise();

const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('SELECT * FROM track where id = ?', [id])
    .then(([track]) => {
      if (track[0] != null) {
        res.json(track[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('got pb');
    });
};

const getAll = (req, res) => {
  db.query('SELECT * FROM track')
    .then(([track]) => {
      res.status(200).json(track);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Can't retreive all track");
    });
};

const postTracks = (req, res) => {
  const { title, youtube_url, id_album } = req.body;

  db.query('INSERT INTO track(title, youtube_url, id_album) VALUES(?,?,?)', [
    title,
    youtube_url,
    id_album,
  ])
    .then(([result]) => {
      res.location(`/api/tracks/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Nope for new track');
    });
};

const updateTracks = (req, res) => {
  res.status(200).send('Update route is OK');
};

const deleteTracks = (req, res) => {
  res.status(200).send('Delete route is OK');
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
