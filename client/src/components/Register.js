import React from 'react'
import '../components/Register';
import '../App.css';



const Register = (props) => {
    return (
        
      <div>
      
        
        <h1 className="title">Enter User Name and Email to Register Quiz App</h1>

        <form className="container" onSubmit={props.submitForm}>

          <label htmlFor="form_name">User Name</label>
          <input type="text" name="form_name" placeholder="name" onChange={props.formData} required/>
  
          <label htmlFor="form_email">User Email</label>
          <input type="email" name="form_email" placeholder="email" onChange={props.formData} required/>

          <label htmlFor="form_password">User Password</label>
          <input type="password" name="form_password" placeholder="password" onChange={props.formData} required/>

          <button type="submit">Register User</button>
        </form>
      </div>
        
    )
}

export default Register
