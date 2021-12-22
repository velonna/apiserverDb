const MySQL = require('../database/mysql');
const mysql = new MySQL();

const getProductos = (req, res) => {
    const query = `SELECT * FROM producto`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                users: rows.length ? rows : 'No producto found',
            });
        }
    });
}

const getProducto = (req, res) => {
    let id = req.params.id;
    let query = `SELECT * FROM producto WHERE id = ${id}`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                user: rows[0] ? rows[0] : 'Productos not found'
            });
        }
    });
}

const updateProducto = (req, res) => {
    if(process.env.TIENE_PERMISO == "1"){

    let body = req.body;    
    let id = req.params.id;
    let query = `UPDATE producto SET nombre = '${body.name}', descripcion = '${body.descripcion}', 
                foto = '${body.foto}', precio = '${body.precio}' WHERE id = ${id}`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {    
            return res.json({
                message: 'Producto updated successfully!',
            });
        }
    });
    }else{
        return res.json({
            message: 'No tienes permisos para ver esto',
        });
    }
}

const createProducto = (req, res) => {
    if(process.env.TIENE_PERMISO == "1"){
    let body = req.body;
    let query = `INSERT INTO producto (nombre, descripcion,codigo,foto,precio,stock) 
                    VALUES ('${body.name}','${body.descripcion}','${body.codigo}','${body.foto}','${body.precio}','${body.stock}')`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                message: 'producto created successfully!',
            });
        }
    });
}else{
    return res.json({
        message: 'No tienes permisos para ver esto',
    });
}
}

const deleteProducto = (req, res) => {
    if(process.env.TIENE_PERMISO == "1"){

    let id = req.params.id;
    let query = `DELETE FROM producto WHERE id = ${id}`;
    
    mysql.query(query, (err, rows) => {
        if (err) {
            console.log('[MySQL] Error: ', err);
            return res.status(500).json({
                error: err
            });
        } else {
            return res.json({
                message: 'producto deleted successfully!',
            });
        }
    });
    }else{
        return res.json({
            message: 'No tienes permisos para ver esto',
        });
    }
}

module.exports = {
    getProductos,
    getProducto,
    updateProducto,
    createProducto,
    deleteProducto
}