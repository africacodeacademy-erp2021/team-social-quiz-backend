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