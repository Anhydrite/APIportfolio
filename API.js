const express = require('express')
const app = express()
const fs = require('fs');
const cors = require('cors')

var corsOptions = {
    origin: function (origin, callback) {
        // db.loadOrigins is an example call to load
        // a list of origins from a backing database
        db.loadOrigins(function (error, origins) {
          callback(error, origins)
        })
      }
  }

app.listen(8080, () => {
    try{
        fs.readFileSync("clapCount.txt")
    }catch(e){
        fs.writeFileSync("clapCount.txt", "0", (err)=>{
            res.send(err);
        })
    }
    console.log('Serveur à l\'écoute')
})
  
app.put('/clap', cors(corsOptions), (req,res) => {
    let content = "";
    content = fs.readFileSync("clapCount.txt", "utf8", (err)=>{
        if(err){
            console.log(err);
            throw err;
        }
    })
    content = (parseInt(content)+1).toString();
    fs.writeFileSync("clapCount.txt", content.toString(), (err)=>{
        res.send(err);
    })
    res.send(content);
})
