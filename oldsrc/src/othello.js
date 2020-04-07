import React from 'react';
import './othello.css';
import PropTypes from 'prop-types';


export default class Othello extends React.Component{
    constructor(props){
        this.state = {
            board: [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','B','W','.','.','.'],
                ['.','.','.','W','B','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.']
            ]
        }
    }

    render(){
        // return (
        //     <div className="othello-container">
        //         {this.state.board.map((row, rowIndex) => row.map((square, columnIndex) => 
        //         <div className="othello-square" row={rowIndex} column={columnIndex}>
        //             {square !== '.' ? <div className={square + "-disk"}></div> : null}
        //         </div>))}
        //     </div>
        // );
        return(
            <h1>Hello world</h1> 
        );
    }
}


Othello.prototype = {
    width: PropTypes.number,
    height: PropTypes.number,

    
}