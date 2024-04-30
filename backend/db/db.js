
const { Pool } = require('pg');
const path = require("path");

require('dotenv').config({
  override: true,
  path: path.join(__dirname, "sample.env")
});

const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
  });


const getUsers = async () => {
  const client = await pool.connect();
  try{  
    const {rows} = await client.query("SELECT * FROM users");
    console.log(rows);

  } catch (err){
    console.log(err)

  } finally{
    client.release();
  }
  
}

getUsers();






