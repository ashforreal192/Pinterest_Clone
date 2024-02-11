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
    // posts: [],
    email: "shatodru@male.com",
    fullName: "Shatodru Sarkar"
  })
  res.send(createdUser)
})

router.get("/cpost", async function(req, res, next){
  let createdPost = await postModel.create({
    postText: "This is a test Post.",
    user: "65c7142d5bc7414cabf3a356"
  })
  let user = await userModel.findOne({_id: "65c7142d5bc7414cabf3a356"})
  user.posts.push(createdPost._id);
  await user.save()
  res.send("Done")
})

module.exports = router;
