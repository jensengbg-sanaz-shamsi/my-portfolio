const modal = document.querySelectorAll('.simpleModal');
const modalButton = document.querySelectorAll('.modalBtn');
const closeButton = document.querySelectorAll('.closeBtn');
var openedModal = null;

//listen for opening
modalButton.forEach((btn) => {
    btn.addEventListener('click', openModal)
});

function openModal() {
    openedModal = this.nextElementSibling;
    openedModal.style.display = 'block';
}

//listen for close button
closeButton.forEach((btn) => {
    btn.addEventListener('click', closeModal);
})
function closeModal() {
    openedModal.style.display = 'none';
}

//listen for outside box click
window.addEventListener('click', outsideClick);

function outsideClick(e) {
    if(e.target === openedModal) {
        openedModal.style.display = 'none';
    }
}

const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt ='';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type method
TypeWriter.prototype.type = function() {
    //current index of words
    const current = this.wordIndex % this.words.length;
    //Get fulltext
    const fullTxt = this.words[current];

    //check deleting
    if(this.isDeleting) {
        //remove word
        this.txt = fullTxt.substring(0, this.txt.length -1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length +1);
    }

    //Insert txt into element 
    this.txtElement.innerHTML = `<span class="text">${this.txt}</span>`;

    //Type speed
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    //if word in complete 
    if(!this.isDeleting && this.txt === fullTxt) {
        //make pause 
        typeSpeed = this.wait;
        // set deleting to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt ==='') {
        this.isDeleting = false;
        //move to next word
        this.wordIndex++;
        //pause before typing again
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}



//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}