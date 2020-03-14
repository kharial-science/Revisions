import React from 'react'
import './Footer.css'

import Background from './../Background/Background'

const Footer = ({ lastWords, isFull }) => {
    const lastWordsInShapes = []

    if (lastWords) {
        lastWords.forEach((word, index) => {
            if (!word) return
            const state = index === 0 ? 'first' : index === lastWords.length - 1 ? 'last' : 'middle'

            lastWordsInShapes.push(
                <div key={word.word + state + index} className={`last-word-shape ${state}`}>
                    <div className="shape"></div>
                </div>
            )
        })

        if (isFull) lastWordsInShapes.push(
            <div key={lastWords.length && lastWords[0].word + 5} className='disappeared-word-shape'></div>
        )
    }
    
    return (
        <div id='Footer'>
            <div className="last-words-shape-container" style={{ }}>
                {lastWordsInShapes}
            </div>

            <Background style={{ filter: 'hue-rotate(-90deg)' }} />
        </div>
    )
}

export default Footer
