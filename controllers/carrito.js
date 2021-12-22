const MySQL = require('../database/mysql');
const mysql = new MySQL();

const getCarritos = (req, res) => {
    const query = `SELECT * FROM carrito_de_compras`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                users: rows.length ? rows : 'No Carrito found',
            });
        }
    });
}

const getCarrito = (req, res) => {
    let id = req.params.id;
    let query = `SELECT * FROM Carrito WHERE id = ${id}`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                user: rows[0] ? rows[0] : 'Carrito not found'
            });
        }
    });
}

const createCarrito = (req, res) => {
    let body = req.body;
    let query = `INSERT INTO Carrito (product_id, nombre,timestamp) 
                    VALUES ('${body.product_id}','${body.nombre}','${body.timestamp}')`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                message: 'Carrito created successfully!',
            });
        }
    });
}

const deleteCarrito = (req, res) => {
    let id = req.params.id;
    let query = `DELETE FROM Carrito WHERE id = ${id}`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                message: 'Carrito deleted successfully!',
            });
        }
    });
}

module.exports = {
    getCarritos,
    getCarrito,
    createCarrito,
    deleteCarrito
}