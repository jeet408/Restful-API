var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [];
var id = 0;

app.get('/lions', function(req, res){
  res.json(lions);
});

//GET: retrieve a resource
app.get('/lions/:id', function(req, res){
  var lion = _.find(lions, {id: req.params.id});
  res.json(lion || {});
});

//POST: create a resource within a given collection
app.post('/lions', function(req, res) {
  var lion = req.body;
  id++;
  lion.id = id + '';

  lions.push(lion);

  res.json(lion);
});

//PUT: update a resource
app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

//DELETE: delete a resource
app.delete('/lions/:id', function (req, res) {
  var lion = _.find(lions, {id: req.params.id});
  var index = req.body;

  if (lions.indexOf(lion) != index) {
    res.send();
  } else {
    delete lions[lion];
    //send back to json response
    res.json(lions);
  }
});

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function() {
 console.log("Node app is running at localhost:" + app.get('port'))
});

