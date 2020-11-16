const indexRouter = require('express').Router();

indexRouter.get('/', (req, res) => {
  res.render('home', {});
});

indexRouter.get('/room', (req, res) => {
  res.render('roomMake', {});
});

export default indexRouter;
