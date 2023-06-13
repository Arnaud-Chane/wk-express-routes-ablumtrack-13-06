const connexion = require('../../../db-config');
const db = connexion.promise();

const getAll = (req, res) => {
  db.query('SELECT * FROM albums')
    .then(([albums]) => {
      res.status(200).json(albums);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Can't retreive all albums");
    });
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('SELECT * FROM albums where id = ?', [id])
    .then(([albums]) => {
      if (albums[0] != null) {
        res.json(albums[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('got pb');
    });
};

const getTracksByAlbumId = (req, res) => {
  res.status(200).send('Get Albums route is OK');
};

const postAlbums = (req, res) => {
  const { title, genre, picture, artist } = req.body;

  db.query(
    'INSERT INTO albums(title, genre, picture, artist) VALUES(?,?,?,?)',
    [title, genre, picture, artist]
  )
    .then(([result]) => {
      res.location(`/api/albums/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Nope for new album');
    });
};

const updateAlbums = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, genre, picture, artist } = req.body;

  db.query(
    'update albums set title = ?, genre = ?, picture = ?, artist = ? where id = ?',
    [title, genre, picture, artist, id]
  )
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Pb editing album');
    });
};

const deleteAlbums = (req, res) => {
  const id = parseInt(req.params.id);

  db.query('delete from albums where id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Pb deleting User');
    });
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
