import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import './App.css';
import { Game } from './GameScreen/GameScreen';
import {MainScreen} from './MainScreen/MainScreen'

function App() {
  const [gameMode, setGameMode] = React.useState('')
  const [gameStarted, setGameStarted] = React.useState(false)

  const handleGameMode = (mode) => {
    setGameMode(mode)
    setGameStarted(true)
  }

  return(

      <TransitionGroup>
        <CSSTransition
          key={gameStarted ? 'game' : 'mainScreen'}
          timeout={300}
          classNames='fade'
        >

          {gameStarted ? (
            <Game gameMode={gameMode} />
          ) : (
            <MainScreen handleGameMode={handleGameMode}></MainScreen>
          )}

        </CSSTransition>
      </TransitionGroup>

  )
}
export default App;
