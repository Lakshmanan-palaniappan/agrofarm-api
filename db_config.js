const sql=require('mssql');

const config = {
    user: 'letchu',
    password: 'Developer@2004',
    server: 'laks',
    database: 'AgroFarm',
    options: {
        trustedConnection: true,
        encrypt: false, // Set to false for LocalDB
        trustServerCertificate: true,
    },
  };
  
  
  const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    return null;
  });

module.exports = { poolPromise };