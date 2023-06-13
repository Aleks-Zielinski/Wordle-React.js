import React, { useState } from "react";
import './links.css'

// Github
import WhiteIconGitHub from './Icons/github-mark-white.png'
import GreyIconGitHub from './Icons/github-mark-grey.png'

// Discord
import WhiteIconDiscord from './Icons/discord-mark-white.png'
import GreyIconDiscord from './Icons/discord-mark-grey.png'

// Email
import WhiteIconEmail from './Icons/email-mark-white.png'
import GreyIconEmail from './Icons/email-mark-grey.png'

// Credits
const WordleLink = 'https://www.nytimes.com/games/wordle/index.html'
const WordListLink = 'https://github.com/tabatkins/wordle-list' 

function Links(){
    const [GitHubSrc, setGitHubSrc] = useState(WhiteIconGitHub)
    const [DiscordSrc, setDiscordSrc] = useState(WhiteIconDiscord)
    const [EmailSrc, setEmailSrc] = useState(WhiteIconEmail)
    return(
        <>
            <section id="LinksRow">
                <a href="https://github.com/Aleks-Zielinski/Wordle-React.js" target="noreferrer">
                    <img src={GitHubSrc} alt="Github icon" 
                        onMouseOver={() => setGitHubSrc(GreyIconGitHub)} 
                        onMouseOut={() => setGitHubSrc(WhiteIconGitHub)}/>
                </a>
                <a href="https://discord.com/users/295254892690407426" target="noreferrer">
                    <img src={DiscordSrc} alt="Discord icon" 
                        onMouseOver={() => setDiscordSrc(GreyIconDiscord)} 
                        onMouseOut={() => setDiscordSrc(WhiteIconDiscord)}/>
                </a>
                <a href="mailto:alekszielinski01@gmail.com" target="noreferrer">
                    <img src={EmailSrc} alt="Email icon" 
                        onMouseOver={() => setEmailSrc(GreyIconEmail)} 
                        onMouseOut={() => setEmailSrc(WhiteIconEmail)}/>
                </a>
            </section>
            <section id="CreditsRow">
                <p>External links:</p>
                <p><a href={WordleLink} target="noreferrer">Original game</a></p>
                <p><a href={WordListLink} target="noreferrer">List of 14855 words</a></p>
            </section>
        </>
    )
}

export default Links