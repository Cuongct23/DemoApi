
var express = require('express');
const {route} = require("express/lib/router");
var router = express.Router();
var ApiUserController = require('../controllers/api.user.controller')
const auth=require('../controllers/api.auth.midleware')
router.post('/user/reg', ApiUserController.postReg) ; // đăng ký bằng API
router.post('/user/login',auth,ApiUserController.postLogin ) ;// đăng nhập bằng api
router.get('/user/profile',auth,ApiUserController.getProfile ); // lấy profile user
// router.post('/user/logout',ApiUserController.postLogout ) ;// logout: đăng

module.exports=router;