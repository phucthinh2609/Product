

// FRONT

class FlashcardName {
    constructor(id, nameFront, nameBack) {
        this.id = id;
        // this.count = count;
        this.nameFront = nameFront;
        this.nameBack = nameBack
    }
}

const flashcard_key = "FlashCardName";

let flashcardNames = [];


function init() {
    if (getLocalStorage(flashcard_key) == undefined) {
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
        ]
        // localStorage.setItem(flashcard_key, JSON.stringify(flashcardNames))
        setLocalStorage(flashcard_key, flashcardNames)
    } else {
        flashcardNames = getLocalStorage(flashcard_key)
    }
}


function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function renderFlashcard() {
    let containerFlashcard = document.querySelector('.container');
    // document.querySelector('.flip-card-front').style.background = 'red';
    
    let htmls = flashcardNames.map(function(flashcardNames) {
        return `
                <div class="flip-card" id="flip_card_${flashcardNames.id}" >
                    <div class="flip-card-inner">
                        <div class="flip-card-front" style="background-color:${getRandomColor()} ;">
                            <p>${flashcardNames.nameFront}</p>
                            <span class="delete-card">X</span> 
                            <p class="heart-card" id="heart-card-front_${flashcardNames.id}" onclick="addFavoriteCard(${flashcardNames.id})"><i class="fa-solid fa-heart" ></i></p>
                            <p class="red-heart-card d-none" id="red-heart-card-front_${flashcardNames.id}" onclick="removeFavoriteCard(${flashcardNames.id})"><i class="fa-solid fa-heart" ></i></p>
                        </div>
                        <div class="flip-card-back" style="background-color:${getRandomColor()} ;">
                            <p>${flashcardNames.nameBack}</p>    
                            <span class="delete-card"  onclick="removeCard(${flashcardNames.id})">X</span>
                            <p class="heart-card" id="heart-card-back_${flashcardNames.id}" onclick="addFavoriteCard(${flashcardNames.id})"><i class="fa-solid fa-heart" ></i></p>
                            <p class="red-heart-card d-none" id="red-heart-card-back_${flashcardNames.id}" onclick="removeFavoriteCard(${flashcardNames.id})"><i class="fa-solid fa-heart" ></i></p>                            
                        </div>
                    </div>
                </div>        

            `
        })
        
        containerFlashcard.innerHTML = htmls.join("");
        renderAllList()
}


function createCard(){
    let nameFront = document.querySelector("#front").value;
    let nameBack = document.querySelector("#back").value;
    let color = getRandomColor()
    // let color = getRandomColor()
    let id = findLastestId() + 1;

    if(nameFront === '' || nameBack === ''){
        alert("Front name is required")
        return;
    }

    flashcardNames.push(new FlashcardName(id, nameFront, nameBack));
    setLocalStorage(flashcard_key, flashcardNames)
    clearForm();
    renderFlashcard();
}

function findLastestId() {
    let carList = [...flashcardNames];
    carList.sort(function(card1, card2){
        return card2.id - card1.id;
    })
    return carList[0].id;
}

function clearForm() {
    document.querySelector("#front").value = '';
    document.querySelector("#back").value = '';
}

function reset() {
    document.querySelector("#front").value = "";
    document.querySelector("#back").value = "";
}

function removeCard(id){
    // let confirm = window.confirm("Are you sure?")
    flashcardNames = flashcardNames.filter(function(card){
        return card.id != id
    })
    setLocalStorage(flashcard_key, flashcardNames)
    document.querySelector(`#flip_card_${id}`).remove();
    renderAllList()
}   

function getRandomColor() {
    var red = Math.floor(Math.random()*255)+0
    var green = Math.floor(Math.random()*70)+90
    var blue = Math.floor(Math.random()*30)+90
    return `rgb(${red},${green},${blue})`
}`  `

function renderAllList() {
    let tbody = document.getElementById('tbAllList');
    // document.querySelector('.flip-card-front').style.background = 'red';
    let htmls = flashcardNames.map(function(flashcardNames) {
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
    renderFlashcard()
}

function showListCard() {
    document.querySelector('#tbAllList').classList.remove('d-none')
    document.querySelector('#tbFavoriteList').classList.add('d-none')
}

function showFavoriteListCard() {
    document.querySelector('#tbAllList').classList.add('d-none')
    document.querySelector('#tbFavoriteList').classList.remove('d-none')
}

function addFavoriteCard(id) {

    let card = flashcardNames.find(function(card){
        return card.id == id
    }) 

    document.querySelector(`#heart-card-front_${id}`).classList.add('d-none')
    document.querySelector(`#heart-card-back_${id}`).classList.add('d-none')
    document.querySelector(`#red-heart-card-front_${id}`).classList.remove('d-none')
    document.querySelector(`#red-heart-card-back_${id}`).classList.remove('d-none')
    // document.querySelector('.heart-card').children[0].classList.remove('d-none')

}

function removeFavoriteCard(id) {

    let card = flashcardNames.find(function(card){
        return card.id == id
    }) 

    document.querySelector(`#heart-card-front_${id}`).classList.remove('d-none')
    document.querySelector(`#heart-card-back_${id}`).classList.remove('d-none')
    document.querySelector(`#red-heart-card-front_${id}`).classList.add('d-none')
    document.querySelector(`#red-heart-card-back_${id}`).classList.add('d-none')
    // document.querySelector('.heart-card').children[0].classList.remove('d-none')

}






init()
renderFlashcard()
renderAllList()

console.log(getRandomColor())