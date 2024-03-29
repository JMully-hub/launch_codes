const launchButton = document.getElementById('launch_button');
const rocket = document.getElementById('rocket');
const countDownTimerContainer = document.getElementById('countDownTimer_container');
const countDownTimerText = document.getElementById('countDownTimer_p');
const countDownAudio = new Audio('countDown.wav');
const rocketNoise = new Audio('rocketNoise.wav');
const settingsForm = document.getElementById('settings');
const settingsButton = document.getElementById('generate');
const maxNumberInput = document.getElementById('maxNumber');
const sumLines = document.getElementsByClassName('sumLine');
const childsNameInput = document.getElementById('childNameInput');
const childName_p = document.getElementById('childName_p');

var siteWidth = 1280;
var scale = screen.height / siteWidth;

document.querySelector('meta[name="viewport"]').setAttribute('content', `width=device-width, initial-scale=${scale}`);

const delay = ms => new Promise(res => setTimeout(res, ms));

const startCountdown = async () => {
    countDownAudio.play();
    launchButton.setAttribute('disabled', '')
    await delay(6100);
    rocket.setAttribute('src', 'rocket2.webp');
    rocketNoise.play();
    rocket.style.animation = "flyRocket 10s 0.5s ease-in";
    childName_p.style.animation = "flyName 10s 0.5s ease-in";
    await delay(10500);
    launchButton.removeAttribute('disabled');
  };


const countDownDisplay = async () => {
    let countDownStart = 5
    countDownTimerContainer.style.display = 'flex';
    for (let index = countDownStart; index >= 0; index--) {
        countDownTimerText.innerText = index
        await delay(1100);
    }
    countDownTimerText.innerText = 'Lift Off'
    
  };

function checkForm(){
    let maxNumber = maxNumberInput.value;
    if(maxNumber<10 | isNaN(maxNumber)){
        document.getElementById('maxNumber').setAttribute('style', 'background-color: #e05b56;');
        return;
    }else{
        document.getElementById('maxNumber').setAttribute('style', 'background-color: white;');
    }
    
    checkBoxSelected = checkBoxInfo();
    if(checkBoxSelected.length>0){return true};
}


function checkBoxInfo(){
    let checkBoxes = document.getElementsByClassName('checkbox');
    let checkBoxSelected = []
    for (let index = 0; index < checkBoxes.length; index++) {
        if(checkBoxes[index].checked && checkBoxes[index].id !== "random_blanks"){
            checkBoxSelected.push(checkBoxes[index].value)
        }
    }
    return checkBoxSelected;
}


function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        parent.removeAttribute('layout');
    }
}

function appendLayouts(lineNumber, layoutFormat){
    let parentElement = null;
    let position_a = null;
    let position_b = null;
    let position_c = null;
    let operator_position = null;
    switch(layoutFormat){
        case 0:
            parentElement = document.getElementById(`line${lineNumber}`)
            parentElement.setAttribute('layout', 'a');

            position_a = parentElement.appendChild(document.createElement("input"));
            position_a.setAttribute('type', 'number')
            position_a.setAttribute('id', `line${lineNumber}_numInput`);
            position_a.setAttribute('class', 'numInput');
            position_a.setAttribute('autocomplete', 'off');

            operator_position = parentElement.appendChild(document.createElement("p"));
            operator_position.setAttribute('id', `line${lineNumber}_operator`);
            operator_position.innerText = sumsObj[`line${lineNumber}_op`];

            position_b = parentElement.appendChild(document.createElement("p"));
            position_b.setAttribute('id', `line${lineNumber}_knownVar_b`);
            position_b.innerText = sumsObj[`line${lineNumber}_b`];

            parentElement.appendChild(document.createElement("p")).innerText = '=';

            position_c = parentElement.appendChild(document.createElement("p"));
            position_c.setAttribute('id', `line${lineNumber}_answer`);
            position_c.innerText = sumsObj[`line${lineNumber}_c`];
            break;
        case 1:
            parentElement = document.getElementById(`line${lineNumber}`)
            parentElement.setAttribute('layout', 'b');

            position_a = parentElement.appendChild(document.createElement("p"));
            position_a.setAttribute('id', `line${lineNumber}_knownVar_a`);
            position_a.innerText = sumsObj[`line${lineNumber}_a`];

            operator_position = parentElement.appendChild(document.createElement("p"));
            operator_position.setAttribute('id', `line${lineNumber}_operator`);
            operator_position.innerText = sumsObj[`line${lineNumber}_op`];
            
            position_b = parentElement.appendChild(document.createElement("input"));
            position_b.setAttribute('type', 'number')
            position_b.setAttribute('id', `line${lineNumber}_numInput`);
            position_b.setAttribute('class', 'numInput');
            position_b.setAttribute('autocomplete', 'off');

            parentElement.appendChild(document.createElement("p")).innerText = '=';

            position_c = parentElement.appendChild(document.createElement("p"));
            position_c.setAttribute('id', `line${lineNumber}_answer`);
            position_c.innerText = sumsObj[`line${lineNumber}_c`];
            break;
        case 2:
            parentElement = document.getElementById(`line${lineNumber}`);
            parentElement.setAttribute('layout', 'c');

            position_a = parentElement.appendChild(document.createElement("p"));
            position_a.setAttribute('id', `line${lineNumber}_knownVar_a`);
            position_a.innerText = sumsObj[`line${lineNumber}_a`];

            operator_position = parentElement.appendChild(document.createElement("p"));
            operator_position.setAttribute('id', `line${lineNumber}_operator`);
            operator_position.innerText = sumsObj[`line${lineNumber}_op`];

            position_b = parentElement.appendChild(document.createElement("p"));
            position_b.setAttribute('id', `line${lineNumber}_knownVar_b`);
            position_b.innerText = sumsObj[`line${lineNumber}_b`];

            parentElement.appendChild(document.createElement("p")).innerText = '=';

            position_c = parentElement.appendChild(document.createElement("input"));
            position_c.setAttribute('type', 'number')
            position_c.setAttribute('id', `line${lineNumber}_numInput`);
            position_c.setAttribute('class', 'numInput');
            position_c.setAttribute('autocomplete', 'off');
            break;
    }
}


function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}


function mathsEquations(lineNumber, operatorList){
    let operator = operatorList[lineNumber];
    let var_a = null;
    let var_b = null;
    let answer = null;
    let min = null;
    let max = null;
    let hasFactors = false;

    switch(operator){
        case "+":
            min = Math.floor(maxNumber.value / 2) + 1;
            max = maxNumber.value;
            answer = getRandom(min, max);

            min = 1;
            max = answer - 1;
            var_a = answer - getRandom(min, max);

            var_b = answer - var_a;
            break;

        case "-":
            min = 1;
            max = Math.floor(maxNumber.value / 2) + 1;
            answer = getRandom(min, max)

            min = 1;
            max = Math.floor(maxNumber.value / 2);
            var_a = answer + getRandom(min, max)

            var_b = var_a - answer
            break;
        case "×":
            // make sure number is not prime and has factors
            while (!hasFactors) {
                min = Math.floor(maxNumber.value / 2) + 1;
                max = maxNumber.value;
                answer = getRandom(min, max);
                for(let factor = 2; factor < answer; factor++) {
                    if(answer % factor == 0) {
                        hasFactors = true;
                        var_a = factor;
                        break;
                    }
                }
            }
            var_b = answer / var_a;
            break;
        case "÷":
            // make sure number is not prime and has factors
            while (!hasFactors) {
                min = Math.floor(maxNumber.value / 2) + 1;
                max = maxNumber.value;
                var_a = getRandom(min, max);
                for(let factor = 2; factor < var_a; factor++) {
                    if(var_a % factor == 0) {
                        hasFactors = true;
                        var_b = factor;
                        break;
                    }
                }
            }
            answer = var_a / var_b;
            break;
    }
    sumsObj[`line${lineNumber}_a`] = var_a;
    sumsObj[`line${lineNumber}_b`] = var_b;
    sumsObj[`line${lineNumber}_c`] = answer;
    sumsObj[`line${lineNumber}_op`] = operator;
}

function checkSumExists(index){
    for (let checkIndex = 0; checkIndex < 4; checkIndex++) {
        if(checkIndex !== index){
            if(sumsObj[`line${checkIndex}_a`] === sumsObj[`line${index}_a`] && sumsObj[`line${checkIndex}_b`] === sumsObj[`line${index}_b`] && sumsObj[`line${checkIndex}_c`] === sumsObj[`line${index}_c`]){
                return true;
            }
        }
    }
    return false;
}

function makeSums(){
    // clear old sum lines
    let allSumLines = document.getElementsByClassName('sumLine');
    for (let index = 0; index < allSumLines.length; index++) {
        removeAllChildNodes(allSumLines[index])};
    
    // generate operators
    let checkBoxSelected = checkBoxInfo();
    let operatorList = [];
    let validIndex = [];
    for (let index = 0; index < 4; index++) {
        if(checkBoxSelected[index] !== undefined){
            operatorList.push(checkBoxSelected[index])
            validIndex.push(index)
        }else{
            // choose random checkbox operator from checked boxes
            operatorList.push(operatorList[Math.floor(Math.random()*validIndex.length)])
        }};
    
    let randomPositions = document.getElementById("random_blanks");
    let layoutArray = [] // index 0 is 1st line, index 1 is second line etc
    if(randomPositions.checked){
        // chose random layout, 1 text entry box per sum, either in position 1, 2 or 3 (1 + 2 = 3) 
        for (let index = 0; index < 4; index++) {
            layoutArray.push(Math.floor(Math.random()*3))};
    }else{
        layoutArray = [2,2,2,2]
    }
    // work out maths values
    for (let index = 0; index < 4; index++) {
        mathsEquations(index, operatorList)
        let sumExists = checkSumExists(index);
        while(sumExists === true){
            mathsEquations(index, operatorList);
            sumExists = checkSumExists(index);
        }
    }
    

    // append layouts to DOM
    for (let index = 0; index < 4; index++) {
        appendLayouts(index, layoutArray[index])
    }
    

    // remove key scrolling from num input boxes
    let generatedBoxes = document.getElementsByClassName('numInput');
    for (let i = 0; i < generatedBoxes.length; i++) {
        generatedBoxes[i].addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
            }})
        
    }
    
        
}

function checkCorrectAnswers(){
    for (let i = 0; i < 4; i++) {
        if(sumsObj[`line${i}_Ans`] === null){
        launchButton.setAttribute('disabled', '')
        return;
        }
    }
    launchButton.removeAttribute('disabled');
}
  



window.onload = function(){

    rocket.setAttribute('src', 'rocket1.webp');

    countDownTimerContainer.style.display = 'none';
    
    rocket.addEventListener("animationend", () =>{
        rocket.setAttribute('src', 'rocket1.webp');
        rocket.style.animation = "";
        childName_p.style.animation = "";
        countDownTimerContainer.style.display = 'none';
        for (let i = 0; i < sumLines.length; i++) {
            sumLines[i].setAttribute('style', 'display:flex;')
        }
    })
    

    for (let i = 0; i < sumLines.length; i++) {
        sumLines[i].addEventListener('change', (e)=>{
            let layout = e.target.parentElement.getAttribute('layout');
            let div_id = e.target.parentElement.getAttribute('id');
              
            if(sumsObj[`${div_id}_${layout}`] == e.target.value){
                e.target.setAttribute('style', 'background-color:lightgreen;')
                sumsObj[`${div_id}_Ans`] = true;
                
                document.getElementById(`${div_id}_code_output`).setAttribute('style', 'color: #228b22;text-shadow: 0 0 5px #40b85a;border: 5px solid #0cdd39;');
                document.getElementById(`${div_id}_code_output`).innerText = e.target.value;
            }else{
                e.target.setAttribute('style', 'background-color:white;')
                sumsObj[`${div_id}_Ans`] = null;
                document.getElementById(`${div_id}_code_output`).setAttribute('style', 'color: #d12323;text-shadow: 0 0 5px #b84440;border: 5px solid #d12323;');
                document.getElementById(`${div_id}_code_output`).innerText = '-';
            }
            checkCorrectAnswers();
        })
        
    }


    launchButton.addEventListener('mouseup', () =>{
        if (launchButton.getAttribute('disabled') === null){
            for (let i = 0; i < sumLines.length; i++) {
                sumLines[i].setAttribute('style', 'display:none;')
            }
            
            startCountdown();
            countDownDisplay();
        }
    })

    settingsForm.addEventListener('change', () =>{
        settingsButton.setAttribute('disabled', '')
        let formComplete = checkForm();
        if(formComplete){
            settingsButton.removeAttribute('disabled')
        };
        if(childsNameInput.value){
            childName_p.innerHTML = 'Captain<br>' + childsNameInput.value;
        }
    });

    document.getElementById('sumsArea').addEventListener('keyup', (e) =>{
        if(e.key === 'Enter' && !launchButton.disabled){
            if (launchButton.getAttribute('disabled') === null){
                for (let i = 0; i < sumLines.length; i++) {
                    sumLines[i].setAttribute('style', 'display:none;')
                }
                startCountdown();
                countDownDisplay();
            }
        }
    });


    document.getElementById('generate').addEventListener('mousedown', () =>{
        let codeOutputs = document.getElementsByClassName('codeOutput');
        for (let i = 0; i < codeOutputs.length; i++) {
            codeOutputs[i].setAttribute('style', 'color: #d12323;text-shadow: 0 0 5px #b84440;border: 5px solid #d12323;');
            codeOutputs[i].innerText = '-';
        }
        launchButton.setAttribute('disabled', '')
        sumsObj = {
            line0_a: null, line0_b: null, line0_c: null, line0_op:null, line0_Ans: null,
            line1_a: null, line1_b: null, line1_c: null, line1_op:null, line1_Ans: null,
            line2_a: null, line2_b: null, line2_c: null, line2_op:null, line2_Ans: null,
            line3_a: null, line3_b: null, line3_c: null, line3_op:null, line3_Ans: null,};
        makeSums();
    });

    
    
}