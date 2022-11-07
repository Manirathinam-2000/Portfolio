const express = require("express");
const jsdom = require("jsdom");
const fs = require("fs");
const bodyParser = require("body-parser");
const _ = require("lodash");
const http = require("http");
const url = require("url");
const app = express();

const dom = new jsdom.JSDOM(fs.readFileSync('views/header1.ejs'));
const $ = require("jquery")(dom.window);

app.set("view engine", ".ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let aURL = "";
let pageStyle = "style1-light.css";
let btnTheme = "dark";
let lndImg = "MR_landing_img_lt.png";
let logoName = "";
let imgBGTheme = "light";
let c = 0;
let g = 0;
let gCat = "";
let gFor = "";
let gArr = [];

app.get("/", function(req,res){
  // console.log($(".theme-button").scrollTop());
  aURL = "";
  if(btnTheme === "dark"){
    imgBGTheme = "light";
  }
  else{
    imgBGTheme = "dark";
  }
  res.render("home", {
    stylesheetName : pageStyle,
    btnTheme : btnTheme,
    actionUrl: aURL,
    landingImg: lndImg,
    imgBGTheme: imgBGTheme
  });
});

app.get("/Gallery-Designs", function(req,res){
  aURL = _.replace(url.parse(req.url).pathname,"/","");
  logoName = parseInt(req.query.id);
  gArr=[];
  for(let i = 1; i<= logoName ; i++){
    gArr.push(i);
  }
  res.render(aURL, {
    stylesheetName : pageStyle,
    btnTheme : btnTheme,
    actionUrl: aURL,
    landingImg: lndImg,
    gArr: gArr

  });
});

app.get("/Gallery", function(req,res){
  aURL = _.replace(url.parse(req.url).pathname,"/","");
  logoName = parseInt(req.query.id);
  gCat = req.query.name;
  gFor = req.query.format;
  gArr=[];
  for(let i = 1; i<= logoName ; i++){
    gArr.push(i);
  }
  res.render(aURL, {
    stylesheetName : pageStyle,
    btnTheme : btnTheme,
    actionUrl: aURL,
    landingImg: lndImg,
    gArr: gArr,
    galC: gCat,
    gFormat: gFor

  });
});

app.get("/:customPageURL", function(req,res){
  aURL = _.replace(url.parse(req.url).pathname,"/","");
  logoName = req.query.id;
  res.render(aURL, {
    stylesheetName : pageStyle,
    btnTheme : btnTheme,
    actionUrl: aURL,
    landingImg: lndImg,
    logoName: logoName
  });
});


// app.get("/Graphic-Design/:customPageURL", function(req,res){
//   aURL = _.replace(url.parse(req.url).pathname,"/","");
//   res.render(aURL, {
//     stylesheetName : pageStyle,
//     btnTheme : btnTheme,
//     actionUrl: aURL,
//     landingImg: lndImg
//   });
//   console.log("new Get working");
// });
app.post("/", function(req,res){
  if(c===0){
    pageStyle = "style1-dark.css";
    lndImg = "MR_landing_img_dr.png";
    btnTheme = "light";
    c=1;
  }
  else{
    pageStyle = "style1-light.css";
    lndImg = "MR_landing_img_lt.png";
    btnTheme = "dark";
    c=0;
  }
  res.redirect("/");
})

app.post("/:customPageURL", function(req,res){

  if(c===0){
    pageStyle = "style1-dark.css";
    lndImg = "MR_landing_img_dr.png";
    btnTheme = "light";
    c=1;
  }
  else{
    pageStyle = "style1-light.css";
    lndImg = "MR_landing_img_lt.png";
    btnTheme = "dark";
    c=0;
  }

  res.redirect(url.parse(req.url).pathname + "?id=" + logoName + "&name=" + gCat + "&format=" + gFor);
})

// $(".scroll-to-top").css("width","50vw");
//
// $(".scroll-to-top").on("click", function(){
//   console.log($(dom.window).scrollTop());
//   $(dom.window).scrollTop(0);
// })

let t = 0;
$("#scroll-to-top-btn").on("click", function(){
  if(t===0){
    $(".scroll-to-top").attr("src","images/scroll-to-top-B.png");
    t=1;
  }
  else{
    $(".scroll-to-top").attr("src","images/scroll-to-top-W.png");
    t=0;
  }
})



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started successfully");
});
