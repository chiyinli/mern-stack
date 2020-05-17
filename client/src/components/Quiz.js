import React from 'react';
import '../App.css';




const Quiz = (props) => {
    return (
       
        <div className="container">
            <h1 className="title">Quiz Home Page</h1>
            <h2 className="subTitle">Answer the following questions as quickly as possible</h2>
            
            {props.askQuestions}
            
        </div>
        
    )}


export default Quiz;
