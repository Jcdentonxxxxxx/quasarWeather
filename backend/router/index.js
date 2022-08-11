const Router = require('express').Router;
const UserController = require('../controllers/UserController');
const AddressController = require('../controllers/AddressController');
// const userController = require('../controllers/UserController');

const authMiddleware = require('../middlewaves/auth');

const router = new Router();
// router.post('/registration', userController.registration);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
// router.get('/activate/:link', userController.activate);
// router.get('/refresh', userController.refresh);

router.get('/users', authMiddleware, UserController.index);
router.post('/users', UserController.store);

router.put('/users/:user_id', UserController.update);
router.delete('/users/:user_id', UserController.delete);
router.post('/users/login', UserController.login);

router.use(authMiddleware);

router.get('/users/:user_id/address', AddressController.index);
router.post('/users/:user_id/address', AddressController.store);
router.delete('/users/:id/address', AddressController.delete);
router.put('/users/:id/address', AddressController.update);

router.get('/', (request, response) => {
  return response.send("Server run");
});

module.exports = router;
