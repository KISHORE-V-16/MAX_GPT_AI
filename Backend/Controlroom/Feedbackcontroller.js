const axios = require('axios').default;
const nodemailer = require('nodemailer');
require('dotenv').config();

const FeedBack = (req,res) =>{
    const {desc,name,rating} = req.body;
    const transporter = nodemailer.createTransport({
      service:'gmail',
      host: "smtp.gmail.net",
      port: 465,
      secure: true,
      auth: {
        user: "kishore8a03@gmail.com",
        pass:process.env.EMAILPASS,
      },
    });
  
    const htmlcontent = `
    <html>
    <body>
  
    <div style="display:flex;gap:2rem;">
    <img src="cid:myImg" style="width:70px;height:50px;border-radius:30px;"/>
    <h2 style="padding-left:30px;padding-bottom:40px">Max Gpt Ai</h2>
    </div>
  <div>
  FeedBack of user :: " ${name} " About Website UI...
  </div>
  
  <h3>Description ::</h3>
  <div>${desc}</div>
  
  <h3>Rating ::</h3>
  <div>${rating}</div>
  
  </div>
    </body>
    </html>
    `
    const mailoption = {
      from:'kishore8a03@gmail.com',
      to:`kishore16a03@gmail.com`,
      subject:'OTP SENDER',
      html:htmlcontent,
      attachments: [{
        filename: 'logo.jpg',
        path: "/media/kishore/MYFILES/temporay/my-project/Backend/assets/logo.jpg",
        cid: 'myImg'
      }]
    }
    
    transporter.sendMail(mailoption,function(err,data){
    
      if(!err){
          return res.status(200).json('success');
      }
      else{
          res.status(401).json('invalidcode');
      }
    });
  
  }

  module.exports = {FeedBack};