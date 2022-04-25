const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://Dylan:helloworld@cluster0.59fii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });
//database schema

const UsersSchema = {
    name: Number,
    gender: String,
    finding:Boolean
}

const User = mongoose.model("User", UsersSchema);


const user1 = new User({
    name: 1,
    gender: 'm',
    finding:false
})

const user2 = new User({
    name: 2,
    gender: 'm',
    finding:false

})

const user3 = new User({
    name: 3,
    gender: 'm',
    finding:false

})

const user4 = new User({
    name: 4,
    gender: 'm',
    finding:false

})

const user5 = new User({
    name: 5,
    gender: 'm',
    finding:false

})

const user6 = new User({
    name: 6,
    gender: 'f',
    finding:false

})

const user7 = new User({
    name: 7,
    gender: 'f',
    finding:false

})

const user8 = new User({
    name: 8,
    gender: 'f',
    finding:false

})

const user9 = new User({
    name: 9,
    gender: 'f',
    finding:false

})

const user10 = new User({
    name: 10,
    gender: 'f',
    finding:false

})


const currentUsers = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];


User.insertMany(currentUsers, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("successful saved to database");
    }
});

var matchedAry=[];

app.post('/user/:userId',(req,res)=>{
      const user=req.body.newItem;
      
      User.findOneAndUpdate({name:user},{$set:{finding:true}},(err,result)=>{
          if(err){
              console.log(err);
          }
          else{
              console.log(result);
          }
      });
      
      User.find({} , (err, users) => {
            if(err) {
             console.log("shit");   //do something...
            }
            users.map(user => {
                if(user.finding===true&&user.name!=user){
                
                    if (!matchedAry.includes(user.name)) {
                        matchedAry.push(user.name);
                    }
                }

            }) 
        })
    

res.redirect('/user/:userId');
      
})


app.get('/user/:userId', (req, res) => {
    let userid = req.params.userId;
    User.findOne({name:userid},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("users",{userId:result,matched:matchedAry});

        }
    })


    }

);
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));