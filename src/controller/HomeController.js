import pool from '../configs/connectDB'
const getHomePage = async (req,res) => {
    let data = [];
  try{
    const [rows, fields] = await pool.execute( 'SELECT * FROM `users`');
    return res.render('index.ejs',{dataUser:rows})
  }
  catch(err){console.log(err)}

  console.log('check row',rows)
// const results = await pool.query("select * from users");
    
 }
let getDetailPage = async (req, res) =>{
  try{
    let userId = req.params.userId;
    let [user] = await pool.execute('SELECT * FROM `users` WHERE `id` = ?',[userId]);
    console.log(user);  
    return res.json(user)
  }
  catch(err) {
    console.log(err)
  };
}
let createNewUser = async (req, res) => {
  let dataUser = req.body;
  let {fname,lname,email,address}  = dataUser
  //INSERT INTO table_name
  //VALUES (value1, value2, value3, ...);
  await pool.execute('insert into users values (?,?,?,?)',[fname,lname,email,address])

  return res.redirect('/')
}
module.exports= {
    getHomePage,
    getDetailPage,
    createNewUser
}