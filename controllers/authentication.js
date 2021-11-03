// Module imports

const authUtils = require("../utils/authUtils");

//Functions

exports.register = async (req, res) =>{
    try{
        const {
          accessToken,
          refreshToken,
          email,
          channel,
          username
        } = req.body


        let registeredUser = await authUtils.registerUser(accessToken, refreshToken, email, channel, username)
        res.send(registeredUser)
        

    }catch(error){
        // console.log(error)
        return res.status(500).json(error)
    }
    
}

exports.adminAccount = async (req, res) =>{
    try{
        const {
          email,
          channel,
          username,
          password,
          confirmPassword
        } = req.body
        let registeredUser = await authUtils.registerAdmin(password, confirmPassword, email, channel, username)
        res.send(registeredUser)
        
    }catch(error){
        // console.log(error)
        return res.status(500).json(error)
    }
    
}