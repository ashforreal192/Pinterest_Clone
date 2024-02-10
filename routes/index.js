var express = require('express');
var router = express.Router();
const userModel = require("./users")
const postModel = require("./posts")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/createuser", async function(req, res, next){
  let createdUser = await userModel.create({
    username: "Shatodru",
    password: "shatodru",
    posts: [],
    email: "shatodru@male.com",
    fullName: "Shatodru Sarkar"
  })
  res.send(createdUser)
})

router.get("/cpost", async function(req, res, next){
  postModel.create({
    postText: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now // Automatically sets the current date and time when a post is created
    },
    likes: {
      type: Array,
      default: []
    }
  })
})

module.exports = router;
