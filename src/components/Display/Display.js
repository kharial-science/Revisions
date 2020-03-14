import React, { Component } from 'react'
import './Display.css'

const Display = ({ definition, word, style }) => {
    return (
        <div className="Display">
            <div className="definition">
                <h2>
                    {definition}
                </h2>
            </div>
            <div className="word">
                <h2>
                    {word}
                </h2>
            </div>
        </div>
    )
}

export default Display