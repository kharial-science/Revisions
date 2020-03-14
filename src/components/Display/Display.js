import React from 'react'
import './Display.css'

const Display = ({ definition, word, state }) => {
    return (
        <div id={state} className='Display'>
            <div className="definition">
                <p> { definition } </p>
            </div>
            <div className="word">
                <p> { word } </p>
            </div>
        </div>
    )
}

export default Display
