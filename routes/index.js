var express = require('express');
var router = express.Router();
const userModel = require("./users")
const postModel = require("./posts");
const passport = require('passport');
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get("/feed", function(req, res, next){
  res.render("feed")
})

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render("profile");
});

router.post("/register", function(req, res){
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname
  })
  
  userModel.register(userData, req.body.password, function(err, user){
    if(err){
      console.error(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    })
  })
})

router.get('/login', passport.authenticate("local", {
  successRedirect:"/profile",
  failureRedirect:"/login"
}), function(req, res){});

router.get("/logout", function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}


module.exports = router;