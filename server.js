const express = require("express")
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

const app = express()

app.use(express.json())
app.use(express.static("public"))

let sock

async function start(){

const { state, saveCreds } = await useMultiFileAuthState("./session")

sock = makeWASocket({
auth: state
})

sock.ev.on("creds.update", saveCreds)

}

start()

app.post("/pair", async (req,res)=>{

try{

let number = req.body.number

let code = await sock.requestPairingCode(number)

res.json({code:code})

}catch(e){

res.json({error:e.message})

}

})

app.listen(process.env.PORT || 3000, ()=>{

console.log("ZAHID KING SERVER STARTED")

})