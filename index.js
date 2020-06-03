var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.json());

app.post('/account', (req, res) => {
  let account = req.body;
  fs.readFile('accounts.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = {
          id: json.nextId++,
          ...account
        };
        json.accounts.push(account);

        fs.writeFile('accounts.json', JSON.stringify(json), err => {
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

app.get('/account', (req, res) => {
  fs.readFile('accounts.json', 'utf8', (err, data) => {
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




app.listen(3000, function () {

  try {
    fs.readFile('accounts.json', 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: []
        };
        fs.writeFile('accounts.json', JSON.stringify(initialJson), err => {
          if (err) {
            console.log(err);
          }

        });

      }
      console.log(err);
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }

  console.log('Api Started');
});