import React, {Component} from 'react';
import './GameScreen.css';

const checkForWinner = (board) => {
    let p1 = 0
    let p2 = 4
    let p3 = 5

    while(true) {
        if(p3 > board.length) {
            //There was no winner found
            break
        }

        for(let i = 0; i < 3; i++) {
            if(board[p1] === board[p2] && board[p2] === board[p3] && board[p1] !== "") {
                //We found a winner
                return board[p1]
            }

            p1++
            p2++
            p3++
        }

        p1++
        p2++
        p3++
    }

    //Every cell is filled
    if (board.every(cell => cell)) {
        return 'tie'
    }

    //No winner was found
    return null
}

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            player_turn: props.gameMode,
            board: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            humanPlayer: 'X',
            aiPlayer: 'O'
        } 

        if(this.state.player_turn === 'O') {
            this.state.humanPlayer = 'O'
            this.state.aiPlayer = 'X'
            this.bestMove(this.state.board, this.state.aiPlayer)
        }

        this.squareClicked = this.squareClicked.bind(this)
    }

    getPlayerTurn() {
        return this.state.player_turn
    }

    resetBoard() {
        this.setState({
            player_turn: 'X',
            board: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
        })
    }

    minimax(board, alpha, beta, isMaximizing) {
        // Check if game is over
        let result = checkForWinner(board)
    
        if (result !== null) {
            return result === this.state.aiPlayer ? 1 : result === this.state.humanPlayer ? -1 : 0
        }
    
        // Recursive calling
        if (isMaximizing) {
            let bestScore = -Infinity
            for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = this.state.aiPlayer
                let score = this.minimax(board, alpha, beta, false)
                board[i] = ''
                bestScore = Math.max(bestScore, score)
    
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) {
                    break; // Poda alfa-beta
                }
            }
        }
            return bestScore
        } else {
            let bestScore = Infinity
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = this.state.humanPlayer
                    let score = this.minimax(board, alpha, beta, true)
                    board[i] = ''
                    bestScore = Math.min(bestScore, score)
    
                    beta = Math.min(beta, bestScore);
                    if (beta <= alpha) {
                        break; // Poda alfa-beta
                    }
                }
            }
            return bestScore
        } 
    }

    bestMove(board, ai) {
        // ai makes its turn
        let bestScore = -Infinity
        let move;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = ai;
                let score = this.minimax(board, -Infinity, Infinity, false);
                board[i] = '';

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        board[move] = ai;
        this.setState({
            player_turn: this.state.humanPlayer,
            board: board
        })
        const winner = checkForWinner(board)

        if(winner !== null) {

            if(winner === 'tie') {
                setTimeout(() => {
                    alert('THE GAME IS A TIE')
                    this.resetBoard()
                    if(this.getPlayerTurn() === 'O') {
                        this.callAiMove()
                    }
                }, 500)

            this.setState({
                board: board
            })

            } else {
                setTimeout(() => {
                    alert('El ganador es ' + ai)
                    this.resetBoard()
                    if(this.getPlayerTurn() === 'O') {
                        this.callAiMove()
                    }
                }, 500)
        
        }
    } 
    
}

    callAiMove() {
        setTimeout(() => {
            this.bestMove(this.state.board, this.state.aiPlayer)
        }, 200)
    }

    squareClicked(index) {
        let player_turn = this.state.player_turn
        let board = this.state.board

        if(board[index] !== '') {
            return
        } else {
            board[index] = player_turn
        }

        player_turn = player_turn === 'X' ? 'O' : 'X'

        const winner = checkForWinner(board)

        if(winner !== null) {

            if(winner === 'tie') {

                setTimeout(() => {
                    alert('THE GAME IS A TIE')
                    this.resetBoard()
                    if(this.getPlayerTurn() === 'O') {
                        this.callAiMove()
                    }
                }, 500)

            this.setState({
                board: board
            })

            } else {
            setTimeout(() => {
                alert('El ganador es ' + player_turn)
                this.resetBoard()
                if(this.getPlayerTurn() === 'O') {
                    this.callAiMove()
                }
            }, 500)

            this.setState({
                board: board
            })
        }

            return

        }

        this.setState({
            player_turn: player_turn,
            board: board
        })

        this.bestMove(board, player_turn)
    }

    render() {
        return (
            <div className="App">

            <div className='main-title'>
                <h1>Tic tac toe</h1>
            </div>

            <div className='board'>

            {this.state.board.map((square, index) => {
                return(
                <div onClick={ () => this.squareClicked(index)} className='square' key={index}>
                    {square !== '' ? <h3 className='symbol'>{square}</h3> : null}
                
                </div>
                )
            })}

                </div>
            </div>
        );
    }
}

export {Game};