
var config = require('./config.json');
var Hapi = require("hapi");
var DB = require("mysql");

var db = DB.createConnection({
  host      : config.DB.host,
  user      : config.DB.user,
  password  : config.DB.pass,
  database  : config.DB.db

});
db.connect();
var routes = [{
  path: "/events",
  handler: function(request, reply) {
    db.query("SELECT * FROM events", function(err, results) {
      if (err) {
        reply({
          status: 'error',
          error: err
        });
        return;
      }
      console.log(results);
      reply({
        status: 'ok',
        data: results
      })
    });
    // reply({
    // });
  }
}, {
  path: "/oliwka",
  handler: function(request, reply) {
    reply({
      title: 'KOCHAM Cie'
    })
  }
}];

var server = new Hapi.Server();
server.connection({
  host: "localhost",
  port: 8080,
});

routes.forEach(function(route) {
  server.route({
    method: "GET",
    path: route.path,
    config: {
      handler: route.handler
    }
  })
});

server.start(function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Server yazda!');
});
