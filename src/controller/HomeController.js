import connection from '../configs/connectDB'
const getHomePage = (req,res) => {
    let data = [];
    connection.query(
  'SELECT * FROM `users`',
  function(err, results, fields) {
    results.map((row) => {
        data.push({
            id: row.id,
            name:row.name,
            email:row.email,
            address:row.address
        })
    })
    return res.render('../views/index.ejs',{dataUser:(data)})
  }
);
}
module.exports= {
    getHomePage
}