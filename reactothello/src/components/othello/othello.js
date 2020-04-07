import React from 'react';
import * as BoardLib from '../../libs/board'; 
import playertype from '../../libs/playertype';
import './othello.css';
import Board from '../board/board';



export default class Othello extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board: BoardLib.getInitialState(),
            turn: 0, //black begins
            players: [playertype.Human, playertype.Random],
            paused: false,
            finished: false
        }
        this.ioWaiting = true;

        this.handlePlayerMove = this.handlePlayerMove.bind(this);

    }

    reset(){
        this.setState({board: BoardLib.getInitialState(), turn: 0, paused: false, finished: false}, () => this.ioWaiting = true);
    }

    /**
     * @returns {String}
     */
    getTurnDiskType(){
        return this.state.turn === 0 ? BoardLib.DiskType.BLACK : BoardLib.DiskType.WHITE;
    }

    goNextState(){
        let diskType = this.getTurnDiskType();
        if(!BoardLib.canMove(diskType, this.state.board)){
            if(!this.state.finished)
                this.setState({finished: true});
            console.log("I can't move :(");
            return;
        }

        let algorithm = undefined;
        switch(this.state.players[this.state.turn]){
            case playertype.Human:
                this.ioWaiting = true;
                return;
            case playertype.MiniMax:
                //set minimax algorithm
                break;
            case playertype.Random:
                //set random algorithm
                break;
            default:
                return;
        }
        //algorithm.move(this.state.board);
        //temporary
        return;

        this.setState({board: this.state.board, turn: (this.state.turn+1) % 2}, 
        () => {
            this.goNextState();
        });
    }

    /**
     * @param {Number} row 
     * @param {Number} col 
     */
    handlePlayerMove(row, col){
        if(!this.ioWaiting) 
            return;

        if(this.state.paused)
            this.setState({paused: false});

        let diskType = this.getTurnDiskType();

        if(!BoardLib.isAvailableMove(row, col, diskType, this.state.board))
            return;
        
        BoardLib.doMove(row, col, diskType, this.state.board);

        this.setState({board: this.state.board, turn: (this.state.turn+1) % 2}, 
        () => {
            this.ioWaiting = false;
            this.goNextState();
        });
    }

    render(){
        return(
            <Board 
                board={this.state.board} 
                onPlayerInteract={this.handlePlayerMove} 
                finished={this.state.finished} 
                turn={this.getTurnDiskType()} 
            />
        );
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    handleClick(e){
        let target = e.target;
        if(!e.target.classList.contains("othello-square"))
            return;
        
        let row = Number.parseInt(target.getAttribute("row"));
        let column = Number.parseInt(target.getAttribute("column"));
        if(this.state.board[row][column] !== '.')
            return;
        if(this.enclose(row, column, this.state.board)){
            let board = this.state.board; //prevents a warning..
            board[row][column] = this.state.turn ? 'B' : 'W';
            this.setState({board: board, turn: !this.state.turn});
        }
    }
}