const express = require('express')
const app = express()
const fs = require('fs');
const https = require('https')
const cors = require('cors')

app.use(cors())
let content; 
const privateKey = fs.readFileSync('/etc/letsencrypt/live/robinzmuda.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/robinzmuda.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/robinzmuda.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

function refreshText(){
    content = parseInt(content).toString();
    fs.writeFileSync("clapCount.txt", content.toString(), (err)=>{
        res.send(err);
    })
}

https.createServer(credentials, app).listen(8080, () => {
    try{
        fs.readFileSync("clapCount.txt")
        
    }catch(e){
        fs.writeFileSync("clapCount.txt", "0", (err)=>{
            res.send(err);
        })
    }
    content = fs.readFileSync("clapCount.txt", "utf8", (err)=>{
        if(err){
            console.log(err);
            throw err;
        }
    })
    content = parseInt(content).toString();
    setInterval(refreshText,60000);

    console.log('Serveur à l\'écoute')
})
  
app.put('/clap', cors(), (req,res) => {
    content = (parseInt(content)+1).toString();
    res.send(content);
})

app.get('/clap', cors(), (req,res) => {
    res.send(content);
})