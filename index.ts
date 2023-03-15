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

const homePageButton: HTMLElement | null = document.getElementById("homePageButton")
const homePage: HTMLElement | null = document.querySelector(".homePage")
const quizPage: HTMLElement | null = document.querySelector(".quizContainer") 
const mainQuiz: HTMLElement | null = document.querySelector(".quizMain")
const image: HTMLElement | null = document.querySelector(".headerImage")
const aText: HTMLElement | null = document.getElementById("aText")
const bText: HTMLElement | null = document.querySelector("#bText")
const cText: HTMLElement | null = document.querySelector("#cText")
const dText: HTMLElement | null = document.querySelector("#dText")
const validButton:HTMLElement | null = document.getElementById("validButton")
const result:HTMLElement | null = document.querySelector(".result")
const wrongAnswer:HTMLElement | null = document.getElementById("wrong")
const rightAnswer:HTMLElement | null = document.getElementById("bravo")
const nextButton:HTMLElement | null = document.querySelector(".nextButton")
const scoreCounter: HTMLElement | null = document.getElementById("score")


// StartButton Action in Home Page
homePageButton?.addEventListener("click", () =>{
   homePage?.classList.add("hide")
   quizPage?.classList.remove("hide")
   quizLoad()

} );


// Quiz Generator 
let currentDataIndex:number = 0
let score: number = 0

function quizLoad(){

    clearRadioButton()

// Clear the html elements 
    if (image && aText && bText && cText && dText) {
        image.innerHTML = '';
        aText.innerHTML = '';
        bText.innerHTML = '';
        cText.innerHTML = '';
        dText.innerHTML = '';
    }
// updating the quiz with a new data object from data[]
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


// Clear radio button selections for a new quiz
function clearRadioButton(){
    const radioInputs:NodeListOf<HTMLInputElement> = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;

    for(let i = 0 ; i < radioInputs.length ; i++){
        radioInputs[i].checked = false
    }
}

validButton?.addEventListener("click", checkAnswer)

// Checking the input answer
function checkAnswer(){
    const selectedAnswer: any = document.querySelector('input[type = "radio"]:checked') 

    if( selectedAnswer && selectedAnswer.nextElementSibling.textContent  === data[currentDataIndex].correct){
        mainQuiz?.classList.add("hide")
        result?.classList.remove("hide")
        wrongAnswer?.classList.add("hide")
        rightAnswer?.classList.remove("hide")

        score ++
        if(scoreCounter){
            scoreCounter.innerHTML = `score : ${score}/5`
        }

    }else if ( selectedAnswer && selectedAnswer.nextElementSibling.textContent  !== data[currentDataIndex].correct) {
        mainQuiz?.classList.add("hide")
        result?.classList.remove("hide")
        rightAnswer?.classList.add("hide")
        wrongAnswer?.classList.remove("hide")
        
        if(scoreCounter){
            scoreCounter.innerHTML = `score : ${score}/5`
        }

    }else{
        const errorMessage: HTMLElement | null = document.getElementById("errorMessage")
        errorMessage?.classList.remove("hide")
        setTimeout(() => {
            errorMessage?.classList.add("hide")
        }, 2000)
        
    }
}


// Updating the quiz after answer check, score update by clicking next button

nextButton?.addEventListener("click", nextButtonHandel)

function nextButtonHandel(){
    if(currentDataIndex < data.length){
        result?.classList.add("hide")
        mainQuiz?.classList.remove("hide")
        currentDataIndex ++
        quizLoad()
    }else{
        mainQuiz?.classList.add("hide")        
    }
}
