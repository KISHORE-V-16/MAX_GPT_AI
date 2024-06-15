const axios = require('axios').default;
const nodemailer = require('nodemailer');
require('dotenv').config();

const Text_Generator = async (req,res) =>{

    const data = req.body.extract_data;

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization: `Bearer ${process.env.API_KEY}`,
      },
      data: {
        providers: ["cohere"],
        text: `${data}`,
        temperature: 0.2,
        max_tokens: 250,
        fallback_providers: [],
      },
    };
    axios.request(options)
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });

}

const AI_Content_Detector =async (req,res) =>{

  const data = req.body.extract_data; 

const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/text/ai_detection",
  headers: {
    authorization: `Bearer ${process.env.API_KEY}`,
  },
  data: {
    providers: ["sapling"],
    text: `${data}`,
    fallback_providers: [],
  },
};

await axios.request(options)
    .then((response) => {
      console.log(response.data);
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      return res.status(404).json(error);
    });

}


const Image_Generator =async (req,res) =>{

    const data = req.body.extract_data;

  
const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/image/generation",
  headers: {
    authorization:  `Bearer ${process.env.API_KEY}`,
  },
  data: {
    providers: ["replicate"],
    text: `${data}`,
    resolution: "512x512",
    fallback_providers: [],
  },
};

    await axios
    .request(options)
    .then((response) => {
        return res.status(200).json(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  const Code_Generator = async (req,res)=>{

    const data = req.body.extract_data;

const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/text/code_generation",
  headers: {
    authorization: `Bearer ${process.env.API_KEY}`,
  },
  data: {
    providers: ["google"],
    prompt: "",
    instruction: `${data}`,
    temperature: 0.1,
    max_tokens: 500,
    fallback_providers: [],
  },
};

await axios
.request(options)
.then((response) => {
  console.log(response.data);
    return res.status(200).json(response.data);
})
.catch((error) => {
    console.error(error);
});
  }
  
const Image_detector =async (req,res) =>
{

  const data = req.body.extract_data;
  
const options = {

  method: "POST",
  url: "https://api.edenai.run/v2/ocr/ocr",
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
  data: {
    providers: ["microsoft","google"],
    language: "en",
    file_url:  `${data}`,
    fallback_providers: [],
  },

};


await axios
.request(options)
.then((response) => {
  console.log(response);
    return res.status(200).json(response);
})
.catch((error) => {
    return res.status(404).json(error);
});

}

const Video_generator =async (req,res) =>{

   const data = req.body.extract_data;

  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/audio/text_to_speech",
    headers: {
      authorization: `Bearer ${process.env.API_KEY}`,
    },
    data: {
      providers: ["amazon","google","ibm","microsoft"],
      language: "fr",
      text:  `${data}`,
      option: "MALE",
      fallback_providers: [],
    },
  };
  
  await axios
  .request(options)
  .then((response) => {
      return res.status(200).json(response.data);
  })
  .catch((error) => {
      return res.status(404).json(error);
  });
  
}

//MAIL OTP SENDER
let checkemailotp = 0;
const Emailpassword = "xdwf gsif zeoe lrpf";
const  SendEmailcode = async(req,res) =>{

    const {Emailid} = req.body;
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
  
  const EmailOtp = Math.floor(Math.random()*1000000);
   checkemailotp = EmailOtp;

  const htmlcontent = `
  <html>
  <body>
  <img src="cid:myImg" style="width:40px;height:40px;border-radius:30px;"/>
  <h2>Do Not share to Any One ${EmailOtp}</h2>
  </body>
  </html>
  `
  const mailoption = {
    from:'kishore8a03@gmail.com',
    to:`${Emailid}`,
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

const validateEmailcode =async (req,res) =>{

    const {emailcode} = req.body;

    if(emailcode == checkemailotp){
        return res.status(200).json('success');
    }
    else{
        return res.status(401).json('invalidcode');
    }

}

module.exports = {Text_Generator,Image_Generator,AI_Content_Detector,Code_Generator,Image_detector,Video_generator,SendEmailcode,validateEmailcode};