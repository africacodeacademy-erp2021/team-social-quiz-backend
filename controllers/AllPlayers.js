const { getPlatformUsers } = require("../utils/userUtils")

exports.getAllPlayers = async (req, res) =>{
    try{

        let playersList = await getPlatformUsers()
        
        if(playersList.length > 0 ){
             return res.send(playersList)
        }else{
            return res.status(204).send(playersList)
        }
        

    }catch(error){
        return res.sendStatus(500)
    }
    
}