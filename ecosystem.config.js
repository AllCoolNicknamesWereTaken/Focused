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
        COMMON_VARIABLE: "true",
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
//      repo : "https://github.com/wojtekw92/Focused.git",
      repo: "https://github.com/AllCoolNicknamesWereTaken/Focused.git",
      path : "/srv/oliwia",
      "post-deploy" : "npm install && export PUBLIC_URL=http://oliwia.jelocartel.com && npm run build && cp ../config.json ./srv/config.json && pm2 startOrRestart ecosystem.config.js --env production"
    },
  }
}
