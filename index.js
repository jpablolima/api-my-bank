var express = require('express');
var app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.send("hello world")
});
app.post('/account', (req, res) => {
  let params = req.body;
  console.log('post account');
});

app.listen(3000, function () {
  console.log('Api Started');

});