
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
  method: "GET",
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
  method: "GET",
  path: "/oliwka",
  handler: function(request, reply) {
    reply({
      title: 'KOCHAM Cie'
    })
  }
}, {
    method: "POST",
    path: "/addevents",
    handler: function(request, reply) {
      var query = "INSERT INTO events (`title`, `start`, `end`, `desc`) VALUES ('"
      + JSON.parse(request.payload).title + "', '"
      + JSON.parse(request.payload).start + "', '"
      + JSON.parse(request.payload).end + "', '"
      + JSON.parse(request.payload).desc
      + "')";
      console.log(query);
      db.query(query, function(err, results) {
        if (err) {
          console.log(err);
          return;
        }
        reply({
          status: 'ok'
        })
      });
  }
}, {
  method: "DELETE",
  path: "/deleteevents",
  handler: function(request, reply) {
    var query = "DELETE FROM events WHERE idevents = '" + JSON.parse(request.payload).id + "'";
    console.log(query);
    db.query(query, function(err, results) {
      if (err) {
        console.log(err);
        return;
      }
      reply({
        status: 'ok'
      })
    });
  }
}
];

var server = new Hapi.Server({
  connections: {
    routes: {
      cors: {
        credentials: true
      }
    }
  }
});

server.connection({
  port: 8080,
});

routes.forEach(function(route) {
  server.route({
    method: route.method,
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
