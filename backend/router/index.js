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
router.post('/users', UserController.store);
router.put('/users/:user_id', UserController.update);
router.delete('/users/:user_id', UserController.delete);
router.post('/users/login', UserController.login);

router.get('/', (request, response) => {
  return response.send("Server run");
});

module.exports = router;
