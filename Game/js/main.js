const modal = document.querySelector(".modal")
const btn = document.querySelector(".btn")
const tryAgain = document.querySelector(".try")
const text = document.querySelector(".text")
const input =document.querySelector(".input")
const gameTime =document.querySelector(".time")
const right1 =document.querySelector(".right1")
const yourResult =document.querySelector(".your_result")
const select = document.querySelector(".select")
const highScore = document.querySelector(".high_score")


var api_link ="https://random-word-api.herokuapp.com/word"


const getData = async (api)=>{
    const req =await fetch(api)
    const data = await req.json()
    randomText=data[0]
    writeWord(randomText)
}


getData(api_link)




var time =10
var score =0
var level = localStorage.getItem("level")?localStorage.getItem("level"):"easy"
var record = localStorage.getItem("record")? localStorage.getItem("record") : 0

var randomText
var writeWord =()=>{
    text.textContent=randomText
    highScore.textContent=record
    select.value=level
    console.log(randomText);
}
writeWord()

input.addEventListener("input", ()=>{
    
    if (input.value ==randomText) {
        console.log("dbdsn");
        writeWord(randomText)
        getData(api_link)
        input.value=""
        score++
        right1.innerHTML=`
        <h3>score:</h3><span class="score">${score}</span>`
       if (level=="easy") {
        time=time+5
        gameTime.innerHTML+=`+5`
       }
       else   if (level=="medium") {
        time=time+3
        gameTime.innerHTML+=`+3`
       }
       else   if (level=="hard") {
        time=time+2
        gameTime.innerHTML+=`+2`
       }
    }
})
// tryAgain.addEventListener("click", ()=>{
//     modal.classList.remove("active")
// })
var interval=setInterval(() => {
    time--
    gameTime.textContent=time
    if (time==0) {
        clearInterval(interval)
    modal.classList.add("active")
    }
    if (score>record) {
        localStorage.setItem("record", score)
    }
    
    yourResult.innerHTML=`
    ${score}`
}, 1000);

select.addEventListener("change", ()=>{
    localStorage.setItem("level", select.value)
    level= localStorage.getItem("level")
})


