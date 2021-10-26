// Module imports

const User = require('../models/User');
const { Role } = require('../utils/constants');

const userUtils = require("../utils/userUtils");


//functions

exports.getAllUsers = async (req, res) =>{
    try{

        let usersList = await userUtils.getPlatformUsers()
        
        if(usersList.length > 0 ){
             return res.send(usersList)
        }else{
            return res.status(204).send(usersList)
        }
        

    }catch(error){
        return res.sendStatus(500)
    }
    
}

exports.getPlayers = async (req, res) =>{
  try{

      let usersList = await userUtils.getPlayers()
      
      if(usersList.length > 0 ){
           return res.send(usersList)
      }else{
          return res.status(204).send(usersList)
      }
      

  }catch(error){
      return res.sendStatus(500)
  }
  
}

exports.getAdmins = async (req, res) =>{
  try{

      let usersList = await userUtils.getAdmins()
      
      if(usersList.length > 0 ){
           return res.send(usersList)
      }else{
          return res.status(204).send(usersList)
      }
      

  }catch(error){
      return res.sendStatus(500)
  }
  
}

exports.getPlayer = async (req, res) =>{
  try{

    const {playerId} = req.query
      let player = await userUtils.getPlayerById(playerId)
      return res.send(player)
  
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
      // console.log(error)
      return res.sendStatus(500);
    }
  };

exports.elevateToAdmin = async (req, res) => {
  try {
    const {userId} = req.body

    let user = await userUtils.updatePlayerRole(userId, Role.ADMIN)
    return res.send(user);

  } catch (error) {
    // console.log(error)
    return res.status(500).send("failed to elevate user role");
  }
};

exports.suspendPlayer = async (req, res) => {
  try {
    const {userId} = req.body

    let user = await userUtils.suspendPlayer(userId)
    return res.send(user);

  } catch (error) {
    // console.log(error)
    return res.status(500).send("failed to elevate user role");
  }
};

exports.revivePlayer = async (req, res) => {
  try {
    const {userId} = req.body

    let user = await userUtils.revivePlayer(userId)
    return res.send(user);

  } catch (error) {
    // console.log(error)
    return res.status(500).send("failed to elevate user role");
  }
};