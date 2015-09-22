exports.index = function(req, res) {
  res.render('index');
};

exports.admin = function(req, res) {
  res.render('admin');
};

exports.partials = function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};