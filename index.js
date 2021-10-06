import express from 'express'
const app = express()
import path from 'path'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'

import mongoose from 'mongoose'
//import user from './models/User'

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

mongoose.connect('mongodb://localhost/aca_tsq')

app.use('/', express.static(path.join( ('FB_AUTH'))))

app.use(bodyParser.json())

app.post('/login-with-facebook', async(req, res) => {

    const {accessToken, userID} = req.body

    console.log(accessToken, userID)

    const response = await fetch(`https://graph.facebook.com/v3.1/me?access_token=${accessToken}EAAGFasfPN0MBAOuN96kEtH04EVncwa1E0nW98ABUNo1vDFSVA6IEUuiRLJSFuxJjoCDg4wJMfeRg54v3EVZBJQXzgJND8uPrJpoti4D4TXA3hkSs48l3tNZBn41qoByfE4ul3SfwrM9zw0aZBrhIg5liQg0fv4D7EWXNxJx0B9jT8xGFIUsfamFZCL5d8hKpKCCM4mBykHIBGBp3oCW1&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
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