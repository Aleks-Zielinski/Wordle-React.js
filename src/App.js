import React, { useRef, useState } from 'react';
import DATA from './data.js'
import './App.css';
import Links from './links.js';

// Icons
import ResetIcon from './Icons/RESET.png'
import EnterIcon from './Icons/ENTER.png'
import BackspaceIcon from './Icons/BACKSPACE.png'
import DeleteIcon from './Icons/DELETE.png'

const TranslateToIcon = ['RESET', 'ENTER', 'BACKSPACE', 'DELETE']
const IconsSrc = [ResetIcon, EnterIcon, BackspaceIcon, DeleteIcon]
/*
const TranslateToStyle = ['Black', 'Yellow', 'Green']
const AnimationStyles = ['BlackAnimation', 'YellowAnimation', 'GreenAnimation']*/

function Choice(){
    let i = Math.floor(Math.random() * DATA.length)
    return DATA[i].toUpperCase()
}

let Pass = Choice()
const Name = 'Wördlé'
const Array6x5 = [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]
const Array26 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
const Alpha = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]
const Alpha2 = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L"], ["Z", "X", "C", "V", "B", "N", "M"]]

function App(){
    const [Letters, setLetters] = useState(Array6x5)
    const [Styles, setStyles] = useState(Array6x5)
    const [KeyStyles, setKeyStyles] = useState(Array26)
    const [Round, setRound] = useState(0)
    const [WordLen, setWordLen] = useState(0)
    const [Title, setTitle] = useState(Name)
    const [Popup, setPopup] = useState('')

    const ResetRef = useRef(null)

    function Reset(){
        Pass = Choice()
        setRound(0)
        setWordLen(0)
        setTitle(Name)
        setPopup('')
        setLetters([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']])
        setStyles([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']])
        setKeyStyles(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    }

    document.onkeydown = (e) => {
        HandleInput(e.key.toUpperCase())
    }

    function HandleInput(Input){
        if(Input === 'RESET'){
            Reset()
            return
        }
        if(Round === 6){
            return
        }
        if(Input === 'ENTER'){
            const WORD = () => {
                let text = ''
                for(let i = 0; i < 5; i++){
                    text += Letters[Round][i]
                }
                return text.toLowerCase()
            }

            if(WordLen === 5){
                if(!DATA.includes(WORD())){
                    if(Popup.length === 0){
                        setPopup(<div id='Popup'>Not in word list!</div>)
                        setTimeout(() => {
                            setPopup('')
                        }, 6000)
                    }
                    return
                }
                let guess = [0, 0, 0, 0, 0]
                let newStyles = Styles
                newStyles[Round] = ['Black', 'Black', 'Black', 'Black', 'Black']
                let newKeyStyles = KeyStyles
                let word = Letters[Round]
                for(let i = 0; i < 5; i++){
                    for(let j = 0; j < 5; j++){
                        if(Pass[i] === word[j]){
                            if(guess[j] !== 1){
                                if(i === j){
                                    newStyles[Round][i] = 'Green'
                                    guess[i] = 1
                                }
                                else{
                                    newStyles[Round][j] = 'Yellow'
                                    guess[j] = 2
                                }
                            }
                        }
                    }
                }
                for(let i = 0; i < 5; i++){
                    let Index = Alpha.indexOf(word[i])
                    let Style = newStyles[Round][i]
                    if(Style === 'Green'){
                        newKeyStyles[Index] = Style
                    }
                    else if(Style === 'Yellow' && newKeyStyles[Index] !== 'Green'){
                        newKeyStyles[Index] = Style
                    }
                    else if(Style === 'Black' && newKeyStyles[Index] === ''){
                        newKeyStyles[Index] = Style
                    }
                }
                setStyles(newStyles => [...newStyles, `${newStyles.length}`])
                setKeyStyles(newKeyStyles => [...newKeyStyles, `${newKeyStyles.length}`])

                setRound(Round + 1)
                setWordLen(0)
                setPopup('')
                if(guess[0] === 1 && guess[1] === 1 && guess[2] === 1 && guess[3] === 1 && guess[4] === 1){
                    setTitle(Pass.toString() + '!')
                    setPopup('')
                    setPopup(<div id='Popup'>You won!</div>)
                        setTimeout(() => {
                            setPopup('')
                        }, 6000)
                    setRound(6)
                    return
                }
                if(Round === 5){
                    setTitle(Pass.toString() + '!')
                    setPopup('')
                    setPopup(<div id='Popup'>{Pass.toString() + '!'}</div>)
                        setTimeout(() => {
                            setPopup('')
                        }, 6000)
                    setRound(6)
                }
            }
            return
        }
        if(Input === 'BACKSPACE'){
            if(WordLen !== 0){
                let Array = Letters
                Array[Round][WordLen - 1] = ''
                setLetters(Array => [...Array, `${Array.length}`])
                setWordLen(WordLen - 1)
            }
            return
        }
        if(Input === 'DELETE'){
            if(WordLen !== 0){
                let Array = Letters
                Array[Round] = ['', '', '', '', '']
                setLetters(Array => [...Array, `${Array.length}`])
                setWordLen(0)
            }
            return
        }
        if(!Alpha.includes(Input)){
            return
        }

        if(WordLen !== 5){
            let Array = Letters
            Array[Round][WordLen] = Input
            setLetters(Array => [...Array, `${Array.length}`])
            setWordLen(WordLen + 1)
        } 
    }
    
    function Keyboard(){
        const Row = ({i}) => {
            let j = []
            Alpha2[i].forEach((e) => {
                let Index = Alpha.indexOf(e)
                j.push(<button id={e} className={ KeyStyles[Index] } onClick={() => HandleInput(e)}>{e}</button>)
            })
            return(j)
        }
        const KeyImg = (i) => {
            const Ref = useRef(null)
            let index = TranslateToIcon.indexOf(i.i)
            return(
                <button id='KeyImg' onClick={() => HandleInput(i.i)} ref={Ref}>
                        <img src={IconsSrc[index]} alt={i.i + ' icon'} onClick={() => Ref.current.blur()} />
                </button>
            )
        }
        return(
            <section id="keyboard">
                <section id="keyRow">
                    <Row i={0} />
                    <KeyImg i='BACKSPACE' />
                </section>
                <section id="keyRow">
                    <Row i={1} />
                    <KeyImg i='ENTER' />
                </section>
                <section id="keyRow">
                    <Row i={2} />
                    <KeyImg i='DELETE' />
                </section>
            </section>
        )
    }
    
    function Game({i = 7}){
        function Row({RowNumber}){
            function Tile({Row, Column}){
                const Word = Letters[Row - 1][Column - 1]
                const Style = Styles[Row - 1][Column - 1]
        
                return(
                    <div id={ Row + '' + Column } className={ Style }>{ Word }</div>
                )
            }
            const RowFor = (({Index}) => {
                let k = []
                for(let j = 1; j < 6; j++){
                    k.push(<Tile Row={Index} Column={j} />)
                }
                return(k)
            })
            return(
                <section id="row">
                    <RowFor Index={RowNumber} />
                </section>
            )
        }
        let j = []
        for(let k = 1; k < i; k++){
            j.push(<Row RowNumber={k} />)
        }
        return j
    }

    return (
        <>
            <section id="main">
                <header>
                    <h1 id="title">{ Title }</h1>
                    <button onClick={() => Reset()} ref={ResetRef}>
                        <img src={ResetIcon} alt='Reset icon' onClick={() => ResetRef.current.blur()} />
                    </button>
                </header>
                <section id="game">
                    { Popup }
                    <Game />
                </section>
                <Keyboard />
                <Links />
            </section>
        </>
    );
}

export default App;
