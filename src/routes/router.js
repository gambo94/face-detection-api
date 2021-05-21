const { Router } = require('express');
const router = Router();
const controller = require('../controller/controller')

/* ROUTES */

//  '/signin' POST returns success/fail (it's POST and not GET because we pass a password)
router.post('/signin', controller.signin);

//  '/register' POST returns new user object
router.post('/register', controller.register);

//  '/profile/:userId' GET user
router.get('/profile/:id', controller.get_user);

//  '/image' PUT updates ranking
router.put('/image', controller.update);


module.exports = router;