const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const first = req.body.fname;
  const last = req.body.lname;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first,
          LNAME: last,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/f45fffe13b";
  const options = {
    method: "POST",
    auth: "Anshu:a79c74a5b4b14e6ee3d25b75523e87a2-us10",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }
    else{
        res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/")
})



app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// API
//

// LIST ID
// f45fffe13b
