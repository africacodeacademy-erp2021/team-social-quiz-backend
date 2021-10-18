const { ObjectId } = require('mongodb');
const Game = require('../models/Game');
const { GameType } = require('./constants');
const quizUtils = require('./quizUtils');

/**
 * initializeSinglePlayerGame
 * 
 * created a single player game
 * @param {string} quizId
 * @param {string} initPlayer
 * 
 * @returns Resolved promise with Game object
 */
exports.initializeSinglePlayerGame = async (quizId, initPlayer) =>{
  try{    
    let qs = {
      quiz: new ObjectId(quizId),
      host: new ObjectId(initPlayer),
      players:[new ObjectId(initPlayer)],
      gameType:GameType.SINGLE,
    }

    let newGame = await new Game(qs).save()

    newGame = await newGame
    .populate({
      path:"players",
      model:"User",
      select:"profile"
    })
    .populate({
      path:"host",
      model:"User",
      select:"profile"
    }).populate({
      path:"quiz",
      model:"Quiz",
      select:"title description category totalScore",
      populate:{path:"category", model:"Category", select:"text"}
    }).populate({
      path:"currentQuestion",
      model:"Question",
      select:"answers text points",
      populate:{
        path:"answers", 
        model:"Answers",
        select:"isCorrect text"
      }
    }).execPopulate()

    return Promise.resolve(newGame)
  }catch(error){
    return Promise.reject(error)
  }
  
}

/**
 * initializeTeamGame
 * 
 * created a team player game
 * 
 * @param {string} quizId
 * @param {string} initPlayer
 * @param {string} teamNames
 * 
 * @returns Resolved promise with Game object
 */
 exports.initializeTeamGame = async (quizId, initPlayer, teamNames) =>{
  try{    
    let qs = {
      quiz: new ObjectId(quizId),
      host: new ObjectId(initPlayer),
      gameType:GameType.SINGLE,
      teams: teamNames.map(name => {return {team:name, players:[]}})
    }

    let newGame = await new Game(qs).save()

    newGame = await newGame
    .populate({
      path:"players",
      model:"User",
      select:"profile"
    })
    .populate({
      path:"host",
      model:"User",
      select:"profile"
    }).populate({
      path:"quiz",
      model:"Quiz",
      select:"title description category totalScore",
      populate:{path:"category", model:"Category", select:"text"}
    }).populate({
      path:"currentQuestion",
      model:"Question",
      select:"answers text points",
      populate:{
        path:"answers", 
        model:"Answers",
        select:"isCorrect text"
      }
    }).execPopulate()

    return Promise.resolve(newGame)
  }catch(error){
    return Promise.reject(error)
  }
  
}


/**
 * initializeMultiplayerGame
 * 
 * created a multiplayer  game
 * @param {string} quizId
 * @param {string} initPlayer
 * 
 * @returns Resolved promise with Game object
 */
 exports.initializeMultiplayerGame = async (quizId, initPlayer) =>{
  try{
     
    let qs = {
      quiz: new ObjectId(quizId),
      host: new ObjectId(initPlayer),
      gameType:GameType.SINGLE,
      teams: teamNames.map(name => {return {team:name, players:[]}})
    }

    let newGame = await new Game(qs).save()

    newGame = await newGame
    .populate({
      path:"players",
      model:"User",
      select:"profile"
    })
    .populate({
      path:"host",
      model:"User",
      select:"profile"
    }).populate({
      path:"quiz",
      model:"Quiz",
      select:"title description category totalScore",
      populate:{path:"category", model:"Category", select:"text"}
    }).populate({
      path:"currentQuestion",
      model:"Question",
      select:"answers text points",
      populate:{
        path:"answers", 
        model:"Answers",
        select:"isCorrect text"
      }
    }).execPopulate()

    return Promise.resolve(newGame)
  }catch(error){
    return Promise.reject(error)
  }
  
}

exports.selectNextQuestion = (questions) =>{
  let upperLimit = questions.length
  let questionIndex = Math.floor(Math.random() * upperLimit)
  let targetQuestion = questions[questionIndex]
  let remainingQuestions = questions.filter(question => question != targetQuestion)

  return {next:remainingQuestions, current:targetQuestion}

}


/**
 * startGame
 * 
 * @param {string} gameId
 * @returns Resolved promise with Game object
 */
 exports.startGame = async (gameId) =>{
  try{
    let game = await Game.findOne({_id:new ObjectId(gameId)})
                          .populate({path:"quiz", model:"Quiz"}).exec()
    
    if(game == null)
      return Promise.reject("game not found")

    let questionsStateObj = this.selectNextQuestion(game.quiz.questions)

    // console.log("questions >> ", questionsStateObj);

    game['currentQuestion'] = new ObjectId(questionsStateObj.current)
    game['remainigQuestions'] = questionsStateObj.next
    game['startTime'] = new Date()

    game = await game.save()

    game = await game
    .populate({
      path:"players",
      model:"User",
      select:"profile"
    })
    .populate({
      path:"host",
      model:"User",
      select:"profile"
    }).populate({
      path:"quiz",
      model:"Quiz",
      select:"title description category totalScore",
      populate:{path:"category", model:"Category", select:"text"}
    }).populate({
      path:"currentQuestion",
      model:"Question",
      select:"answers text points",
      populate:{
        path:"answers", 
        model:"Answers",
        select:"isCorrect text"
      }
    }).execPopulate()

    quizUtils.updateQuizPopularity(game.quiz._id)

    return Promise.resolve(game)
  }catch(error){
    return Promise.reject(error)
  }
  
}


/**
 * checks is user is game host
 * 
 * @param {string} gameId 
 * @param {string} userId 
 * @returns 
 */
exports.isGameHost = async (gameId, userId) =>{
  let game = await Game.findOne({_id:new ObjectId(gameId)}).select("host").exec()
  return userId == game.host
}




