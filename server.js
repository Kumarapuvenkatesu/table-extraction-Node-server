const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const loginDetails = require("./models/loginDetails");
const createDetails = require("./models/contactDetails");
const images = require("./models/images");
const appURL = "http://localhost:3000";
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const multer = require("multer");
const secretKey = "venky";
const mobileDetails=require("./models/mobileOtp")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: [appURL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}))


mongoose.connect("mongodb+srv://straive:portfolio@cluster0.mefdgvf.mongodb.net/node-sample",
  {
    useNewUrlParser: true,
  }
).then(() => {
  app.listen(port, () => {
    console.log("Server is Running at : " + port)
  })

  console.log("Connected mongoDB");
}).catch((error) => {
  console.log(error);
});

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://straive:portfolio@cluster0.mefdgvf.mongodb.net/node-sample", { useNewUrlParser: true, useUnifiedTopology: true })
//     console.log("Database Connected Successfull")
//     app.listen(port, () => {
//            console.log("Server is Running at : " + port)
//          })
//   } catch (error) {
//     console.log("Error: " + error)
//   }
// }

// connectDB()

//  async function defaultuser(){
//   try {
//     const data= new loginDetails({
//       name:"admin",
//       email:"admt@gmail.com",
//       password:"123456",
//       user:"active",
//       role:"superUser"
//     })
//     const a=data.save()
//     console.log("user data")
    
//   } catch (error) {
//     console.log("error user",error)
//   }
//  }

// defaultuser()




app.get("/hello", (req, res) => {
  res.send("hello");
});


function generateVerificationToken() {
 // const newToken = Math.random().toString(36).substring(2, 6);
 const newToken=Math.floor(1000 + Math.random() * 9000);
  console.log("131231232", newToken)
  return newToken;
}



// sms code for node mailer

// const transpoter=nodemailer.createTransport({
//   server:"gmail",
//   auth:{
//     user:"kumarapuvenkatesu@gmail.com",
//     pass:"chfbgaqmmijzziva"
//   }
// })


//login code 

app.post("/login", (req, res) => {
  const { email, password} = req.body
  loginDetails.findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        // bcrypt.compare(password,user.password,(err,response)=>{
        //   if(response){
        //   const verificationToken = generateVerificationToken();
        //   const token1 = jwt.sign({ email: email, password: password }, secretKey, { expiresIn: 86400 });
        //   res.cookie("token1", token1)
        //   res.json({ status: "success", email: user.email, name: user.name, token1: token1, verificationToken: verificationToken })
        //   console.log("login details : " + user.email)
        // } else {
        //   res.json("password Wrong")
        // }
        // })
       const verificationToken = generateVerificationToken();
     
        const token1 = jwt.sign({ email: email, password: password }, secretKey, { expiresIn: 86400 });
        res.cookie("token1", token1)
        res.json({ status: "success",role:user.role, email: user.email, name: user.name, token1: token1 })
        console.log("login details : " + user.email)
      } else {
        res.json("No Data found")
      }
    })
    .catch((err) => {
      console.log("error" + err)
    })
})


// app.post("/verify-otp",(req,res)=>{
// const {otp}=req.body
// // console.log("otp",typeof(otp))

// //console.log("11",typeof(generateVerificationToken()))
// // console.log(user.verificationToken)
// if(otp===generateVerificationToken().toString()){
//   console.log("true");
//   res.json({ status: true });
// }else{
//   res.json({status:false});
//   console.log("false");
// }

// })

// app.post("/verify-otp", (req, res) => {
//   const { otp } = req.body;

//   const { email } = req.body; 
//   console.log("email",email)// Extract email from request body

//   loginDetails.findOne({ email: email }) // Replace with your query based on user identifier
//     .then((user) => {
//       if (!user) {
//         return res.json({ status: false, error: "Invalid user" });
//       }

//       const storedToken = user.verificationToken; // Retrieve stored token from user model

//       if (otp === storedToken) {
//         console.log("OTP verified successfully");
//         res.json({ status: true });

//         // Clear stored token after successful verification (optional)
//         user.verificationToken = "";
//         user.save();

//       } else {
//         console.log("Invalid OTP");
//         res.json({ status: false, error: "Invalid OTP" });
//       }
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       res.status(500).json({ status: false, error: "Internal server error" });
//     });
// });



app.post('/signup', (req, res) => {
  const { email, name, password } = req.body;

  loginDetails.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        res.json('User already exists');
        console.log("User already exists")
      } else {
        // bcrypt.hash(password,10)
        // .then((hash)=>{
        //   const newUser = new loginDetails({ email, name, password:hash })
        // newUser.save()
        // .then(()=>{
        //   res.json({status:"success"})
        // })
        // .catch((error)=>{
        //   console.log(error);
        // })
        // })
        // .catch((error)=>{
        //   console.log(error)
        // })
        const newUser = new loginDetails({ email, name, password });
        newUser.save()

          .then(() => {
            // const options={
            //   from:"kumarapuvenkatesu@gmail.com",
            //   to:newUser.email,
            //   subject: 'Sending Email using Node.js',
            //   text: 'That was easy!'
            // }
            // transpoter.sendMail(options,(err,info)=>{
            //   if(err){
            //     console.log("error at sending time : "+err.message)
            //   }
            //   else{
            //     console.log("sennding success : "+info.response)
            //   }
            // })
            res.json({ status: 'User created successfully ', name: newUser.name });
          })
          .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).json('Error creating user');
          });
      }
    })
    .catch((error) => {
      console.error('Error checking for existing user:', error);
      res.status(500).json('Error checking user availability');
    });
});

app.post("/forgot",async(req,res)=>{
  const {email}=req.body

  try {
    const user = await loginDetails.findOne({ email:email }); 
    if (user) { 
      //  const options={
      //         from:"kumarapuvenkatesu@gmail.com",
      //         to:user.email,
      //         subject: 'Password reminder',
      //         text:`password:${user.password}`
      //       }
      //       transpoter.sendMail(options,(err,info)=>{
      //         if(err){
      //           console.log("error at sending time : "+err.message)
      //         }
      //         else{
      //           console.log("sennding success : "+info.response)
      //         }
      //       })  
      console.log("username",user)
       res.json({ success: true});
    } else {
      res.json( 'Email not found' );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
})

app.put("/updatePassword", async (req, res) => {
  const { email, newPassword } = req.body;
  try { 
    await loginDetails.findOneAndUpdate({ email }, { password: newPassword });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



// app.get("/usersdetails",(req,res)=>{
//    const{email,name,}=req.body
//   loginDetails.find({})
//   .then((user)=>{
//     res.json(user);
//     // console.log("1111",user)
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// })
app.get("/usersdetails", async (req, res) => {
  const { email, name, } = req.body
  try {
    const userDetailsAt = await loginDetails.aggregate([
      {
        $sort: {
          name: 1
        }
      },
      // {
      //   $count:"totalProjects"
      // },
      // {
      //   $match:{
      //  name:"devendra"
      //   }
      // },
      {
        $project: {
          __v: 0
        }
      }

    ])
    res.json(userDetailsAt)
  } catch (error) {
    console.log(error)
  }

})


app.delete("/delete/:id", (req, res) => {
  const { id } = req.params
  loginDetails.findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.log("error deleting time : " + error)
    })
})

app.get("/userdetails/:id", (req, res) => {
  const { id } = req.params
  loginDetails.findById({ _id: id })
    .then((oneuser) => {
      res.json(oneuser);
    })
    .catch((error) => {
      console.log("user details error at : " + error)
    })
})


app.put("/updateData/:id",(req,res)=>{
  const{id}=req.params
  const{email,name,status}=req.body
  loginDetails.findByIdAndUpdate({_id:id},{email,name, status})
  .then((user)=>{
res.json({user})
console.log("updated")
  }).catch((error)=>{
    console.log(error)
  })
})

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("111", req.body)
  createDetails.findOne({ email: email })
    .then((newUser) => {
      if (newUser) {
        res.json("This email already taken");
      } else {
        const newContactDetails = new createDetails({ name, email, message })
        newContactDetails.save()
          .then(() => {
            res.json({ content: "new Details added", message: message })
          })
          .catch((error) => {
            console.log("contact details error at :", error);
            res.status(500).json('Error creating user');
          })
      }
    })
    .catch((error) => {
      console.log("contact details error at :", error);
      res.status(500).json('Error creating user');
    })
})

app.get("/contactDetails", (req, res) => {

  createDetails.find({})
    .then((data) => {
      res.json(data);
      console.log("contactss", data);
    }).catch((error) => {
      console.log("error details :", error)
    })
})
app.put("/userdetailsupdate/:id", (req, res) => {
  const { id } = req.body
  loginDetails.findByIdAndUpdate({ _id: id }, { name: req.body.name })
    .then((data) => {
      res.json(data)
    }).catch((error) => {
      console.log(error)
    })
})

app.delete("/remove-data/:id", (req, res) => {
  const { id } = req.params
  createDetails.findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.log("error at deleting : ", error)
    })
})


// file uploading backend code//

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })


var fs = require('fs');



app.post('/upload', uploadStorage.single('image'), async (req, res) => {
   //console.log(req.body);
   console.log(req.file)
  const imagesname = req.file.filename;
  const pathDir=req.file.path;
 

 // return res.send("file uploaded");
  try {
    await images.create({ image: imagesname });
    fs.readFile(pathDir,(err,data)=>{
      if(err){
        console.log("error at",err);
      }
      console.log("path Directoion",data.toString());
      
      res.json({data:data.toString()})
    })
  
   // res.json({ status: "ok" })
  } catch (error) {
    console.log("upload image error ", error);
    res.json({ status: error })
  }
});










app.get("/get-image", async (req, res) => {
  try {
    images.find({})
      .then((data) => {
        res.send({ status: "ok",image_details: data })
      })
  } catch (err) {
    console.log("get image", err);
    res.json({ status: err })

  }
})

app.delete("/deletefile/:id", (req, res) => {
  const { id } = req.params
  images.findByIdAndDelete({ _id: id })
    .then((deleteData) => {
      res.json(deleteData)
      console.log("deleted Data", deleteData)
    }).catch((error) => {
      console.log("deleted data : ", error)
    })
})



  //  mobile authentication //
  require("dotenv").config();
const twilio=require("twilio");
// const dotenv=require("dotenv")

// Twilio configuration 

const accountSid="ACb73d25e72c91449a3ee4472e664fdc58";
const authToken="dbde687a1d82ccfcc70dc3c3362792eb";
const client=new twilio(accountSid,authToken);
const twilioNumber="+16623732822";

function generateOTP(){
  return Math.floor(1000+Math.random()*9000).toString();
}

app.post("/send-otp",(req,res,next)=>{
  const{mobile}=req.body
  //console.log("mobile",mobile)
 
  const otp=generateOTP();
  client.messages.create({
    body: `Your OTP is  ${otp} `,
    from: twilioNumber,
    to: "+91"+mobile,
  },function(error,data){
    if(error){
      console.log(error,"error")
    }
  })
  .then(()=>{
    res.json({successs:true})
    console.log("success",otp)
  }).catch((err)=>{
    console.log(err)
  })
})
 


