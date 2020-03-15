import React from 'react'
import './Header.css'

import Background from './../Background/Background'

const Header = ({}) => {
    return (
        <div id="Header">
            <div id='header-title-container'>
                <h2>Kharoh Family Science</h2>
            </div>
            <a href='https://discord.gg/AUTXwEA'><img src={require('../../assets/images/kfs.png')} id='ourLogo' /></a>
            <div id='social-networks'>
                <a href='https://kharohfamily-science.github.io/Kharoh-Family-Science/' className='social-network website' target='_blank'><img src={require('../../assets/images/website.png')} alt='website' /></a>
                <a href='https://discord.gg/AUTXwEA' className='social-network discord' target='_blank'><img src='https://img.icons8.com/dotty/80/000000/discord-logo.png' alt='discord' /></a>
                <a href='https://github.com/kharohfamily-science' className='social-network' target='_blank'><img src='https://img.icons8.com/dotty/80/000000/github.png' alt='github' /></a>
                <a href='https://twitter.com/KFamilyScience' className='social-network' target='_blank'><img src='https://img.icons8.com/dotty/80/000000/twitter.png' alt='twitter' /></a>
            </div>

            <Background style={{ filter: 'hue-rotate(-90deg)' }} />
        </div>
    )
}

export default Header
