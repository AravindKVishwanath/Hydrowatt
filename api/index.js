const express = require('express')
const bodyparser = require('body-parser')
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const User = require("./models/user")

const app = express()

const port = 3000;

const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//connecting to mongoDB
mongoose.connect("mongodb+srv://aravindkvishwanath:hydrowatt@cluster0.f2b87z8.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to Mongo DB")
    }).catch((err) => {
        console.log("Error connecting to mongo DB", err)
    })

//Home page
app.get("/", async (req, res) => {
    try {
        res.status(200).json({
            Hello: "Welcome to ElectrocodeInnovators' Hydrowatt!!",
            message: "Aiming to mindfully build a greener future By managing your Electricity and Water Consumptions"
        })
    } catch (error) {
        res.status(404)
        console.log("Root error", error)
    }
})

//endPoint to register a user to Mongo DB
app.post("/register", async (req, res) => {
    try {
        const { Name, Email, Password } = req.body
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this credentials" })
        }
        //create a new user
        const newUser = new User({ Name, Email, Password })

        //generate and store verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex")
        newUser.Password = bcrypt.hashSync(newUser.Password, 10);   //create a random string like a unique ID
        //save to Mongo Db
        await newUser.save()

        res.status(200).json({ message: "registration successful please check email for verification" })

    } catch (error) {
        console.log("Error registering the user", error);
        //Alert("Try Registering Again")
        res.status(500).json({ message: "error registering user" });
    }
})
//function to send email(need to create the function)

//endpoint to verify user through email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token })
        if (!user) {
            return res.status(404).json({ message: "Invalid Token" })
        }
        user.verfied = true
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ message: "Email verified successfully" })
    } catch {
        console.log("Error getting token")
        res.status(500).json({ message: "Email verification failed" })
    }
}
)

//function to create a random secretKey 
const generateSecretkey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}

const secretKey = generateSecretkey();

app.post("/login", async (req, res) => {
    try {
        const Email = req.body.Email
        const Password = req.body.Password
        console.log(Email, Password)
        const user = await User.findOne({ Email: Email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Invalid user" })
            s
        }
        // if(user.Password !== Password){
        //    return res.status(404).json({message:"Invalid password"})
        //} 


        //checking with hashed password and user entered password
        const isPasswordMatch = bcrypt.compareSync(Password, user.Password);
        if (isPasswordMatch) {
            const token = jwt.sign({ userId: user._id }, secretKey);
            res.status(200).json({ token })
        }
        else {
            res.status(500).json({ error: "Wrong password" })
        }
    } catch (error) {
        res.status(500).json({ message: "Login unsuccessful" })
    }
})
///username or email or password update
app.put("/updateDetails/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const name = req.body.Name;
        const email = req.body.Email;
        const password = req.body.Password;

        const user = await User.findOneAndUpdate({ _id: id }, { Name: name, Email: email, Password: password })
        console.log("updated user details", user)
        res.status(200).json({ message: "User details updated sucessfully" })
    } catch (error) {
        console.log("error in updating user details", error)
        res.status(500).json({ error: "Error updating user detais" })
    }
})


///getUserInfo wrt Email after login (Accessible only to home page right now)
app.get('/getUserInfo/:Email', async (req, res) => {
    const userEmail = req.params; // Get the email from the query parameters
    console.log(userEmail.Email)
    // Use Mongoose or another library to find the user by email and retrieve the name
    const user = await User.findOne({ Email: userEmail.Email });
    console.log("user in get info request", user);
    if (user) {
        res.status(200).json({ Name: user.Name });
    }
    else {
        res.status(500).json({ message: "Error occured in getting info" })
    }
});
app.get('/getIdbyEmail/:Email', async (req, res) => {
    const userEmail = req.params; // Get the email from the query parameters
    console.log(userEmail.Email)
    // Use Mongoose or another library to find the user by email and retrieve the name
    const user = await User.findOne({ Email: userEmail.Email });
    console.log("user in get info request", user);
    if (user) {
        res.status(200).json({ _id: user._id });
    }
    else {
        res.status(500).json({ message: "Error occured in getting info" })
    }
});

app.get("/Waterdata", async (req, res) => {
    const uri = 'mongodb+srv://alphagamers456:1AiKIagNI4kNuiNX@smart-indiahackathon.5m7iwx4.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('test');
        const waterConsumptionCollection = db.collection('smart-indiahackathons');
        const data = await waterConsumptionCollection.find({}, { projection: { totalConsumption: 1, _id: 0 } }).toArray();
        res.status(200).json(data);
        await client.close();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error retriveing" })
    }
})
//updating the Water Consumption goals in the userProfile
app.put("/WaterConsumptionGoal/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log("id is", id)
        const Wgoal = req.body.WaterConsumptionGoal
        console.log(Wgoal)
        const user = await User.findByIdAndUpdate({ _id: id }, { WaterConsumptionGoal: Wgoal }, { new: true })
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        console.log("WaterConsumption goals error", error)
        res.status(500).json({ message: "Error in Updating the Water Monitor Goal" })
    }
});

//updating th Electricity Monitoring goals in the user profile
app.put("/ElectricityConsumptionGoal/:id", async (req, res) => {
    try {
        const id = req.params.id
        const Egoal = req.body.ElectricityConsumptionGoal
        const user = await User.findByIdAndUpdate({ _id: id }, { ElectricityConsumptionGoal: Egoal }, { new: true })
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        console.log("ElectricityConsumptionGoal error", error)
        res.status(500).json({ message: "Error in Updating the ElectricityConsumptionGoal" })
    }
})

//updatin
app.put("/profilepicture/:id", async (req, res) => {
    try {
        const id = req.params.id
        const image = req.body.profilePicture
        const user = await User.findByIdAndUpdate({ _id: id }, { profilePicture: image }, { new: true })
        res.status(200).json(user.profilePicture)
    } catch (error) {
        console.log("Error in updating the picture", error)
        res.status(500).json({ message: "Error in updating profile picture" })
    }
})
app.put("/Badges/:id", async (req, res) => {
    try {
        const id = req.params.id
        const badgeType = req.body.badgeType
        res.status(200).json({ message: "New Badge unlocked" })

    } catch (error) {
        console.log("Badges error", error)
        res.status(500).json({ message: "Could not retrieve badges" })
    }
})
app.put("/DailyStreak/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const dailyStreak = req.body.DailyStreak;
        const user = await User.findOneAndUpdate({ _id: id }, { DailyStreak: dailyStreak }, { new: true })
        console.log("after updating daily streak", user)
        res.status(200).json({ DailyStreak: user.DailyStreak })
    } catch (error) {
        console.log("daily streak error", error)
        res.status(500).json({ error: "Error in updating daily streak" })
    }
})
app.put("/MonthlyStreak/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const monthlyStreak = req.body.MonthlyStreak;
        const user = await User.findOneAndUpdate({ _id: id }, { MonthlyGoalStreak: monthlyStreak }, { new: true })
        res.status(200).json({ MonthlyStreak: user.MonthlyGoalStreak })
    } catch (error) {
        console.log("Error updating monthly streak", error)
        res.status(500).json({ error: "Error updating Monthly streak" })
    }
})
app.listen(port, () => {
    try {
        console.log("Sever Started successfully on port 3000")

    } catch (error) {
        console.log("Error in starting server", error)
        res.send(500).json({ error: "Could not set up a server on port 3000" })
    }
})