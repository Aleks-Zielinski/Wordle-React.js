let word = []
let round = 1
let WORD = Choice()
let guess = [0, 0, 0, 0, 0]
let alpha = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]

document.onkeydown = (e) => {
    keyboardClick(e.key.toUpperCase())
}

function keyboardClick(i){
    if(i.toLowerCase() == i){
        return
    }

    if(i == 'ENTER'){
        CheckWord()
    }
    if(i == 'BACKSPACE'){
        DeleteLetter()
    }
    if(i.length == 1){
        AddLetter(i)
    }
}

function CheckWord(){
    if(round == 7){
        return
    }

    if(word.length != 5){
        alert('Word is not 5 letters long!')
        return
    }

    let Tword = ''
    for(i = 0; i < 5; i++){
        Tword += word[i]
    }
    if(!DATA.includes(Tword.toLowerCase())){
        alert(`This word does not exist!`)
        return
    }

    for(i = 0; i < 5; i++){
        let flag = false
        if(word[i] == WORD[i]){
            document.getElementById(`${round}${i+1}`).style.backgroundColor = 'green'
            document.getElementById(`${word[i]}`).style.backgroundColor = 'green'
            guess[i] = 1
            continue
        }
        for(j = 0; j < 5; j++){
            if(word[i] == WORD[j]){
                document.getElementById(`${round}${i+1}`).style.backgroundColor = 'darkgoldenrod'
                document.getElementById(`${word[i]}`).style.backgroundColor = 'darkgoldenrod'
                flag = true
                break
            }
        }
        if(!flag){
            document.getElementById(`${round}${i+1}`).style.backgroundColor = 'rgb(40,40,40)'
            document.getElementById(`${word[i]}`).style.backgroundColor = 'rgb(40,40,40)'
        }
    }
    for(i = 0; i < 5; i++){
        if(guess[i] == 1){
            document.getElementById(`${WORD[i]}`).style.backgroundColor = 'green'
        }
    }
    round++
    word = []
    if(guess[0] == 1 && guess[1] == 1 && guess[2] == 1 && guess[3] == 1 && guess[4] == 1){
        Winner()
    }
    else if(round == 7){
        Lost()
    }
}

function DeleteLetter(){
    if(word.length == 0){
        return
    }

    word.pop()

    document.getElementById(`${round}${word.length + 1}`).innerHTML = ''
}

function AddLetter(letter){
    if(word.length == 5){
        return
    }

    word.push(letter)

    document.getElementById(`${round}${word.length}`).innerHTML = letter
}

function Winner(){
    round = 10
    word = ''
    document.getElementById('title').innerHTML = 'You won! Click here to start new game!'
    return
}

function Lost(){
    round = 10
    word = ''
    for(i = 0; i < 5; i++){
        word += WORD[i]
    }
    document.getElementById('title').innerHTML = `${word}! Click here to start new game!`
}

function Reset(){
    word = []
    round = 1
    WORD = Choice()
    guess = [0, 0, 0, 0, 0]

    for(i = 0; i < 6; i++){
        for(j = 0; j < 5; j++){
            document.getElementById(`${i+1}${j+1}`).style.backgroundColor = 'rgb(90,90,90)'
            document.getElementById(`${i+1}${j+1}`).innerHTML = ''
        }
    }

    alpha.forEach((e) => {
        document.getElementById(`${e}`).style.backgroundColor = 'rgb(90,90,90)'
    })

    document.getElementById('title').innerHTML = 'Wordle'
    document.getElementById('title').blur()
}

function Choice(){
    i = Math.floor(Math.random() * DATA.length)
    return DATA[i].toUpperCase()
}