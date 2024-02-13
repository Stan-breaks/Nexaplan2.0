const {Router} = require('express');
const router = Router();

router.get('/list', (req, res) => {
  res.send('List');
});
