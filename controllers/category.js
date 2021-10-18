// Module imports

const categoryUtils = require("../utils/categoryUtils");

exports.createCategory = async (req, res) =>{
    try{

        const {
          text
        } = req.body

        if(!await categoryUtils.doesCategoryExist(text)){

          let category = await categoryUtils.createCategory(text)
          return res.send(category)

        }else{
          return res.status(400).send("category already exists")
        }
        
    }catch(error){
        return res.status(500).send(error)
    }
    
}

exports.getCategory = async (req, res) => {
    try {
      const {
        categoryId
      } = req.query

      let category = await categoryUtils.getCategoryById(categoryId)
      
      return res.send(category);
      
    } catch (error) {
      // console.log(error)
      return res.status(500).send(error);
    }
};


exports.getCategories = async (req, res) => {
  try {

    let categories = await categoryUtils.getAllCategories()
    
    return res.send(categories);
    
  } catch (error) {
    // console.log(error)
    return res.status(500).send(error);
  }
};

