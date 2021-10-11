exports.getAllGames = async (req, res) => {
    try {
      let playerHistory = await User.find({email:req.body.email},
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