

var Hapi = require("hapi");

var routes = [{
  path: "/events",
  handler: function(request, reply) {
    reply({
      id: 1,
      title: 'hello',
      start: new Date()
    });
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
