const User = require('../models/user')
const bcrypt = require('bcrypt');
const Instructor = require('../models/instructor');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


exports.register = async(req,res)=>{
const {name, email , password,number,type} = req.body

if (!name || !email || !password,!number,!type) {
  return res.status(400).json({
    message: "1 or more parameter(s) missing from req.body",
  });
}
if(type=='user'){
await User.find({ email })
.then(async (user) => {
  if (user.length >= 1) {
    return res.status(409).json({
      message: "Email already registered",
    });
  }

  await bcrypt
    .hash(password, 10)
    .then(async (hash) => {

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password:hash,
        number
      })

      await user.save()
        .then((user)=>{
          res.status(200).json({
            success:true,
          })
        })
          .catch((e)=>{
            res.status(400).json({
              error:e.toString()
            })
          })


    })
    .catch((e)=>{
      res.status(400).json({
        error:e.toString()
      })
    })
  })
  .catch((e)=>{
    res.status(400).json({
      error:e.toString()
    })
  })
}
else{
  
await Instructor.find({ email })
.then(async (instructor) => {
  if (instructor.length >= 1) {
    return res.status(409).json({
      message: "Email already registered",
    });
  }

  await bcrypt
    .hash(password, 10)
    .then(async (hash) => {

      const instructor = new Instructor({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password:hash,
        number
      })

      await instructor.save()
        .then((instructor)=>{
          res.status(200).json({
            success:true,
          })
        })
          .catch((e)=>{
            res.status(400).json({
              error:e.toString()
            })
          })


    })
    .catch((e)=>{
      res.status(400).json({
        error:e.toString()
      })
    })
  })
  .catch((e)=>{
    res.status(400).json({
      error:e.toString()
    })
  })
}

}

exports.login = async (req, res) => {
  const { email, password, type } = req.body;

  if (!email || !password || !type) {
    return res.status(400).json({
      message: "1 or more parameter(s) missing from req.body",
    });
  }

  if(type=='user'){

  await User.find({ email })
    .then(async (user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: " Email not found",
        });
      }

      await bcrypt
        .compare(password, user[0].password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              {
                userId: user[0]._id,
                type: user[0].type,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "30d",
              }
            );
            return res.status(200).json({
              userData: {
                _id: user[0]._id,
                name: user[0].name,
                email: user[0].email,
              },
              token,
            });
          }
          return res.status(401).json({
            message: "Invalid password",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err.toString(),
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.toString(),
      });
    });
  }
  else{
    
  await Instructor.find({ email })
  .then(async (instructor) => {
    if (instructor.length < 1) {
      return res.status(401).json({
        message: " Email not found",
      });
    }

    await bcrypt
      .compare(password, instructor[0].password)
      .then((result) => {
        if (result) {
          const token = jwt.sign(
            {
              instructorId: instructor[0]._id,
              type: 'instructor',
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "30d",
            }
          );
          return res.status(200).json({
            instructorData: {
              _id: instructor[0]._id,
              name: instructor[0].name,
              email: instructor[0].email,
            },
            token,
          });
        }
        return res.status(401).json({
          message: "Invalid password",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.toString(),
        });
      });
  })
  .catch((err) => {
    res.status(500).json({
      error: err.toString(),
    });
  });
  }
};