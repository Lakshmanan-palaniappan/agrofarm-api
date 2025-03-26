const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql=require('mssql')
const app = express();
const { poolPromise } = require('./db_config');
const bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(cors());

// Register User API
app.post('/api/register', async (req, res) => {
    try {
      const pool = await poolPromise;
      //console.log(pool)
      if (!pool) {
        return res.status(500).send({ error: 'Database connection failed' });
      }
  
      const { name, email, password, role, phone, address } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      const result = await pool.request()
        .input('name', sql.VarChar, name)
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, hashedPassword)
        .input('role', sql.VarChar, role)
        .input('phone', sql.VarChar, phone)
        .input('address', sql.NVarChar, address)
        .query('INSERT INTO Users (name, email, password, role, phone, address) VALUES (@name, @email, @password, @role, @phone, @address)');
        console.log(result)
      
      res.status(201).send({ message: 'User registered successfully!' });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).send({ error: 'Database error' });
    }
  });
app.post('/api/login',async (req,res)=>{
  try{
  const pool= await poolPromise;
  if(!pool){
    res.status(500).send({error:'Database Error'})
  }
  const {email,password}=req.body;
  const result=await pool.request()
  .input('email',sql.VarChar,email)
  .query('SELECT * FROM Users WHERE email=@email')

  if(result.recordset.length===0){
    return res.status(404).send({error:'User Not Found'})

  }
  const user=result.recordset[0]
  const isPassword=await bcrypt.compare(password,user.password)
  if (!isPasswordValid) {
    return res.status(401).send({ error: 'Invalid credentials' });
  }
  res.status(200).send({ message: 'Login successful', userId: user.id, role: user.role });
}catch (err){
  console.error('Login Error',err)
  res.status(500).send({error:'Login Failed due to server error'})
}




})
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));