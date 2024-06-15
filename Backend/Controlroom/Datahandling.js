const UserDataModel = require('../Model/UserDataModel');

const History_content =async (req,res) =>{
    const { username,email,data,heading,date,time,check} = req.body;
    
    try {
        
        const exists = await UserDataModel.find({ email });
        const unique = exists.find((val)=>(val.heads==heading && val.date == date));
        
        if (unique && check) {
            const update = await UserDataModel.findByIdAndUpdate(unique.id,{history:data,date:date,time:time},{new:true});
            return res.json({ success: true, message: "Data as been updated successfully ..!"});
        }
        else{
        const newUser = new UserDataModel({
            username: username,
            email: email,
            history: data,
            heads:heading,
            date:date,
            time:time,
        });

        const user = await newUser.save();

       
        return res.json({ success: true,message: "Data Added Successfully .."});
    }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `${error.message}` });
    }
}

const Remove_Content =async (req,res) =>{
    const {id} = req.body;
    
    try {
        await UserDataModel.findByIdAndDelete(id);
        return res.json({ success: true,message: "Data Deleted Successfully .."});
    }
     catch (error) {
        console.log(error);
        res.json({ success: false, message: `${error.message}` });
    }
}

const get_data = async(req,res) =>{
    const {email} = req.body;
    try {
        const data = await UserDataModel.find({email});
        res.json({success:true,historycnt:data});
    } catch (err) {
        res.status(500).json({success:false, message:err.message });
    }

}

module.exports = {History_content,get_data,Remove_Content};