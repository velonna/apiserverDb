const MySQL = require('../database/mysql');
const mysql = new MySQL();

const getUsers = (req, res) => {
    console.log(process.env.TIENE_PERMISO);
    if(process.env.TIENE_PERMISO == "1"){
     //   console.log(req.body.permiso);
    const query = `SELECT * FROM usuarios`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                users: rows.length ? rows : 'No usuario found',
            });
        }
    });
}
 else{
         return res.json({
            message: 'No tienes permisos para ver esto',
        });
    }

}

const getUser = (req, res) => {
    let id = req.params.id;
    let query = `SELECT * FROM usuarios WHERE id = ${id}`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                user: rows[0] ? rows[0] : 'usuarios not found'
            });
        }
    });
}

const updateUser = (req, res) => {
    let body = req.body;    
    let id = req.params.id;
    let query = `UPDATE usuarios SET nombre = '${body.name}', email = '${body.email}' WHERE id = ${id}`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {    
            return res.json({
                message: 'usuarios updated successfully!',
            });
        }
    });
}

const createUser = (req, res) => {
    let body = req.body;
    let query = `INSERT INTO usuarios (nombre, email, permiso) VALUES ('${body.name}', '${body.email}')`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                message: 'usuarios created successfully!',
            });
        }
    });
}

const deleteUser = (req, res) => {
    let id = req.params.id;
    let query = `DELETE FROM usuarios WHERE id = ${id}`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                message: 'usuarios deleted successfully!',
            });
        }
    });
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
}