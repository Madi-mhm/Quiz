interface dataInfo{
    img : string;
    a : string;
    b : string;
    c : string;
    d : string;
    correct : string;
}
let data: dataInfo[] = [
    {
        img : "",
        a : "France", 
        b : "Suéde",
        c : "Norvege",
        d : "Allemagne", 
        correct : "France"
    },
    {
        img : "",
        a : "États-Unis", 
        b : "Suéde",
        c : "Norvege",
        d : "Allemagne", 
        correct : "Suéde"
    },
    {
        img : "",
        a : "France", 
        b : "États-Unis",
        c : "Norvege",
        d : "Italie", 
        correct : "Norvege"
    },
    {
        img : "",
        a : "Italie", 
        b : "Suéde",
        c : "Norvege",
        d : "France", 
        correct : "Italie"
    },
    {
        img : "",
        a : "États-Unis", 
        b : "Iran",
        c : "Italie",
        d : "Allemagne", 
        correct : "États-Unis"
    },
]
const imageURL: string[]= [
"https://www.larousse.fr/encyclopedie/data/images/1009493-Drapeau_de_la_France.jpg",
"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/1280px-Flag_of_Sweden.svg.png",
"https://uneblondeennorvege.com/wp-content/uploads/2016/01/4-1024x745.png",
"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/2560px-Flag_of_Italy.svg.png",
"https://img.freepik.com/premium-vector/flag-usa-united-states-america-background_53500-169.jpg?w=2000"
]
for(let i = 0 ; i < data.length ; i++){
    data[i].img = imageURL[i]
}

const homePageButton = document.getElementById("homePageButton")
const homePage = document.querySelector(".homePage")
const quizPage = document.querySelector(".quizContainer") 

const image = document.querySelector(".headerImage")
const question = document.getElementsByClassName("question")
const answerOptions = document.getElementsByClassName("answer")
const aText = document.getElementById("aText")
const bText = document.querySelector("#bText")
const cText = document.querySelector("#cText")
const dText = document.querySelector("#dText")
const validButton = document.getElementById("validButton")


// StartButton Action in Home Page
homePageButton?.addEventListener("click", () =>{
   homePage?.classList.add("hide")
   quizPage?.classList.remove("hide")
} );



// Quiz Generator 
let currentDataIndex:number = 0
let score: number = 0

function quizLoad(){
    const loadQuizData: dataInfo = data[currentDataIndex]

    if (image && aText && bText && cText && dText) {
        
        const img = document.createElement('img');
        img.src = loadQuizData.img;
        image.appendChild(img);
        aText.innerHTML = loadQuizData.a
        bText.innerHTML = loadQuizData.b
        cText.innerHTML = loadQuizData.c
        dText.innerHTML = loadQuizData.d        
    }
}
quizLoad()

function checkAnswer(){

    let selectedAnswer: any = document.querySelector('input[type = "radio"]:checked')

    if( selectedAnswer && selectedAnswer.nextElementSibling.textContent  === data[currentDataIndex].correct){
        console.log("yes")
    } else {
        console.log("no") 
        
    }    
}


validButton?.addEventListener("click", checkAnswer)

