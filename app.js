const express = require("express");

const app = express();

app.set("view engine", ".ejs");

app.use(express.static("public"));

let pageStyle = "style1-light.css";
let btnTheme = "dark";
let c = 0;

app.get("/", function(req,res){
  res.render("home", {
    stylesheetName : pageStyle,
    btnTheme : btnTheme
  });
});

app.post("/", function(req,res){
  if(c===0){
    pageStyle = "style1-dark.css";
    btnTheme = "light";
    c=1;
  }
  else{
    pageStyle = "style1-light.css";
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
