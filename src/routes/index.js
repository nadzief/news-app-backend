'use strict'
const routes = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const nodemailer = require('nodemailer');
const uuid = require('./../helper/utility');
const smtpTransport = require('nodemailer-smtp-transport');
const { check } = require('express-validator/check');
const connection = require('./../dbconnection')
const md5 = require('md5');
const fs = require('fs');
const path = require('path')

const postNewsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__basedir}/assets/images`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const newsUpload = multer({ storage: postNewsStorage });

// var transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     auth: {
//         user: 'adm.mafaza@gmail.com',
//         pass: '999dinar'
//     }
// }));

// transporter.verify((error, success) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Server is ready to take a mail contact');
//     }
// });

/**
 * NOTE: POST START
 */

routes.post('/post/contact', (req, res, next) => {
    var nama_lengkap = req.body.nama_lengkap
    var nama_perusahaan = req.body.nama_perusahaan
    var email = req.body.email
    var no_hp = req.body.no_hp
    var pesan = req.body.pesan
    var content = `nama: ${nama_lengkap} \n nama perusahaan: ${nama_perusahaan} \n email: ${email} \n no hp: ${no_hp} \n pesan: ${pesan}`

    var mail = {
        from: email,
        to: 'adm.mafaza@gmail.com',
        subject: 'Kritik dan Saran',
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            console.log(data)
            res.json({
                msg: 'success'
            })
        }
    })
})

// Register Admin
const RegisterAdmin = require('./post/postRegisterAdmin');
routes.post('/post/adminRegister', RegisterAdmin);

// Register User
const postRegister = require('./post/postRegister');
routes.post('/post/register', postRegister);

// Login
routes.post('/post/login', function(req, res){
    var username = req.body.username;
    var password = md5(req.body.password);

    // console.log(username, password);

    connection.query('SELECT * FROM tb_admin WHERE username = $1', [username], function(error, results, fields){
        if (error) {
            console.log('error', error)
            res.send({
                'code': 400,
                'failed': 'login failed'
            })
        }else{
            // console.log(results.rows.length > 0)
            if(results.rows.length > 0){
                console.log(password, results.rows[0].password)
                if(md5(results.rows[0].password) == password){
                    res.send({
                        'code': 200,
                        'success':'login success'
                    });
                }else{
                    res.send({
                        'code': 204,
                        'success': "username and password does not match"
                    });
                }
            } 
            else{
                res.send({
                    'code': 204,    
                    'success': "username does not exists"
                });
            }
        }
    });
    }
);

// Login User
routes.post('/post/login', function(req, res){
    var username = req.body.username;
    var password = md5(req.body.password);

    connection.query('SELECT * FROM tb_user WHERE username = $1', [username], function(error, results, fields){
        if (error) {
            console.log('error', error)
            res.send({
                'code': 400,
                'failed': 'login failed'
            })
        }else{
            console.log(results.rows.length > 0)
            if(results.rows.length > 0){
                console.log(password, results.rows[0].password)
                if(results.rows[0].password == password){
                    res.send({
                        'code': 200,
                        'success':'login success'
                    });
                }else{
                    res.send({
                        'code': 204,
                        'success': "username and password does not match"
                    });
                }
            } 
            else{
                res.send({
                    'code': 204,    
                    'success': "username does not exists"
                });
            }
        }
    });
    }
);

//Berita
const postBerita = require('./post/postBerita');
routes.post('/post/berita', newsUpload.array('images', 5), [
    check([
        'title',
        'content',
        'author'
    ]).exists()
], postBerita);

// User
const postUser = require('./post/postUser');
routes.post('/post/user', newsUpload.array('image', 5), [
    check([
        'nama',
        'email'
    ]).exists()
], postUser);

const postCategory = require('./post/postCategory');
routes.post('/post/category', postCategory);

/**
 * NOTE: POST END
 */

/**
 * NOTE: GET START
 */

// User
const getUser = require('./get/getUser')
routes.get(['/get/user/', '/get/user/:id'], getUser);

// Berita
const getBerita = require('./get/getBerita')
routes.get(['/get/berita/', '/get/berita/:id'], getBerita);

const getBeritaOne = require('./get/getBeritaOne')
routes.get(['/get/beritaOne/', '/get/beritaOne/:id'], getBeritaOne);

const getBeritaThree = require('./get/getBeritaThree')
routes.get(['/get/beritaThree/', '/get/beritaThree/:id'], getBeritaThree);

// category
const getCategory = require('./get/getCategory')
routes.get(['/get/category/', '/get/category/:id'], getCategory);

const getImage = require('./get/getImage')
routes.get(['/image/:image'], getImage)

/**
 * NOTE: GET END
 */

/**
 * NOTE: DELETE START
 */

//Berita
const deleteBerita = require('./delete/deleteBerita')
routes.delete('/delete/berita/:id', deleteBerita)

//User
const deleteUser = require('./delete/deleteUser')
routes.delete('/delete/user/:id', deleteUser)

// Category
const deleteCategory = require('./delete/deleteCategory')
routes.delete('/delete/category/:id', deleteCategory)

/**

* NOTE: DELETE END

 */

/**
 * NOTE: EDIT START
 */

//Berita
const editBerita = require('./put/editBerita')
routes.post('/edit/berita', newsUpload.array('images', 5), [
    check([
        'title',
        'content',
    ]).exists()
], editBerita)

// User
const editUser = require('./put/editUser')
routes.post('/edit/user', newsUpload.array('image', 5), [
    check([
        'nama',
        'username',
    ]).exists()
], editUser)

// Category
const editCategory = require('./put/editCategory')
routes.post('/edit/category', editCategory);

/**
 * NOTE: EDIT END
 */

module.exports = routes;