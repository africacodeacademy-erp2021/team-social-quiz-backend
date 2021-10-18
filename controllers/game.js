const bodyParser = require("body-parser");

// Module imports

const gameUtils = require("../utils/gameUtils");

//functions

exports.initializeSinglePlayerGame = async (req, res) => {
  try {

    var  {
      quizId,
      userId
    } = req.body;
   
    // let userId = req.user

    let game = await gameUtils.initializeSinglePlayerGame(quizId, userId)
    return res.send(game)
      
  } catch (error) {
    // console.log(error);
    return res.status(500).send(error);
  }
};

exports.initializeTeamGame = async (req, res) => {
  try {

    var  {
      quizId,
      teamNames,
      userId
    } = req.body;
   
    // let userId = req.user

    let game = await gameUtils.initializeTeamGame(quizId, userId, teamNames)
    return res.send(game)
      
  } catch (error) {
    // console.log(error);
    return res.status(500).send(error);
  }
};

exports.initializeMultiplayerGame = async (req, res) => {
  try {

    var  {
      quizId,
      userId
    } = req.body;
   
    // let userId = req.user

    let game = await gameUtils.initializeMultiplayerGame(quizId, userId)
    return res.send(game)
      
  } catch (error) {
    // console.log(error);
    return res.status(500).send(error);
  }
};

exports.startSinglePlayerGame = async (req, res) => {
  try {

    var  {
      gameId,
      userId
    } = req.body;
   
    // let userId = req.user

    let game = await gameUtils.startGame(gameId)
    return res.send(game)
      
  } catch (error) {
    // console.log(error);
    return res.status(500).send(error);
  }
};

// INCOMPLETE FUNCTIONS

exports.getNextQuestion = async (req, res) =>{
  try{
    const {
      gameId
    } = req.body

  }catch(error){
    // console.log(error);
    return res.status(500).send(error);
  }
}

exports.submitQuestionAnswer = async (req, res) =>{
  try{

    const {
      gameId,
      answer,
      question
    } = req.body



  }catch(error){
    // console.log(error);
    return res.status(500).send(error);
  }
}

exports.endGame = async (req, res) =>{
  try{

    const {
      gameId,
    } = req.body



  }catch(error){
    // console.log(error);
    return res.status(500).send(error);
  }
}

exports.restartGame = async (req, res) =>{
  try{

    const {
      gameId,
    } = req.body

    let game = await gameUtils.startGame(gameId);
    return res.send(game);

  }catch(error){
    // console.log(error);
    return res.status(500).send(error);
  }
}



