import React from 'react'
import './Footer.css'

import Background from './../Background/Background'

const Footer = ({ lastWords, isFull, handleMethodSwitch, currentWordPickerMethod, currentWordNumber }) => {
    const lastWordsInShapes = []

    if (lastWords) {
        lastWords.forEach((word, index) => {
            if (!word) return
            const state = index === 0 ? 'first' : index === lastWords.length - 1 ? 'last' : 'middle'

            lastWordsInShapes.push(
                <div key={word.word + state + index} className={`last-word-shape ${state}`}>
                    <div className="shape">
                        <h4>{word.number}</h4>
                    </div>
                </div>
            )
        })

        if (isFull) lastWordsInShapes.push(
            <div key={lastWords.length && lastWords[0].word + 5} className='disappeared-word-shape'></div>
        )
    }
    
    return (
        <div id='Footer'>
            <div className="next-method-picker" onClick={handleMethodSwitch}>
                <h3 className={`random-method ${currentWordPickerMethod[0] === 'pickRandomWordFromRows' ? 'selected' : ''}`}>Random</h3>
                <h3 className={`inorder-method ${currentWordPickerMethod[0] === 'pickRandomWordFromRows' ? '' : 'selected'}`}>In order</h3>
                <div className={`method-bubble ${currentWordPickerMethod[0] === 'pickRandomWordFromRows' ? 'selected1' : 'selected2'}`}>
                    <h4>{currentWordNumber}</h4>
                </div>
            </div>

            <div className="last-words-shape-container" style={{ }}>
                {lastWordsInShapes}
            </div>
            
            <div className="table-picker">

            </div>

            <Background style={{ filter: 'hue-rotate(-90deg)' }} />
        </div>
    )
}

export default Footer
