module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "API",
      script    : "srv/index.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "oliwia",
      host : "oliwia.jelocartel.com",
      ref  : "origin/master",
      repo : "git@github.com:wojtekw92/Focused.git",
      path : "/srv/oliwia",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
  }
}
