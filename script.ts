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

// StartButton fonction for starting tha game
const homePageButton: HTMLElement | null = document.getElementById("homePageButton")
const homePageInput: HTMLElement | null = document.getElementById("homePageInput")
const homePage: HTMLElement | null = document.querySelector(".homePage")
const quizPage: HTMLElement | null = document.querySelector(".quizContainer")

homePageButton?.addEventListener("click", () =>{
    
    // Save the userName to LocalStorage
    interface currentUserNameInfo {
        userName : string;
    }
    let currentUserName: currentUserNameInfo = {userName : ""}
    let newUserNameValueFromInput: string = (homePageInput as HTMLInputElement)?.value

    Object.assign(currentUserName, {userName : newUserNameValueFromInput});
    let userName: string = currentUserName.userName
    localStorage.setItem("userName", userName)
    
    // Start game button condition 
    if(userName === ""){
        if(homePageInput){
            homePageInput.style.border = "5px red solid"
            setTimeout(()=>{
                homePageInput.style.border = "none"                
            }, 2000)
        }
    }else{
        
        homePage?.classList.add("hide")
        quizPage?.classList.remove("hide")
        quizLoad()
        

    }   

} );


// Quiz Generator 
let currentDataIndex:number = 0
let score: number = 0
const mainQuiz: HTMLElement | null = document.querySelector(".quizMain")
const result:HTMLElement | null = document.querySelector(".result")

function quizLoad(){
    const image: HTMLElement | null = document.querySelector(".headerImage")
    const aText: HTMLElement | null = document.getElementById("aText")
    const bText: HTMLElement | null = document.querySelector("#bText")
    const cText: HTMLElement | null = document.querySelector("#cText")
    const dText: HTMLElement | null = document.querySelector("#dText")

    result?.classList.add("hide")
    mainQuiz?.classList.remove("hide")

    clearRadioButton()

// Clear the html elements 
    if (image && aText && bText && cText && dText) {
        image.innerHTML = '';
        aText.innerHTML = '';
        bText.innerHTML = '';
        cText.innerHTML = '';
        dText.innerHTML = '';
    }
// updating the quiz with new data from data[]
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
    quizTimer()
    
};


// Clear radio buttons selection for a new quiz
function clearRadioButton(){
    const radioInputs:NodeListOf<HTMLInputElement> = document.getElementsByName('answer') as NodeListOf<HTMLInputElement>;

    for(let i = 0 ; i < radioInputs.length ; i++){
        radioInputs[i].checked = false
    }
}

// Timer function 
const timerFunction = {quizTimer : 1000}
let timerCountDown: number ;

function quizTimer(){
    let timer: HTMLElement | null = document.getElementById("timer") 
    let timerNumber: number = 5
    
        timerCountDown = setInterval(()=> {
            if(timer){
            timer.innerHTML = timerNumber.toString()
            timerNumber--
            }
    
            if(timerNumber === -1){
                clearInterval(timerCountDown)
                mainQuiz?.classList.add("hide")
                result?.classList.remove("hide")
                wrongAnswer?.classList.add("hide")
                rightAnswer?.classList.remove("hide")
        
                if(rightAnswer){
                    rightAnswer.innerText = "Time Out"
                }
                
                if(scoreCounter){
                    scoreCounter.innerHTML = `score : ${score}/5`
                }
            }
    
        }, 1000)
    
}


// Checking the input answer
const validButton:HTMLElement | null = document.getElementById("validButton")
const wrongAnswer:HTMLElement | null = document.getElementById("wrong")
const rightAnswer:HTMLElement | null = document.getElementById("bravo")
const scoreCounter: HTMLElement | null = document.getElementById("score")

validButton?.addEventListener("click", () =>{
    const selectedAnswer: any = document.querySelector('input[type = "radio"]:checked') 
    const getuserNameFromLocalStorage: string | null=  localStorage.getItem('userName')    
    
    if( selectedAnswer && selectedAnswer.nextElementSibling.textContent  === data[currentDataIndex].correct){
        clearInterval(timerCountDown)
        mainQuiz?.classList.add("hide")
        result?.classList.remove("hide")
        wrongAnswer?.classList.add("hide")
        rightAnswer?.classList.remove("hide")

        if(rightAnswer){
            rightAnswer.innerText = `Bravo ${getuserNameFromLocalStorage}!`
        }

        score ++
        if(scoreCounter){
            scoreCounter.innerHTML = `score : ${score}/5`
        }
        

    }else if ( selectedAnswer && selectedAnswer.nextElementSibling.textContent  !== data[currentDataIndex].correct) {
        clearInterval(timerCountDown)
        mainQuiz?.classList.add("hide")
        result?.classList.remove("hide")
        rightAnswer?.classList.add("hide")
        wrongAnswer?.classList.remove("hide")
        
        if(wrongAnswer){
            wrongAnswer.innerText = `Wrong ${getuserNameFromLocalStorage}!`
        }

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
})


// Update the quiz data with next Button
const nextButton:HTMLElement | null = document.querySelector(".nextButton")

nextButton?.addEventListener("click", () =>{
    if(currentDataIndex < data.length -1){       
        currentDataIndex ++
        quizLoad()
    }else{
        createLastPagePopUp()    
    }
})


//function => Create a PopUp about the utility of the game when the game is finished
function createLastPagePopUp(){

    const newPopUp = document.createElement("div")
    quizPage?.appendChild(newPopUp)  
    // newPopUp Styles
    newPopUp.style.backgroundColor = "white"
    newPopUp.style.position = "absolute"
    newPopUp.style.width ="30rem"
    newPopUp.style.height="20rem"
    newPopUp.style.borderRadius ="10px"
    newPopUp.style.display="flex"
    newPopUp.style.flexDirection ="column"
    newPopUp.style.alignItems="center"
    newPopUp.style.justifyContent="center"
    newPopUp.style.fontSize ="18px"
    newPopUp.style.fontWeight ="500"

    const newPopUpInsideText = document.createTextNode("Please note that this game is just for entertainment!")
    newPopUp.appendChild(newPopUpInsideText)

    const popUpButton = document.createElement("button")
    newPopUp.appendChild(popUpButton)
    popUpButton.innerText = "OK!"
    // PopUp button styles
    popUpButton.style.padding ="10px 15px"
    popUpButton.style.border ="none"
    popUpButton.style.backgroundColor="Orange"
    popUpButton.style.cursor = "pointer"
    popUpButton.style.marginTop ="2rem"
    popUpButton.style.borderRadius ="5px"
    popUpButton.style.color ="white"

    // PopUp button function
    popUpButton.addEventListener("click", ()=>{

        newPopUp.style.display ="none"

        if(nextButton && wrongAnswer && rightAnswer){
            nextButton.innerText = "Replay!" 
            wrongAnswer.innerText = `Finished, Your score is ${score}/5.`
            rightAnswer.innerText = `Finished, Your score is ${score}/5.`
            wrongAnswer.style.fontSize = "20px"
            rightAnswer.style.fontSize = "20px"
            wrongAnswer.style.color = "black"
            rightAnswer.style.color = "black"
        }

        scoreCounter?.classList.add("hide")
       
        nextButton?.addEventListener("click", () => {
            location.reload()
        })
    })
}
    








