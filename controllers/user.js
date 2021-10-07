// Module imports

const User = require('../models/User');

const { getPlatformUsers } = require("../utils/userUtils")

exports.getAllUsers = async (req, res) =>{
    try{

        let usersList = await getPlatformUsers()
        
        if(usersList.length > 0 ){
             return res.send(usersList)
        }else{
            return res.status(204).send(usersList)
        }
        

    }catch(error){
        return res.sendStatus(500)
    }
    
}
exports.getAllGames = async (req, res) => {
    try {
      let playerHistory = await User.find({_id: req.body._id},
      { game_history: 1 }
    ).exec();;
  
      if (playerHistory === 0) {
        return res.send("User doesn't exist");
      } else {
       return res.send(playerHistory); 
      }
    } catch (error) {
      console.log(error)
      return res.sendStatus(500);
    }
  };