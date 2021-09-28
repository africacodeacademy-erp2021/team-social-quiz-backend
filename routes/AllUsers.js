const express = require('express')
const router = express.Router()

exports.getAllUsers = async()=>{

    try{
        router.get('/users', async (req, res) => {
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


