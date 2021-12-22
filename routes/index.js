let userApi = require('../components/users');
module.exports = function(app) {
  let entries = [];
  app.locals.entries = entries;

    userApi(app);

  app.get('/', (req, res,next)=> {
   
    res.render("index", {});
   
  });

  app.post('/', (req, res) => {
    if (!req.body.title || !req.body.body || !req.body.url) {
       res.send(400).send('Entradas deben tener una descripcion, precio y una Url');
    }

    let newEntry = {
       title: req.body.title,
       content: req.body.body, 
       url: req.body.url,
       published: new Date().getDate()

    }
   console.log(newEntry);
   const query = newEntry;
    entries.push(newEntry);
 console.log(app.locals.entries);
    res.redirect('/?'+query);
});
}