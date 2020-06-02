var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.json());

app.post('/account', (req, res) => {
  let account = req.body;
  //console.log('post account');

  fs.readFile('account.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = {
          id: json.nextId++,
          ...account

        };
        json.account.push(account);

        fs.writeFile('account.json', JSON.stringify(json), err => {
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


/*   fs.appendFile('account.json', JSON.stringify(params), err => {
    console.log(err);
  }); */

app.listen(3000, function () {

  try {
    fs.readFile('account.json', 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accont: []
        };
        fs.writeFile('account.json', JSON.stringify(initialJson), err => {
          console.log(err);
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