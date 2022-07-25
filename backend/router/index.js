const Router = require('express').Router;
const UserController = require('../controllers/UserController');
// const userController = require('../controllers/UserController');

const router = new Router();
// router.post('/registration', userController.registration);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
// router.get('/activate/:link', userController.activate);
// router.get('/refresh', userController.refresh);
router.get('/users', UserController.index);

router.get('/', (request, response) => {
  return response.send("Server run");
});

module.exports = router;
