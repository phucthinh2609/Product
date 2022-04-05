

// FRONT

class FlashcardName {
    constructor(id,nameFront, nameBack) {
        this.id = id
        this.nameFront = nameFront;
        this.nameBack = nameBack
    }
}

const flashcard_key = "FlashCardName"
const page_index_default = 1;
const page_size_default = 12;
let flashcardNames = [];


function init() {
    if (localStorage.getItem(flashcard_key) == undefined) {
        flashcardNames = [
            new FlashcardName(1, '한국', 'Hàn Quốc'),
            new FlashcardName(2, '베트남', 'Việt Nam'),
            new FlashcardName(3, '사랑하다', 'Khi mình lỡ thích cậu rồi. Phải làm sao? phải làm sao?'),
            new FlashcardName(4, '싫다', 'Đồ đáng ghét'),
            new FlashcardName(5, '바보', 'Đồ ngốc'),
            new FlashcardName(6, '거져', 'Biến đi'),
            new FlashcardName(7, '입닥쳐', 'Câm mồm'),
            new FlashcardName(8, '변태야', 'Đồ biến thái'),
            new FlashcardName(9, '개세끼야', 'Con chó này'),
            new FlashcardName(10, '죽을래?', 'Muốn chết hả?'),
            new FlashcardName(11, '미친놈', 'Thằng điên'),
            new FlashcardName(12, '미친년', 'Con điên'),
        ]
        // localStorage.setItem(flashcard_key, JSON.stringify(flashcardNames))
        setLocalStorage(flashcard_key,flashcardNames)
    } else {
        flashcardNames = getLocalStorage(flashcard_key)
    }
}


function getLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function setLocalStorage(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

function renderFlashcard(page_index, page_size) {
    let containerFlashcard = document.querySelector('.container');
    // document.querySelector('.flip-card-front').style.background = 'red';
    flashcardNames.sort(function (card1, card2) {
        return card1.id - card2.id;
    })
    data = flashcardNames.slice((page_index - 1) * page_size, page_size * page_index);
    let htmls = flashcardNames.map(function(flashcardNames, index) {
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
    // let color = getRandomColor()
    let id = flashcardNames[0].id + 1;
    if(nameFront === '' || nameBack === ''){
        alert("Front name is required")
        return;
    }

    flashcardNames.push(new FlashcardName(id, nameFront, nameBack));
    renderFlashcard();
    localStorage.setItem(flashcard_key, JSON.stringify(flashcardNames))
    renderFlashcard(page_index_default, page_size_default)
    reset();

}

function reset() {
    document.querySelector("#front").value = "";
    document.querySelector("#back").value = "";
}

function removeCard(id){
    let confirm = window.confirm("Are you sure?")
    let position = flashcardNames.findIndex(function (flashcardName) {
        return flashcardName.id == id;
    });
        flashcardNames.splice(position,1);
        // let position = querySelector('.flip-card_${index}')
        // position.remove()
        localStorage.setItem(flashcard_key, JSON.stringify(flashcardNames))
        renderFlashcard(page_index_default, page_size_default)
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

function renderAllList() {
    let tbody = document.getElementById('tbFlashcard');
    // document.querySelector('.flip-card-front').style.background = 'red';
    let htmls = flashcardNames.map(function(flashcardNames, index) {
        return `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${flashcardNames.id}</td>
                    <td>${flashcardNames.nameFront}</td>
                    <td>${flashcardNames.nameBack}</td>
                </tr>       

            `
    })

    tbody.innerHTML = htmls.join("");
}


init()
renderFlashcard()
renderAllList()

console.log(getRandomColor())