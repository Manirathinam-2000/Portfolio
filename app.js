const express = require("express");

const app = express();

app.set("view engine", ".ejs");

app.use(express.static("public"));

let pageStyle = "style1-light.css";
let btnTheme = "dark";
let lndImg = "MR_landing_img_lt.png"
let c = 0;

app.get("/", function(req,res){
  res.render("home", {
    stylesheetName : pageStyle,
    btnTheme : btnTheme,
    landingImg: lndImg
  });
});

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
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started successfully");
});
