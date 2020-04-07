import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Othello from './othello'
import './index.css'

ReactDOM.render(
    <Othello width="8" height="8"/>,document.getElementById('root')
);