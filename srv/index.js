var config = require('./config.json');
var Hapi = require("hapi");
var DB = require("mysql");

var isDebug  = process.argv.pop() === 'DEBUG';

console.log('isDebug?', isDebug);

var facebookAuth = require('hapi-auth-facebook');
var Request = require('request-promise-native');

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
      console.log(request.payload.title);
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

var serverConfig = {
  port: 8080
};

if (isDebug) {
  serverConfig.host = 'localhost';
}
server.connection(serverConfig);


var facebookAuthRequestUrl = '/authfacebook';

server.register({
  register: facebookAuth,
  options: {
    handler: function(request, reply, accessToken) {
      Request.get('https://graph.facebook.com/me?&access_token=' + accessToken)
      .then(function(user) {
        console.log(user);
        user = JSON.parse(user);
        Request.get('https://graph.facebook.com/' + user.id + '/events?access_token=' + accessToken)
        .then(function(events) {
          console.log("eventy to : " + events + "token " + accessToken);
        });
        db.query("SELECT * FROM users WHERE facebookid= '" + user.id + "'" , function(err, results) {
          if (err) {
            console.log("errory EJ errory!" + err )
            return;
          }
          if(results == "") {
            console.log("puste");
            var query = "INSERT INTO users (`facebookid`, `name`) VALUES ('" + user.id + "','" + user.name + "')";

              console.log(query);
              db.query(query, function(err, results) {
                if (err) {
                  console.log("errory w insercie 2222  ", err);
                  return;
                }

              });
          }
          return;
        });
        console.log(`<script>location = 'http://${isDebug ? 'localhost:3000' : 'oliwia.jelocartel.com'}/#main';</script>`);
        reply(`<script>location = 'http://${isDebug ? 'localhost:3000' : 'oliwia.jelocartel.com'}/#main';</script>`);

      });

    },
    redirectUri: '/zalogowalem',
    tokenRequestPath: facebookAuthRequestUrl
  }
}, function (err) {
  console.log(err);
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
