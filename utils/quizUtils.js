/**
 * getPlatformUsers
 * 
 * returns all platform users
 * @returns Resolved promise with Platform users
 */
exports.getPlatformQuiz = async () =>{
  try{
    let users = await User.find({}).exec()
    return Promise.resolve(quiz)
  }catch(error){
    return Promise.reject(error)
  }
  
}