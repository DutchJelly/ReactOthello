import React from 'react';
import './controls.css';
import PropTypes from 'prop-types';


export default class Controls extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            mode: props.mode,
            player: props.player
        }

        this.modeSwitch = () => this.setState({mode: (this.state.mode + 1) % this.modeAmount});
        this.playerToggle = () => this.setState({player: !this.state.player});
        this.modeAmount = 3;
    }

    getModeName(modeIndex){
        switch(modeIndex){
            case 0:
                return "random player";
            case 1:
                return "minimax player";
            case 2:
                return "ultra minimax player";
        }
    }


    render(){
        return(
        <div id="botcontrols">
            <div id="botcontrols-inner">
                <button id="mode-button" className={this.state.player ? "black-button" : null} onClick={this.modeSwitch}>{this.getModeName(this.state.mode)}</button>
                <button id="player-toggle" className={this.state.player ? "black-button" : null} onClick={this.playerToggle}>{this.state.player ? "black" : "white"}</button>
            </div>
        </div>
        );
    }

    modeSwitch(){
        this.setState({mode: this.state.mode+1 % this.modeAmount});
    }

    playerToggle(){
        this.setState({player: !this.state.player});
    }

    //perform the move if needed
    getSnapshotBeforeUpdate(prevProps){
        console.log("erm");
        if(this.state.player === this.props.player){
            console.log("I have to perform a move!");
        }
    }


}