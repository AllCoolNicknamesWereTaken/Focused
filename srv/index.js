var config = require('./config.json');
var Hapi = require("hapi");
var DB = require("mysql");

var isDebug  = process.argv.pop() === 'DEBUG';

console.log('Działam w trybie', isDebug ? 'DEBUG' : 'PRODUCTION');

var facebookAuth = require('hapi-auth-facebook');
var Request = require('request-promise-native');

var db = DB.createConnection({
  host      : config.DB.host,
  user      : config.DB.user,
  password  : config.DB.pass,
  database  : config.DB.db

});
db.connect();

const getUserId = function(externalId, name) {
	return new Promise((resolve, reject) => {
		db.query('SELECT id FROM users WHERE `facebookid` = "' + externalId + '"', function(err, results) {
			if (err) {
				reject({
					status: 'error',
					error: err
				});
			} else {
				if (results.length) {
					resolve(results[0].id);
				} else {
					console.log("Tworze nowego usera");
					var query = "INSERT INTO users (`facebookid`) VALUES ('" + externalId + "')";
					db.query(query, function(err, results) {
						if (err) {
							reject({
								status: 'error',
								error: err
							})
						} else {
							console.log("Będzie miał ID:", results.insertId);
							resolve(results.insertId);
						}
					});
				}
			}
		});
	});
};

var routes = [{
  method: "POST",
  path: "/events",
  handler: function(request, reply) {
		console.log("Będę ładować eventy");
		getUserId(JSON.parse(request.payload).user).then((userId) => {
			console.log("Ładuję eventy dla użytkownika", userId);
			db.query("SELECT * FROM Focused.events "
			 + "LEFT JOIN Focused.user_events "
			 + "ON user_events.id_events = events.idevents "
    	 + "WHERE user_events.id_user = " + userId, function(err, results) {
				if (err) {
					reply({
						status: 'error',
						error: err
					});
					return;
				}
				reply({
					status: 'ok',
					data: results
				})
			});
		}).catch(console.error);
  }
}, {
    method: "POST",
    path: "/addevents",
    handler: function(request, reply) {
			console.log("Będę dodawać event");
			getUserId(JSON.parse(request.payload).user).then((userId) => {
				console.log("Dodaję event dla użytkownika", userId);
				var query = "INSERT INTO events (`title`, `start`, `end`, `desc`) VALUES ('"
				+ JSON.parse(request.payload).title + "', '"
				+ JSON.parse(request.payload).start + "', '"
				+ JSON.parse(request.payload).end + "', '"
				+ JSON.parse(request.payload).desc
				+ "')";
				db.query(query, function(err, results) {
					if (err) {
						console.log(err);
						return;
					}

					console.log("Dodałem event o ID:", results.insertId);
					db.query(
						"INSERT INTO user_events (`id_user`, `id_events`) "
						+ "VALUES ('" + userId + "', '" + results.insertId + "')", function(err, result) {
							if (err) {
								console.log(err);
								return;
							}

							reply({
								status: 'ok'
							})
						});
				});
			});
  }
}, {
  method: "DELETE",
  path: "/deleteevents",
  handler: function(request, reply) {
    var query = "DELETE FROM events WHERE idevents = '" + JSON.parse(request.payload).id + "'";
    console.log("Usuwam event", JSON.parse(request.payload).id );
    db.query(query, function(err, results) {
      if (err) {
        console.log(err);
        return;
      }

			var query = "DELETE FROM user_events WHERE id_events = '" + JSON.parse(request.payload).id + "'";
			db.query(query, function(err, results) {
	      if (err) {
	        console.log(err);
	        return;
	      }
	      reply({
	        status: 'ok'
	      });
			});
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
} else {
  serverConfig.host = 'oliwia.jelocartel.com';
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

          console.log('dupa');
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
