const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const request = require('request');
const response = require('express');
const methodOverride = require('method-override');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const app = express();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB is connected"));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(methodOverride('_method'));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "All working fine"
    })
});

app.post('/register', (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: 'Form Data Received'
    })
});

app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'This is my test value',
        user: 'Chi'
    })
});

app.get("/", (req,res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login/user', async (req, res) => {
    console.log(req.body);

    const email = req.body.user_email;
    const password = req.body.user_password;
    
    console.log(email);
    console.log(password);

    const user = await User.findOne({ email: email });

    const hashedPassword = user.password;

    const isMatch = await bcryptjs.compare(password, hashedPassword);

    console.log(isMatch);

    if(req.cookies){
        console.log(req.cookies.jwt);

        const decoded = jwt.verify(req.cookie.jwt, process.env.JWT_SECRET);
        console.log(decoded);

        if( (decoded.id == user._id) && isMAtch ) {
            res.send('<h1>User Logged in</h1>');
        } else {
            res.send('email or password is wrong');
        }
    }

    res.send('<h1>user login</h1>');
    
});

app.post('/register/user', async (req, res) => {
    console.log(req.body);
    const name = req.body.user_name;
    const email = req.body.user_email;
    const password = req.body.user_password;
    const score = req.body.user_userScore;
    

    const hashedPassword = await bcryptjs.hash(password, 8);

    try {
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            score: score
            
        })

        // const signToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        // const cookieOptions = {
        //     expires: new Date(
        //         Date.now() + 90 * 24 * 60 * 60 * 1000
        //     )
        // };

        // res.cookie('jwt', signToken, cookieOptions);

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            status: error.message

        });
        res.send('<h1>User Registered</h1>');
    }
});

app.post('api/Quiz', (req, res) => {

    const quizUrl = `https://trivia.propernerd.com/api/questions?limit=6&random=1`;

    console.log(quizUrl);

    request({ url: quizUrl, json: true}, (error, response) => {

    if(response.body.error){ //display error
        res.render('index', {
                results: "Sorry that option isn't available"
        })
        } else {
            res.render('Quiz', {

            category: response.body.question[0].category,
            type: response.body.results[0].type,
            difficulty: response.body.results[0].question,
            correctAnswer: response.body.results[0].correct_answer,
            incorrect: response.body.results[0].incorrect_answers[0]

            })
        }

    })
});


app.listen(5000 , (req, res) => {
    console.log('server is running port 5000');
});