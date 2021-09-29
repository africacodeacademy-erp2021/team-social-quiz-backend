const express = require('express')
const router = express.Router()
const { Role } = require("../utils/Constants");
const {getAllUsers} = require("../utils/Constants");

exports.getAllUsers = async()=>{

    try{
        router.get('/User', async (req, res) => {
            try {
                const userList = await User.find()
                return res.status(200).json(userList)
            } catch (error) {
                return res.status(500).json({"error":error})
            }
        })
    }catch(error){
        return res.sendStatus(500)
    }
}


exports.ChangeUserRole = async()=>{

    
        router.get('/User', async (req, res) => {
            try {
               if(Role.PLAYER === player) {
                const role = users.findByIdAndUpdate(_id, { $set: { role: Role.ADMIN } })
                .exec();
                 return res.status(200).json(role);
               }
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({"error":error})
            }
        })
    }





