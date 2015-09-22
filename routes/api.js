var fs = require('fs'),
    data,
    current_id;

/* Get messages */
data = JSON.parse(fs.readFileSync('./data/messages.json', 'utf8'));

/* Find current message id */
for (var i = 0; i < data.length; i++) {
  if (current_id < data[i].id) {
    current_id = data[i].id;
  }
}

/* GET */
exports.getData = function(req, res) {
  for (var i = 0; i < data.length; i++) {
    data[i].id = i;
  }
  current_id = i;

  res.setHeader('Content-Type', 'application/json');
  res.send(data);
};

/* POST */
exports.postData = function(req, res) {
  var newMsg = {},
      date = new Date();

  newMsg.id = ++current_id;
  newMsg.from = req.body.from;
  newMsg.text = req.body.text;
  newMsg.date = date.toISOString();
  data.push(newMsg);

  res.json(true);
/*
  Uncomment this line if you want posted messages to be saved
  to an external "messages.json" file
*/
  /*fs.writeFile('./data/messages.json', JSON.stringify(data), 'utf8', function(err) {
    if (err) throw err;
    res.send(data);
  });*/
};

/* DELETE */
exports.deleteMessage = function(req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.length) {
    data.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};

/* PUT */
exports.editMessage = function(req, res) {
  var id = req.params.id;
  
  if (id >= 0 && id < data.length) {
    data[id].text = req.body.text;
    res.json(true);
  } else {
    res.json(false);
  }
};