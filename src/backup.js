import React, { useState } from 'react';
import './App.css';

function App(){
    const [Letters, setLetter] = useState([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']])

    function HandleInput(Input){
        let temp = Letters
        temp[0][0] = Input
        setLetter(temp)
        console.log(temp[0][0])
        console.log(Input)
        console.log(Letters[0][0])
    }

    document.onkeydown = (e) => {
        HandleInput(e.key.toUpperCase())
    }
    
    function SpecialKey({ Value }){
        return <button className="keyBoxLong" onClick={() => HandleInput(Value)}>{ Value }</button>
    }
    
    function Keyboard(){
        const Alpha = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L"], ["Z", "X", "C", "V", "B", "N", "M"]]
        const Row = ({i}) => {
            let j = []
            Alpha[i].forEach((e) => {
                j.push(<button id={e} className="keyBox" onClick={() => HandleInput(e)}>{e}</button>)
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
        const [Word] = useState(Letters[Row - 1][Column - 1])

        return(
            <div id={Row + '' + Column} className="box">{ Word }</div>
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
                <button id="title">Wordle</button>
                <section id="game">
                    <Game />
                </section>
                <Tile Row={1} Column={1} />
                <SpecialKey Value={'XX'} />
                <Keyboard />
            </section>
        </>
    );
}

export default App;
