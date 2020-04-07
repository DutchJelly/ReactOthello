

export function getInitialState(){
    let e = DiskType.EMPTY;
    let b = DiskType.BLACK;
    let w = DiskType.WHITE;
    return(
        [[e,e,e,e,e,e,e,e],
        [e,e,e,e,e,e,e,e],
        [e,e,e,e,e,e,e,e],
        [e,e,e,b,w,e,e,e],
        [e,e,e,w,b,e,e,e],
        [e,e,e,e,e,e,e,e],
        [e,e,e,e,e,e,e,e],
        [e,e,e,e,e,e,e,e]]
    );
}


/**
 * Returns the amount that color encloses.
 * @param {Number} row 
 * @param {Number} column 
 * @param {String} color 
 * @param {Object} direction 
 * @param {Array<Array<Number>>} board 
 */
function countEnclosed(row, column, color, direction, board){
    row -= direction.rowOffset;
    column -= direction.colOffset;

    if(row >= board.length || row < 0 || column >= board[0].length || column < 0
    || board[row][column] === DiskType.EMPTY)
        return -1;   
    
    if(board[row][column] === color)
        return 0;

    let enclosedCount = countEnclosed(row, column, color, direction, board);
    if(enclosedCount === -1)
        return -1;
    return enclosedCount + 1;
}

/**
 * @param {Number} row 
 * @param {Number} col 
 * @param {String} color
 * @param {Array<Array<Number>>} board 
 */
export function isAvailableMove(row, col, color, board){
    if(board[row][col] !== DiskType.EMPTY)
        return false;
    for(let rowOffset = -1; rowOffset <= 1; rowOffset++){
        for(let colOffset = -1; colOffset <= 1; colOffset++){
            if(countEnclosed(row, col, color, {
                rowOffset: rowOffset,
                colOffset: colOffset
            }, board) > 0)  return true;
        }
    }
    return false;
}

/**
 * @param {String} color
 * @param {Array<Array<Number>>} board 
 */
export function canMove(color, board){
    for(let rowIndex = 0; rowIndex < board.length; rowIndex++){
        for(let colIndex = 0; colIndex < board[rowIndex].length; colIndex++){
            if(isAvailableMove(rowIndex, colIndex, color, board))
                return true;
        }
    }
    return false;
}

 /**
 * finds and replaces in direction in board. stops when find is not found
 * @param {Number} row 
 * @param {Number} column 
 * @param {String} find 
 * @param {String} replace 
 * @param {Object} direction 
 * @param {Array<Array<Number>>} board 
 */
function findAndReplace(row, column, find, replace, direction, board){
    row -= direction.rowOffset;
    column -= direction.colOffset;
    if(row >= board.length || row < 0 || column >= board[0].length || column < 0)
        return;
    
    if(board[row][column] === find){
        board[row][column] = replace;
        findAndReplace(row, column, find, replace, direction, board);
    }
}

/**
 * Performs the move of color in board[row][col].
 * @param {Number} row 
 * @param {Number} col 
 * @param {String} color
 * @param {Array<Array<Number>>} board 
 * @returns {Boolean} successful?
 */
export function doMove(row, col, color, board){
    let otherColor = color === DiskType.WHITE ? DiskType.BLACK : DiskType.WHITE;
    let success = false;
    for(let rowOffset = -1; rowOffset <= 1; rowOffset++){
        for(let colOffset = -1; colOffset <= 1; colOffset++){
            if(countEnclosed(row, col, color, {rowOffset: rowOffset, colOffset: colOffset}, board) > 0){
                findAndReplace(row, col, otherColor, color, {rowOffset: rowOffset, colOffset: colOffset}, board);
                board[row][col] = color;
                success = true;
            }
        }
    }
    return success;
}

/**
 * Counts the score for player in board. Can be negative.
 * @param {String} player 
 * @param {Array<Array<Number>>} board 
 * @returns {Number}
 */
export function getScore(player, board){
    let counter = 0;
    board.forEach(x => x.forEach(y => {
        if(y !== DiskType.EMPTY)
            counter += y === player ? 1 : -1;
    }));
    return counter;
}

/**
 * @param {Array<Array<Number>>} board 
 * @returns {Array<Array<Number>>} cloned board
 */
export function cloneBoard(board){
    let cloned = [];
    board.forEach((x,i) => x.forEach((y,j) => {
        cloned[i] = [].concat(j);
    }));
    return cloned;
}

export let DiskType = {
    BLACK: 'B',
    WHITE: 'W',
    EMPTY: '.'
}