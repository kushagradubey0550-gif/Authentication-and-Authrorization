const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const  User = require('./models/user');
const Post = require('./models/post');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

app.get('/' , (req, res) => {
  res.send("hello");
})

app.get('/register' , (req, res) => {
  res.render("register");
})

app.post('/register', async (req, res) => {
  let {username, email, password} = req.body;

  let existingUser = await User.findOne({email});
  if(existingUser){
    return res.send("User already exists");
  }
  let hash = await bcrypt.hash(password ,10);
  let user = new User({
        username,
        email,
        password : hash
      });


  await user.save();
  console.log(user);
  res.redirect("/login");

})

app.get('/login' , (req, res) => {
  res.render("login");
})

app.post('/login', async (req, res) =>{
  let {email, password} = req.body;
  let user = await User.findOne({email});
  if(!user){
    return res.send("invalid email or password");
  }
  let isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    return res.send("Invalid email or password");
  }
  console.log(req.body);
  req.session.userId = user._id;
  res.redirect("/profile");
  
})

app.get('/admin', auth, isadmin, (req, res) => {
    res.send("Welcome Admin");
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err) {
      return res.send("Something Went Wrong")
    }
    res.redirect('/login');
  })
})

app.get('/profile', auth, async (req, res) =>{
  let user = await User.findById(req.session.userId);

  let posts = await Post.find();

  res.render("profile", { user, posts });
  console.log(user)

})

app.get('/create', auth, (req, res) => {
  res.render("create");
})

app.post('/create-post', auth, async (req, res) => {
  let {title, content} = req.body;
  let userId = req.session.userId;

  let post = new Post({
    title,
    content,
    userId
  });
  await post.save();
  res.redirect('/profile');
});

app.get('/edit/:id', auth, async (req, res) => {
  let postId = req.params.id;
  let post = await Post.findById(postId);
  let logged = await User.findById(req.session.userId);


  if(post.userId.toString() !== req.session.userId.toString() && logged.role !== "admin"){
    return res.send("Access Denied");
  }

  res.render('edit', { post });
});


app.post('/edit/:id', auth, async (req, res) => {
  let postId =req.params.id;
  let post =await Post.findById(postId);

  let logged = await User.findById(req.session.userId);

  if(post.userId.toString() !== req.session.userId.toString() && logged.role !== "admin"){
    return res.send("Access Denied");
  }

  let {title, content} = req.body;

  post.title = title;
  post.content = content;

  await post.save();
  res.redirect('/profile');
}) 

app.post('/delete/:id', auth, async (req, res) => {
  let postId = req.params.id;
  let post = await Post.findById(postId);
  let logged = await User.findById(req.session.userId);
  if(post.userId.toString() !== req.session.userId.toString() && logged.role !== "admin"){
    return res.send("Access Denied");
  }
  await Post.findByIdAndDelete(postId);
  res.redirect('/profile');
})

app.get('/edit-profile', auth, async (req, res) => {
  let user = await User.findById(req.session.userId);
  res.render('edit-profile', { user });
});

app.post('/edit-profile', auth, async (req, res) => {
  let user = await User.findById(req.session.userId);
  let { username, email } = req.body;
  user.username = username;
  user.email = email;
  await user.save();
  res.redirect('/profile');
});

function auth(req, res, next){
  if(!req.session.userId){
    res.redirect('/login');
  }else{
    next();
  }
}

async function isadmin(req, res, next){
  let logged= await User.findById(req.session.userId);

  if(logged.role === "admin"){
    next();
  }else{
    return res.send("Access Denied");
  }

};

app.listen(4000);