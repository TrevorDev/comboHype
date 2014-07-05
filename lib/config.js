var env = process.env.NODE_ENV

// TO RUN IN PRODUCTION USE NODE_ENV=production node app.js
if(env == "production") {
  
} else {
  //DEVELOPMENT ----------------------------------------------------------------------------------
  exports.sessionSecret = "secret"
  exports.appRoot = process.cwd()
  exports.appPort = 3000;

  exports.templateOptions = { 
    map: { html: 'swig' },
    cache: false 
  }

  exports.database = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'startingLine'
  }
}