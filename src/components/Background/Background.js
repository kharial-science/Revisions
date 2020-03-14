import React from 'react'
import './Background.css'

const Background = ({ style }) => {
    return (
        <div id="Background" style={style}>
            <div className="top-left-angle"></div>
            {/* <div className="middle-strip"></div> */}
            <div className="bottom-right-angle"></div>
        </div>
    )
}

export default Background
