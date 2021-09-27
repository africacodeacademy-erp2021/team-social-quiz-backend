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
      let player = await Quiz.findOne(req.body.email);
  
      if (player.game_history.length > 0) {
        return res.send(player.game_history);
      } else {
        return res.status(204);
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };