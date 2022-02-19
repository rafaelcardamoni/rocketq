const Database = require('../db/config');

module.exports = {
  async create(req, res) {
    const db = await Database();
    let roomId = '';
    const password = req.body.password;
    let flag = true;
    while (flag == true) {
      // generating the room number
      for (let i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString();
      }
      // verify if the room number already exists inside the database
      const existingIds = await db.all(`SELECT id from rooms`);
      flag = existingIds.some(existingIds => existingIds === roomId);
      // if the roomId is unique, insert it into the database
      if (!flag) {
        // inserting the room into the database
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          ${parseInt(roomId)},
          ${password}
        )`);
      }
      await db.close();
      res.redirect(`/room/${roomId}`);
    }
  },

  async open(req, res) {
    const db = await Database();
    const roomId = req.params.room;
    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    );
    const markedAsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
    );

    let empty = false;
    if (questions.length === 0) {
      if (markedAsRead.length === 0) {
        empty = true;
      }
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      markedAsRead: markedAsRead,
      empty: empty
    });
  },

  async enter(req, res) {
    const db = await Database();
    const roomId = req.body.roomId;
    if (roomId == '') {
      res.redirect('/');
    } else {
      ids = await db.all(`SELECT id FROM rooms WHERE id = ${roomId}`);
      foundRoom = Object.keys(ids).length;

      if (foundRoom === 1) {
        res.redirect(`/room/${roomId}`);
      } else {
        res.render('invalidRoom');
      }
    }
  }
};
