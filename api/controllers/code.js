var unirest = require("unirest");
require('dotenv').config()


exports.submit = async (req,res)=>{
  const {code,input,language} = req.body

var request = unirest("POST", "https://judge0-ce.p.rapidapi.com/submissions");

request.query({
	"base64_encoded": "false",
	"fields": "*"
});

request.headers({
	"content-type": "application/json",
	"x-rapidapi-key": process.env.RAPID_API_KEY,
	"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
	"useQueryString": true
});

//52 for c++

request.type("json");
request.send({
	"language_id": language,
	"source_code": code,
	"stdin": input
});

request.end(function  (result) {
  if (result.error) {
    return res.status(400).json({
      error:result.error.toString()
    })
  }
    else{
	console.log(result.body);

  const { token } = result.body 
// token = "8eee53f3-db6b-4d0b-904a-eeade7f0a2fd"
  
  var requestTwo = unirest("GET", `https://judge0-ce.p.rapidapi.com/submissions/${token}`);

requestTwo.query({
	"base64_encoded": "false",
	"fields": "*"
});

requestTwo.headers({
	"x-rapidapi-key": process.env.RAPID_API_KEY,
	"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
	"useQueryString": true
});


requestTwo.end(function (resultTwo) {
	if (resultTwo.error) {
    return res.status(400).json({
      error:resultTwo.error.toString()
    })
  }
  else{
	console.log(resultTwo.body);
  var {stdout,compile_output,status,time,memory,stderr,cpu_time_limit,cpu_extra_time,wall_time_limit} = resultTwo.body
  return res.status(200).json({
    stdout,
    time,
    memory,
    stderr,
    cpu_time_limit,
    cpu_extra_time,
    wall_time_limit,
    compile_output,
    status,
  })
}
});
}
}
)}


exports.getToken = async (req,res)=>{
  const {code,input,language} = req.body

var request = unirest("POST", "https://judge0-ce.p.rapidapi.com/submissions");

request.query({
	"base64_encoded": "false",
	"fields": "*"
});

request.headers({
	"content-type": "application/json",
	"x-rapidapi-key": process.env.RAPID_API_KEY,
	"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
	"useQueryString": true
});

//52 for c++

request.type("json");
request.send({
	"language_id": language,
	"source_code": code,
	"stdin": input
});

request.end(function  (result) {
  if (result.error) {
    return res.status(400).json({
      error:result.error.toString()
    })
  }
    else{
	console.log(result.body);
  return res.status(200).json({
    token:result.body.token
  })
    }
  })

}



exports.getOuput = async (req,res)=>{
const {token} = req.body
var request = unirest("GET", `https://judge0-ce.p.rapidapi.com/submissions/${token}`);

request.query({
	"base64_encoded": "false",
	"fields": "*"
});

request.headers({
	"x-rapidapi-key": process.env.RAPID_API_KEY,
	"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
	"useQueryString": true
});


request.end(function (result) {
	if (result.error) {
    return res.status(400).json({
      error:result.error.toString()
    })
  }
  else{
	console.log(result.body);
  var {stdout,compile_output,status,time,memory,stderr,cpu_time_limit,cpu_extra_time,wall_time_limit} = result.body
  return res.status(200).json({
    stdout,
    time,
    memory,
    stderr,
    cpu_time_limit,
    cpu_extra_time,
    wall_time_limit,
    compile_output,
    status,
  })
}
});
}
