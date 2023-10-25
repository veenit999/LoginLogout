const express = require("express");
const app=express();
const path = require("path");
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); //body parser
//Ye ekdam last m use kiye sir ne(for dashboard.ejs)
const cookie = require("cookie-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(session({
    secret:"@123ABC",
    saveUninitialized : true,
    resave:false,
    cookie : {
        maxAge:1000000
    }
}));
//--------------------------------
app.use(express.static("public")); //public folder m html aur css file ko link krne ka middleware
app.set("view engine" , "ejs"); //ejs set hogya as a view engine
const port = '0.0.0.0'; //port number

//EJS is used to send dynamic content

app.get("/login",function(req,res){
    res.render("login",{msg : ""});
    // res.sendFile(path.join(__dirname,"/public/login.html"));

})

// app.get("/home" , function(req,res){
//     res.render("dashboard",{user:req.session.username});
// })

app.post("/actionlogin" , function(req,res){
    if(req.body.username == req.body.password && req.body.username!=""){
        req.session.username = req.body.username; //so that we can get usename in dashboard.ejs after login succesfully
        // res.sendFile(path.join(__dirname,"/dashboard.html"));
        res.render("dashboard", {user : req.session.username});
    }
    else{ 
        // res.redirect("/login.html")
        res.render("login" , {msg : "Invalid user/password"});
    }
} )
app.get("/logout" , function(req,res){
    // req.session.destroy();
    res.render("login" , {msg : ""})
})


app.get("/test" , function(req,res){
    res.render("home", {name : "Veenit", Skills :["HTML" , "CSS" ,"JavaScript" ,"NodeJs"]}); //ek ejs page jo views folder m hona chaiye
}) 









app.listen(port,function(err){
    if(err){
        console.log("Server error...",err);
    }
    else{
        console.log(`Server started at ${port}`);
    }

})

