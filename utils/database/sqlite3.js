//trer listas exportadas de productos y usuarios
const listProducts =[
    { id: 1, title: 'Producto 1', price: 100, url: 'unlink1' },
    { id: 2, title: 'Producto 2', price: 200, url: 'unlink2' },
    { id: 3, title: 'Producto 3', price: 300, url: 'unlink3' },
    { id: 4, title: 'Producto 4', price: 400, url: 'unlink4' }
]
const listUsers = [
    { id: 1, name: 'User 1', email: 'unemail1', mensaje: 'mensaje1' },
    { id: 2, name: 'User 2', email: 'unemail2', mensaje: 'mensaje2' },
    { id: 3, name: 'User 3', email: 'unemail3', mensaje: 'mensaje3' },
    { id: 4, name: 'User 4', email: 'unemail4', mensaje: 'mensaje4' }
]

let sqlite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data/ecomerce.sqlite'}
        });

sqlite.schema.hasTable('users').then(exists => {
    if (!exists) {
        sqlite.schema.createTable('users', table => {
            table.increments('id');
            table.string('name');
            table.string('email');
            table.string('mensaje');
          })
          .then(() => console.log('Created table users'))
          .catch(error => console.log('Error: ', error))
          .finally(() => sqlite.destroy());
    }
});

sqlite('user').insert(listUsers)
  .then(() => console.log('Inserted users'))
  .catch(error => console.log('Error: ', error))
  .finally(() => sqlite.destroy());

sqlite.schema.hasTable('products').then(exists => {
    if (!exists) {
        sqlite.schema.createTable('products', table => {
            table.increments('id');
            table.string('title');
            table.string('price');
            table.string('url');
          })
          .then(() => console.log('Created table products'))
          .catch(error => console.log('Error: ', error))
          .finally(() => sqlite.destroy());
    }
});
sqlite('products').insert(listProducts)
  .then(() => console.log('Inserted products'))
  .catch(error => console.log('Error: ', error))
  .finally(() => sqlite.destroy()
  );

sqlite.from('user').select('*')
  .then(rows => {
    for (let row of rows) {
      console.log(row);
    }
  })
  .catch(error => console.log('Error: ', error))
  .finally(() => sqlite.destroy()
);

sqlite.from('products').select('*')
  .then(rows => {
    for (let row of rows) {
      console.log(row);
    }
  })
  .catch(error => console.log('Error: ', error))
  .finally(() => sqlite.destroy()
);