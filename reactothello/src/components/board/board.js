import React from 'react';
import './board.css';
import * as BoardLib from '../../libs/board'
import PropTypes from 'prop-types';


export default class Board extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    getPlayerName(disk){
        return disk === BoardLib.DiskType.WHITE ? "white" : "black";
    }

    render(){
        let message = "";
        let currentPlayerName = this.getPlayerName(this.props.turn);
        if(this.props.finished){
            let blackScore = BoardLib.getScore(BoardLib.DiskType.BLACK, this.props.board);
            message = "";
            if(blackScore === 0)
                message += "It's a tie!";
            else if(blackScore < 0)
                message += "White won by " + -blackScore + " points!";
            else
                message += "Black won by " + blackScore + " points!";
        }else{
            message = "It's " + currentPlayerName + " turn";
        }

        return(
            <div className="outer-container">
                <h1>{message}</h1>
                <div className="othello-container">
                    {this.props.board.map((row, rowIndex) => row.map((square, columnIndex) => 
                    <div className="othello-square" 
                    row={rowIndex} 
                    column={columnIndex}
                    onClick={this.handleClick}>
                        {square !== BoardLib.DiskType.EMPTY ? <div className={square + " disk"}></div> : null}
                    </div>))}
                </div>
            </div>
        );
    }

    handleClick(e){
        let target = e.target;

        //ignore all clicks that are not on empty squares
        if(!e.target.classList.contains("othello-square"))
            return;
        
        let row = Number.parseInt(target.getAttribute("row"));
        let column = Number.parseInt(target.getAttribute("column"));

        this.props.onPlayerInteract(row, column);
    }

}

Board.propTypes = {
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    onPlayerInteract: PropTypes.func.isRequired,
    turn: PropTypes.string.isRequired,
    finished: PropTypes.bool.isRequired
}