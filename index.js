const express = require ('express')
const app = express()
const path = require ('path')
const bodyParser = require ('body-parser')
const fetch = require ('node-fetch')

const mongoose = require ('mongoose')
const user = require ('./models/User')


mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

mongoose.connect('mongodb://localhost/aca_tsq')

app.use('/', express.static(path.join( ('FB_AUTH'))))

app.use(bodyParser.json())

app.post('/login-with-facebook', async(req, res) => {

    const {accessToken, userID} = req.body

    console.log(accessToken, userID)

    const response = await fetch(`https://graph.facebook.com/v3.1/me?access_token=${accessToken}`)
    const json = await response.json()

    console.log(json)

    if(json.id === userID){
        //
        const resp = await user.findOne({ facebookID, userID})

        if(resp){
            //user created. create session
            res.json({ status: 'ok', data: 'user logged in'})
        }else{
            const person = new user({
                name: 'something',
                facebookID: userID,
                accessToken
            })

            await person.save()

            res.json({ status: 'ok', data: 'user registered & logged in'})
        }
    }
    else{
        //impersonate someone
        res.json({ status: 'error', data: 'are you for real!!!'})
    }
})

app.listen(8080, _=> console.log('Listening'))