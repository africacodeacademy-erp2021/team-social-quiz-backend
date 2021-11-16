// Login endpoint Documentation start here

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Login
 *     description: Login
 *     parameters:
 *       - name: reqBody
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: Must be email address
 *             password:
 *               type: string
 *           required:
 *             - username
 *             - password
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *          description: An unsuccessfull response
 */
// Login endpoint Documentation end here



/**
*   @swagger
*   /api/v1/register:
*       post:
*           tags:
*               - Social Media Authentication
*           description: Post New User
*           parameters:
*               - name: reqBody
*                 description: request body
*                 in: body
*                 schema: 
*                   type: object
*                   properties:
*                       accessToken:
*                           type: string
*                       refreshToken:
*                           type: string
*                       email:
*                           type: string
*                       username:
*                           type: string
*                       channel:
*                           type: string
*                   reqiured:
*                       - accessToken:
*                       - refreshToken:
*                       - email:
*                       - username:
*                       - channel:                      
*           responses:
*               '200':
*                   description: A successfull response
*               '500':
*                   description: An unsuccessfull response
*/




/**
*   @swagger
*   /auth/signup:
*       post:
*           tags:
*               - Local Authentication
*           description: Post New User
*           parameters:
*               - name: reqBody
*                 description: request body
*                 in: body
*                 schema: 
*                   type: object
*                   properties:
*                       email:
*                           type: string
*                       username:
*                           type: string
*                       password:
*                           type: string
*                       channel:
*                           type: string
*                   reqiured:
*                       - password:
*                       - email:
*                       - username:
*                       - channel:                      
*           responses:
*               '200':
*                   description: A successfull response
*               '500':
*                   description: An unsuccessfull response
*/




/**
*   @swagger
*   /api/v1/account:
*       post:
*           tags:
*               - Admin Authentication
*           description: Post New User
*           parameters:
*               - name: reqBody
*                 description: request body
*                 in: body
*                 schema: 
*                   type: object
*                   properties:
*                       email:
*                           type: string
*                       username:
*                           type: string
*                       password:
*                           type: string
*                       confirmPassword:
*                           type: string
*                       channel:
*                           type: string
*                   reqiured:
*                       - email:
*                       - username:
*                       - password:
*                       - confirmPassword:
*                       - channel:                      
*           responses:
*               '200':
*                   description: A successfull response
*               '500':
*                   description: An unsuccessfull response
*/






// Create Category endpoint documentation start here

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     tags:
 *       - Create new category
 *     description: Post to new Category
 *     parameters:
 *       - name: reqBody
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *           required:
 *             - text
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessfull response
 */
// Create Category endpoint documentation start here

// Get All Categories endpoint documentation start here

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags:
 *       - Get all Categories
 *     description: Get all Categories
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessfull response
 */

// Get All Categories endpoint documentation end here

//Get Category by Category Id Start here

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     tags:
 *       - Get category by Category Id
 *     description: Get Category by id
 *     parameters:
 *       - name: category_id
 *         description: request query
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             category_id:
 *               type: string
 *           required:
 *             - category_id
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

//Get Category by Category Id end here

// Create Quiz documentation start here

/**
*   @swagger
*   /api/v1/quiz:
*       post:
*           tags:
*               - Create Quiz End Point
*           description: Create Quiz 
*           parameters:
*               - name: reqBody
*                 description: request body
*                 in: body
*                 schema:
*                   type: object
*                   properties:
*                       title:
*                           type: string
*                       description:
*                           type: string
*                       questions:
*                           type: array
*                           items:
*                               type: object
*                               properties:
*                                   text:
*                                       type: string
*                                       description: Question text
*                                       example: What is my name
*                                   answers:
*                                       type: array
*                                       items:
*                                           type: object
*                                           properties:
*                                               text:
*                                                   type: string
*                                                   description: Answer text
*                                                   example: TW
*                                               isCorrect:
*                                                   type: boolean
*                                                   description: state of an answer
*                                   points:
*                                       type: double
*                                       description: Question Points
*                                       example: 25
*                       category:
*                           type: string 
*                       score:
*                           type: integer
*                   required:
*                       - title
*                       - description
*                       - questions
*                       - category
*                       - score
*           
*           responses:
*               '200':
*                   description: A successful response  
*               '500':
*                   description: An unsuccessful response          
*/
// Create Quiz documentation start here

// Update Quiz Start Here
/**
* @swagger
* /api/v1/quiz:
*   put:
*     tags:
*       - Update Quiz
*     description: Update Quiz
*     parameters:
*       - name: reqBody
*         description: request body
*         in: body
*         schema:
*           type: object
*           properties:
*             quizId:
*               type: string
*             updatedInfo:
*               type: object
*               properties:
*                  title:
*                      type: string  
*                  description:
*                      type: string 
*                  category:
*                      type: string  
*                  totalScore:
*                      type: integer 
*           required:
*             - quizId
*     responses:
*       '200':
*         description: A successful response
*       '500':
*         description: An unsuccessful response
*/

// Update Quiz End Here

/**
 * @swagger
 * /api/v1/quizzes:
 *   get:
 *     tags:
 *       - Get all Quizzes
 *     description: Get all Quizzes
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/quizzes/published:
 *   get:
 *     tags:
 *       - Get all Published Quizzes by ID
 *     description: Get all Published Quizzes by ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/quiz/publish:
 *   put:
 *     tags:
 *       - Publish Quiz by ID
 *     description: Publish Quiz
 *     parameters:
 *       - name: reqBody
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             quizId:
 *               type: string
 *           required:
 *             - quizId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/quiz/publish/remove:
 *   put:
 *     tags:
 *       - Unpublish Quiz
 *     description: UnPublish Quiz
 *     parameters:
 *       - name: reqBody
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             quizId:
 *               type: string
 *           required:
 *             - quizId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/quiz:
 *   get:
 *     tags:
 *       - Get  Quiz by ID
 *     description: Get Quiz by ID
 *     parameters:
 *       - name: quizId
 *         description: request body
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             quizId:
 *               type: string
 *           required:
 *             - quizId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An Unsuccessful response
 */




/**
 * @swagger
 * /api/v1/quiz/popular:
 *   get:
 *     tags:
 *       - Get all Popular Quizzes
 *     description: Get all Popular Quizzes
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/quiz/trending:
 *   get:
 *     tags:
 *       - Get all trending Quizzes
 *     description: Get all trending Quizzes
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/questions/quiz:
 *   get:
 *     tags:
 *       - Get questions with Quiz Id
 *     description: get questions by Quiz Id
 *     parameters:
 *       - name: quizId
 *         description: request body
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             quizId:
 *               type: string
 *           required:
 *             - quizId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */


/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Get all users
 *     description: Get all users
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/players:
 *   get:
 *     tags:
 *       - Get all Players
 *     description: Get all Players
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/admins:
 *   get:
 *     tags:
 *       - Get all Admins
 *     description: Get all Admins
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/player:
 *   get:
 *     tags:
 *       - Get Player by ID
 *     description: Get Player by ID
 *     parameters:
 *       - name: playerId
 *         description: request body
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             playerId:
 *               type: string
 *           required:
 *             - playerId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/player/admin:
 *   put:
 *     tags:
 *       - Elevating player to Admin
 *     description: Elevating player to Admin
 *     parameters:
 *       - name: userId
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *           required:
 *             - userId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/player/suspend:
 *   put:
 *     tags:
 *       - Suspending player
 *     description: suspending player
 *     parameters:
 *       - name: userId
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *           required:
 *             - userId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An unsuccessful response
 */

/**
 * @swagger
 * /api/v1/player/revive:
 *   put:
 *     tags:
 *       - Reviving player
 *     description: reviving player
 *     parameters:
 *       - name: userId
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *           required:
 *             - userId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An Unsuccessful response
 */

/**
 * @swagger
 * /api/v1/game/singleplayer:
 *   post:
 *     tags:
 *       - Initializing a single Player Game
 *     description: Initializing a single Player Game
 *     parameters:
 *       - name: reqBody
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             quizId:
 *               type: string
 *             userId:
 *               type: string
 *           required:
 *             - quizId
 *             - userid
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An Unsuccessful response
 */



/**
 * @swagger
 * /api/v1/game/singleplayer/start:
 *   put:
 *     tags:
 *       - Starting a Single Player Game
 *     description: Starting a Single Player Game
 *     parameters:
 *       - name: reqBody
 *         description: request body 
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             gameId:
 *               type: string
 *           required:
 *             - gameId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An Unsuccessful response
 */

/**
 * @swagger
 * /api/v1/game/restartgame:
 *   put:
 *     tags:
 *       - Restarting a Single Player Game
 *     description: Restarting a Single Player Game
 *     parameters:
 *       - name: reqBody
 *         description: request body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             gameId:
 *               type: string
 *           required:
 *             - gameId
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An Unsuccessful response
 */