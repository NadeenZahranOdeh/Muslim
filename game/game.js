let score = 0
let step = 0
let timer = 40
let position = 40
let timerInterval

const questions = [

{
q:"How many conditions are required for a valid Salah?",
a:["Seven","Nine","Five"],
c:1
},

{
q:"Which is the first condition?",
a:["Islam","Facing Qiblah","Intention"],
c:0
},

{
q:"What does purification from Hadath mean?",
a:["Wudu or Ghusl","Prayer time","Covering Awrah"],
c:0
},

{
q:"What does covering Awrah mean?",
a:["Covering private parts","Cleaning clothes","Facing Qiblah"],
c:0
},

{
q:"Which condition means facing the Kaaba?",
a:["Intention","Qiblah","Sanity"],
c:1
}

]

function startGame(){

document.getElementById("welcome").style.display="none"
document.getElementById("game").style.display="block"

showQuestion()
startTimer()

}

function startTimer(){

timer=40

timerInterval=setInterval(()=>{

timer--

document.getElementById("timer").innerText="⏱ "+timer

if(timer<=0){

alert("Time is up!")

timer=40

}

},1000)

}

function showQuestion(){

if(step>=questions.length){

endGame()
return

}

let q = questions[step]

document.getElementById("question").innerText=q.q

let html=""

q.a.forEach((ans,i)=>{

html+=`<div class="answer" onclick="checkAnswer(${i})">${ans}</div>`

})

document.getElementById("answers").innerHTML=html

}

function checkAnswer(i){

if(i===questions[step].c){

score+=10

document.getElementById("score").innerText="⭐ Score: "+score

moveSheikh()

updateProgress()

showStar()

document.getElementById("speech").innerText="Great! Keep going!"

step++

showQuestion()

}

else{

document.getElementById("speech").innerText="Oops! Try again."

}

}

function moveSheikh(){

position+=120

document.getElementById("sheikh").style.left=position+"px"

}

function updateProgress(){

let progress=(step/questions.length)*100

document.getElementById("progressBar").style.width=progress+"%"

}

function showStar(){

let star=document.createElement("img")

star.src="assets/star.jpg"

star.className="star"

star.style.left=(position+20)+"px"

star.style.bottom="140px"

document.querySelector(".gameArea").appendChild(star)

setTimeout(()=>star.remove(),1000)

}

function endGame(){

clearInterval(timerInterval)

document.getElementById("game").style.display="none"

document.getElementById("win").style.display="block"

}

