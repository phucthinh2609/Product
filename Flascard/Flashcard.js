

// FRONT

class FlashcardName {
    constructor(nameFront, nameBack) {
        this.nameFront = nameFront;
        this.nameBack = nameBack
    }
}

let flashcardNames = [];

const flashcard_key = "FlashCardName"

function init() {
    if (localStorage.getItem(flashcard_key) == undefined) {
        flashcardNames = [
            new FlashcardName('한국', 'Hàn Quốc'),
            new FlashcardName('베트남', 'Việt Nam'),
            new FlashcardName( 'Khi mình lỡ thích cậu rồi. Phải làm sao? phải làm sao?','사랑하다'),
            new FlashcardName('싫다', 'Đồ đáng ghét'),
            new FlashcardName('바보', 'Đồ ngốc'),
            new FlashcardName('거져', 'Biến đi'),
            new FlashcardName('입닥쳐', 'Câm mồm'),
            new FlashcardName('변태야', 'Đồ biến thái'),
            new FlashcardName('개세끼야', 'Con chó này'),
            new FlashcardName('죽을래?', 'Muốn chết hả?'),
            new FlashcardName('미친놈', 'Thằng điên'),
            new FlashcardName('미친년', 'Con điên'),
        ]
        localStorage.setItem(flashcard_key, JSON.stringify(flashcardNames))
    } else {
        flashcardNames = JSON.parse(localStorage.getItem(flashcard_key))
    }
}

function renderFlashcard() {
    let containerFlashcard = document.querySelector('.container');
    // document.querySelector('.flip-card-front').style.background = 'red';
    let htmls = flashcardNames.map(function(flashcardNames) {
        return `
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front" id="idT">
                            <p>${flashcardNames.nameFront}</p>
                            <span class="delete-card">X</span> 
                        </div>
                        <div class="flip-card-back">
                            <p>${flashcardNames.nameBack}</p>    
                            <span class="delete-card" onclick="removeCard()">X</span>         
                        </div>
                    </div>
                </div>        

            `
    })

    containerFlashcard.innerHTML = htmls.join("");
}


function createCard(){
    let nameFront = document.querySelector("#front").value;
    let nameBack = document.querySelector("#back").value;
    let color = getRandomColor()
    if(nameFront === '' || nameBack === ''){
        alert("Front name is required")
        return;
    }

    flashcardNames.push(new FlashcardName(nameFront, nameBack));
    renderFlashcard();
    localStorage.setItem(flashcard_key, JSON.stringify(flashcardNames))
    document.querySelector("#front").value = "";
    document.querySelector("#back").value = "";
}

function removeCard(index){
        flashcardNames.splice(index,1);
        renderFlashcard();
        localStorage.setItem(flashcard_key, JSON.stringify(flashcardNames))
}

function getRandomHex() {
    return Math.floor(Math.random()*255);
}

function getRandomColor() {
    var red = getRandomHex()
    var green = getRandomHex()
    var blue = getRandomHex()
    return `rgb(${red},${green},${blue})`
}

init()
renderFlashcard()

console.log(getRandomColor())