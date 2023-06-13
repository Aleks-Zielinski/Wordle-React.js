import React, { useState, useRef } from 'react';
import DATA from './data.js'
import './App.css';
import Links from './links.js';

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
    const ResetRef = useRef(null)

    function Reset(){
        Pass = Choice()
        setRound(0)
        setWordLen(0)
        setTitle(Name)
        setLetters([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']])
        setStyles([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']])
        setKeyStyles(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
        ResetRef.current.blur()
    }

    function HandleInput(Input){
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
                    setTitle('Not in word list')
                    setTimeout(() => {
                        setTitle(Name)
                    }, 1000)
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
                if(guess[0] === 1 && guess[1] === 1 && guess[2] === 1 && guess[3] === 1 && guess[4] === 1){
                    setTitle('You won! Click here to start new game!')
                    setRound(6)
                    return
                }
                if(Round === 5){
                    setTitle(Pass.toString() + '! Click here to start new game!')
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

    document.onkeydown = (e) => {
        HandleInput(e.key.toUpperCase())
    }
    
    function SpecialKey({ Value }){
        return <button className="keyBoxLong" onClick={() => HandleInput(Value)}>{ Value }</button>
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
        return(
            <section id="keyboard">
                <section id="keyRow">
                    <Row i={0} />
                    <SpecialKey Value={'BACKSPACE'} />
                </section>
                <section id="keyRow">
                    <Row i={1} />
                    <SpecialKey Value={'ENTER'} />
                </section>
                <section id="keyRow">
                    <Row i={2} />
                </section>
            </section>
        )
    }

    function Tile({Row, Column}){
        const Word = Letters[Row - 1][Column - 1]
        const Style = Styles[Row - 1][Column - 1]

        return(
            <div id={ Row + '' + Column } className={ Style }>{ Word }</div>
        )
    }
    
    function Row({RowNumber}){
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
    
    function Game({i = 7}){
        let j = []
        for(let k = 1; k < i; k++){
            j.push(<Row RowNumber={k} />)
        }
        return j
    }

    return (
        <>
            <section id="main">
                <button id="title" onClick={ () => Reset() } ref={ ResetRef }>{ Title }</button>
                <section id="game">
                    <Game />
                </section>
                <Keyboard />
            </section>
            <Links />
        </>
    );
}

export default App;
