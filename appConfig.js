var developmentDatabase = {
    postgres: {
    host: 'ec2-54-246-85-151.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'da8kifaob5jvul',
    user: 'pfdmzfaceoikgc',
    password: 'ba628754d504788404bf28bf8c287a9fe829c4eca9baa2cdfa2b26a4e93ff0f4'
    }
    }
    
    var connectionString = "postgres://pfdmzfaceoikgc:ba628754d504788404bf28bf8c287a9fe829c4eca9baa2cdfa2b26a4e93ff0f4@ec2-54-246-85-151.eu-west-1.compute.amazonaws.com:5432/da8kifaob5jvul";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
