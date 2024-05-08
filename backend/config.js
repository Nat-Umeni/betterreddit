module.exports = {
  DB: {
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT
  },
 
  PORT: process.env.SERVER_PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  
}