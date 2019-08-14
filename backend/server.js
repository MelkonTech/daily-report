
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {ATLAS_URI,jwtSecret} = require('./config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const port = 4001
let User = require('./models/user.model')
let Report = require('./models/report.model')
const app = express()
const bcrypt = require("bcrypt")
const server = http.createServer(app)

const io = socketIO(server)

const uri = ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true , useCreateIndex:true})
const connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB connection established successfuly!!!')
})


io.on('connection', socket => {
  console.log('User connected')
  
    //register
    socket.on('register', (user) => {
        const {email,password,firstName} = user
        name = firstName
        User.findOne({email})
            .then(user => { if(user) {return socket.emit("RegError",{error:`Error: User with this email has already exists`})
                }else {
                    const newUser = new User({email,name})    
                newUser.password = newUser.generateHash(password)
                newUser.save()
                socket.emit("RegSuccees")
                }}
                    )
      
    })
    //login

    socket.on('login', (user) => {
        const {email,password} = user
        User.findOne({email})
            .then((user) => { 
                if(!user) {return socket.emit("LogError",{error:`Error: User with this email doesn't exists`})}
                
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        jwt.sign({
                            id: user._id
                        },jwtSecret,{ expiresIn:360000 },
                        (err,token) => {
                            if(err) {res.json("LogError",{error:`Error: ${err}`})};

                            socket.emit("LogSuccees",{token,user})
                        }
                        )
                    } else {
                        socket.emit("LogError",{error:'Incorrect password'});
                        }
                });})
    })

    
    socket.on('getUser', (token) => {
        try {
            decoded = jwt.verify(token, jwtSecret);
            var userId = decoded.id;
            
            User.findById(userId)
            .select('-password')
            .then(user => socket.emit("getUserSuccees",user)
    )
        } catch (e) {
        }
    
    })

    socket.on('getUsers', (type) => {
        if(type === "admin"){
        User.find({}, (err,users) => {
            socket.emit("getUsersSuccees",users)
        })
    }else{
        socket.emit("getUsersError","You must be admin for this tool")
    }
    
    })
    
    socket.on('changeType', (userId,value,name) => {
        User.findById(userId)
            .then(user => {
                user.type = value
                user.save()
                socket.emit("changeTypeSuccees",value,name)}
                )
    
    })


    socket.on("sendReport", (author,description,estiomation,spent) => {

        const newReport = new Report({author,description,estiomation,spent})    
        newReport.save()
        socket.emit("sendReportSuccees")
    })
       
        

    socket.on('getReports', (userId) => {
        User.findById(userId)
            .then(() => {
                Report.find({})
                    .populate('author') 
                    .exec(function (err, reports) {
                        io.sockets.emit("getReportsSuccees",reports)
                    });
                })
        })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))