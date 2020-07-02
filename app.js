var express=require("express");
var app=express();

var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var methodOverride=require("method-override");
var Campground=require("./models/campgrounds");
var Comment=require("./models/comment");
var User=require("./models/user");

var bodyParser=require("body-parser");
var seedDB=require("./seed");
var  campgrounds = require("./models/campgrounds");
var flash=require("connect-flash");

var campgroundRoutes=require("./routes/campgrounds");
var commentRoutes=require("./routes/comments");
var indexRoutes=require("./routes/index");


mongoose.connect("mongodb://localhost:27017/yelpcamp",{useNewUrlParser:true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
//Passport config
app.use(require("express-session")({
    secret:"campgrounds are best",
    resave:false,
    saveUninitialized:false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);





app.listen(3000,function(){
    console.log("server has startes!!!");
});