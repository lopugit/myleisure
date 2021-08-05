module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'dev-myleisure',
      script    : 'node node/app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },
      watch	: ["node/app.js","node/models","node/routes"]
    },
    {
      name      : 'prod-myleisure',
      script    : 'node node/app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },
      watch	: ["node/app.js","node/models","node/routes"]
    },
  ],
};
