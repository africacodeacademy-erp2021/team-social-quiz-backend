const { ObjectId } = require('mongodb');
const Category = require('../models/Category');



/**
 * createCategory
 * creates a Category object 
 * 
 * @param {String} title 
 * 
 * @returns Resolved promise with category object
 */
 exports.createCategory = async (text) =>{
  try{
    let newCategory = await new Category({
                                  text:text,
                                }).save()

    return Promise.resolve(newCategory)

  }catch(error){
    return Promise.reject(error)
  }
  
}


/**
 * getCategoryById
 * 
 * @param {String} categoryId 
 * @returns catrgory object with given category id
 */
exports.getCategoryById = async (categoryId) =>{
    let category = await Category.findOne({
      _id:new ObjectId(categoryId),
    }).exec()

    if(category !== null)
      return Promise.resolve(category)
    else
      return Promise.reject()
}

/**
 * getAllCategories
 * 
 * @returns list of catrgory objects
 */
 exports.getAllCategories = async () =>{
  let categories = await Category.find({}).exec()

  if(categories)
    return Promise.resolve(categories)
  else
    return Promise.reject()
}

/**
 * doesCategoryExist
 * 
 * checks if there are any categories with the given categoryText
 * returns true of it exists and false otherwise
 * 
 * @param {String} categoryText 
 * @returns {Boolean}
 */
 exports.doesCategoryExist = async (categoryText) =>{
  const category = await Category.findOne({
    text: {$regex:categoryText, $options:"i"},
  }).exec();

  return Promise.resolve(category != null)
}


