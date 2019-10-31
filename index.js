const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');

const checkAge = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/');
  }
  // continua com o processo
  return next();
}

//home
app.get('/', (req, res) => {
  return res.render('start');
});

// maior
app.get('/bigger', checkAge, (req, res) => {
  const { age } = req.query;
  return res.render('bigger', { age });
});

// menor
app.get('/smaller', checkAge, (req, res) => {
  const { age } = req.query;
  return res.render('smaller', { age });
});

// faz a checagem
app.post('/check', (req, res) => {
  const { age } = req.body;
  // verifica se é maior de idade
  if (age >= 18) {
    return res.redirect(`/bigger?age=${age}`);
  } else {
    return res.redirect(`/smaller?age=${age}`);
  }

});

// rodando na porta
app.listen(3000);
