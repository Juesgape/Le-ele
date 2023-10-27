/* const resetBoard = () => {
    return Array(16).fill('')
}

const wasAWinner = (value) => {
    if(value !== null && value !== 'tie') {
        return {
            state: true,
            message: `${value} is the winner 🥳 `
        }
    }

    if(value === 'tie') {
        return {
            state: true,
            message: 'The game was a tie!'
        }
    }

    return {state: false}
}

//--------------- Component logic ----------------------------

const Game = (props) => {
    const humanPlayer = props.gameMode
    const aiPlayer = humanPlayer === 'X' ? 'O' : 'X'
    
    const [playerTurn, setPlayerTurn] = useState(props.gameMode)
    const [board, setBoard] = useState(Array(16).fill(''))

    useEffect(() => {
        if (playerTurn === aiPlayer) {
            callAiMove()
        }
    }, [playerTurn])

    const minimax = (board, alpha, beta, isMaximizing) => {
        // Check if game is over
        let result = checkForWinner(board)
    
        if (result !== null) {
            return result === aiPlayer ? 1 : result === humanPlayer ? -1 : 0
        }
    
        // Recursive calling
        if (isMaximizing) {
            let bestScore = -Infinity
            for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = aiPlayer
                let score = minimax(board, alpha, beta, false)
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
                    board[i] = humanPlayer
                    let score = minimax(board, alpha, beta, true)
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

    const bestMove = (board, ai) => {
        // ai makes its turn
        let bestScore = -Infinity
        let move;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = ai;
                let score = minimax(board, -Infinity, Infinity, false);
                board[i] = '';

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        board[move] = ai;

        setPlayerTurn(humanPlayer)
        setBoard(board)

        const winner = checkForWinner(board)
        const alertMessage = wasAWinner(winner)

        if(alertMessage.state) {
            alert(alertMessage.message)
            setPlayerTurn(humanPlayer)
            setBoard(resetBoard)
            return
        }
        
    }

    //Making the ai Move
    const callAiMove = () => {
        setTimeout(() => {
            bestMove(board, aiPlayer)
        }, 200)
    }

    const squareClicked = (index) => {
        if (board[index] !== '') {
            return;
        }

        const updatedBoard = [...board];
        updatedBoard[index] = playerTurn;

        const winner = checkForWinner(updatedBoard)
        const alertMessage = wasAWinner(winner)

        if(alertMessage.state) {
            alert(alertMessage.message)
            setPlayerTurn(humanPlayer)
            setBoard(resetBoard)
            return
        }

        setPlayerTurn(aiPlayer)
    }

    return (
        <div className="App">
            <div className='main-title'>
                <h1>Tic tac toe</h1>
            </div>
            <div className='board'>
                {board.map((square, index) => (
                    <div onClick={() => squareClicked(index)} className='square' key={index}>
                        {square !== '' ? <h3 className='symbol'>{square}</h3> : null}
                    </div>
                ))}
            </div>
        </div>
    )
} */