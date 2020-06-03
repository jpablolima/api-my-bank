var express = require("express");
var router = express.Router();
var fs = require('fs');


router.post('/', (req, res) => {
  let account = req.body;
  fs.readFile('global.fileName', 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = {
          id: json.nextId++,
          ...account
        };
        json.accounts.push(account);

        fs.writeFile('global.fileName', JSON.stringify(json), err => {
          if (err) {
            console.log(err);
          } else {
            res.end()
          }
        });
      } catch (err) {
        res.status(400).send({
          error: err.message
        });
      }

    } else {
      res.status(400).send({
        error: err.message
      });
    }
  });
});

router.get('/', (_, res) => {
  fs.readFile('global.fileName', 'utf8', (err, data) => {
    if (!err) {
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    } else {
      res.status(400).send({
        error: err.message
      });
    }
  });
});



router.get('/:id', (req, res) => {
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    if (!err) {
      let json = JSON.parse(data);
      const account = json.accounts.find(account => account.id === parseInt(req.params.id, 10));
      res.send(account);
    } else {
      res.status(400).send({
        error: err.message

      });
    }
  });

});


module.exports = router;