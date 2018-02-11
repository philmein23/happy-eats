import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/about">About</Link>
        </nav>
    )
}