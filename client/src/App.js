import React from 'react';
import axios from 'axios';
import './App.css';
import Quiz from './components/Quiz';
import Register from './components/Register';
import Leader from './components/Leader';
import Nav from './components/Nav';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';



class App extends React.Component {

  state = {
    form_name: '',
    form_email: '',
    form_password: '',
    questions: [],
    answer: [],
    userScore: 0,
    leader: [],
    incorrect: [],
    timer: 0,
    top: 0,
    
  }

  
  formData = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      [e.target.answer]: e.target.correct_answer,
      [e.target.userScore]: e.target.userScore
    })
  }

  score = () => {
    console.log('button pressed');

    this.setState({
      ...this.state,
      score: this.state.userScore +1
    })
  }

  submitForm = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({
      user_name: this.state.form_name,
      user_email: this.state.form_email,
      user_password: this.state.form_password,
      user_userScore: this.state.userScore
     
    })

    const res = await axios.post('/register/user', body, config );

    const res2 = await axios.get('Users', body, config);

    console.log(res.data);
    console.log(res2.data);

     this.setState({
      users: res2.data
    })

  }

  componentDidMount = async () => {

    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple");
    
    console.log(response.data);
    
    
    this.setState({
      questions: response.data.results,
      incorrect: response.data.results,

    
    });
  }
  // componentDidMount = async () => {
  //   const dbresponse = await axios.get("mongodb+srv://chiyinli:Li20851025@chiyinli-hfsyl.mongodb.net/test?retryWrites=true&w=majority");

  //   console.log(dbresponse);
  //   this.setState({
  //     leader: dbresponse
  //   })
  // }

  render() {
    console.log(this.state);
    

    const allArrays = this.state.questions && this.state.questions.map( (askQuestion) => {
      console.log(askQuestion);
      console.log(this.state.score);
      return (
          <div>
            <h1>Score: {this.state.userScore}</h1>
            <h1>Timer: {this.state.timer}</h1>
            <h1>{askQuestion.question}</h1>
            <h3><button onClick={this.state.score}>Choose Answer</button>{askQuestion.correct_answer}</h3>
            <h3><button onClick="submit">Choose Answer</button>{askQuestion.incorrect_answers[0]}</h3>
            <h3><button onClick="submit">Choose Answer</button>{askQuestion.incorrect_answers[1]}</h3>
            <h3><button onCLick="submit">Choose Answer</button>{askQuestion.incorrect_answers[2]}</h3>
          </div>

      )
    })
    
     
    
    return (
      
   
      <div>
        <BrowserRouter>
          <Nav/>
            <Switch>
              <Route exact path="/Home" render={ () =><Home/>} />
              <Route exact path="/Login" render={ () =><Login submitForm={this.submitForm} formData={this.formData}/>}/>
              <Route exact path="/Register" render={ () =><Register submitForm={this.submitForm} formData={this.formData}/>}/>
              <Route exact path="/Quiz" render={ () =><Quiz rest={this.reset} userScore={this.state.score} score={this.score} askQuestions={allArrays} correct={this.state.answer} incorrect={this.state.incorrect} score={this.state.score} timer={this.state.timer}/>}/>
              <Route exact path="/Leader" render={ () =><Leader grabUsers={this.state.userScore}/> } /> 
                     
            </Switch>
        </BrowserRouter>
      </div>
      
    )
  }
}

export default App;
