import React from "react";
import './MainScreen.css'

function MainScreen(props) {

    const handlePlayerMode = (mode) => {
        /* console.log('The function works and its value is', mode); */
        props.handleGameMode(mode)
    }

    return(

        <React.Fragment>

        <div className="main-container">

            <div className="content">

                <div className="choose-title">
                    <h2>Choose <span className="color-x">X</span> or <span className="color-o">O</span></h2>
                </div>

                <div className="buttons-container">
                    <div className="button">
                        <button onClick={() => handlePlayerMode('X')} className="btn-x"><span className="color-x">X</span></button>
                    </div>

                    <div className="button">
                        <button onClick={() => handlePlayerMode('O')} className="btn-o"><span className="color-o">O</span></button>
                    </div>
                </div>

            </div>
            
        </div>

        </React.Fragment>
    )
}

export {MainScreen}