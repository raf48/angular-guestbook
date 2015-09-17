var fs = require('fs'),
    data;

/* Get messages */
data = JSON.parse(fs.readFileSync('./data/messages.json', 'utf8'));

/* GET */
exports.getData = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
};

/* POST */
exports.postData = function(req, res) {
  var newMsg = {},
      date = new Date();

  newMsg.from = req.body.from;
  newMsg.text = req.body.text;
  newMsg.date = date.toISOString();
  data.push(newMsg);
  
  res.send(data);
  /*fs.writeFile('./data/messages.json', JSON.stringify(data), 'utf8', function(err) {
    if (err) throw err;
    res.send(data);
  });*/
};