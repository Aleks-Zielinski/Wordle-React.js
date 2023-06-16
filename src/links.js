import React, { useState, useRef } from "react";
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
const IconsLink = 'https://www.instagram.com/m.jaszcz1/' 

function Links(){
    const [GitHubSrc, setGitHubSrc] = useState(WhiteIconGitHub)
    const [DiscordSrc, setDiscordSrc] = useState(WhiteIconDiscord)
    const [EmailSrc, setEmailSrc] = useState(WhiteIconEmail)
    const GithubIcon = useRef(null)
    const DiscordIcon = useRef(null)
    const EmailIcon = useRef(null)
    return(
        <>
            <section id="LinksRow">
                <a href="https://github.com/Aleks-Zielinski/Wordle-React.js" target="noreferrer" ref={GithubIcon}>
                    <img src={GitHubSrc} alt="Github icon"
                        onMouseOver={() => setGitHubSrc(GreyIconGitHub)} 
                        onMouseOut={() => setGitHubSrc(WhiteIconGitHub)}
                        onClick={() => GithubIcon.current.blur()} />
                </a>
                <a href="https://discord.com/users/295254892690407426" target="noreferrer" ref={DiscordIcon}>
                    <img src={DiscordSrc} alt="Discord icon" 
                        onMouseOver={() => setDiscordSrc(GreyIconDiscord)} 
                        onMouseOut={() => setDiscordSrc(WhiteIconDiscord)}
                        onClick={() => DiscordIcon.current.blur()} />
                </a>
                <a href="mailto:alekszielinski01@gmail.com" target="noreferrer" ref={EmailIcon}>
                    <img src={EmailSrc} alt="Email icon" 
                        onMouseOver={() => setEmailSrc(GreyIconEmail)} 
                        onMouseOut={() => setEmailSrc(WhiteIconEmail)}
                        onClick={() => EmailIcon.current.blur()} />
                </a>
            </section>
            <section id="CreditsRow">
                <b>Credits: </b>
                <a href={WordleLink} target="noreferrer">Original game</a>
                <span>, </span>
                <a href={WordListLink} target="noreferrer">List of 14855 words</a>
                <span>, </span>
                <a href={IconsLink} target="noreferrer">Icons</a>
            </section>
        </>
    )
}

export default Links