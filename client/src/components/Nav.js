import React from 'react'
import '../NavBar.css';
import { Link } from 'react-router-dom';




const Nav = () => {
    return (
        <nav className="navbar">
            <h1>Covid-19 Lockdown Quiz App</h1>
            <ul>
            <li><Link to="/Home" href="/Home">Home Page</Link></li>
            <li><Link to="/Register" href="/Register">Register</Link></li>
            <li><Link to="/Login" href="/Login">Login</Link></li>
            <li><Link to="/Quiz" href="/Quiz">Quiz</Link></li>
            <li><Link to="/Leader" href="/Leader">Top Scores</Link></li>
            
            
            </ul>
        </nav>
    )
}

export default Nav
