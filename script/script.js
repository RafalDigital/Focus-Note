// HERO SECTION
const cards = document.querySelectorAll('.card');
let isProcessing = false;

cards.forEach((c) => {
    c.addEventListener("mouseenter", () => {

        if(isProcessing) return;
    
        isProcessing = true;

        if (cards[0].classList.contains('p')) {
            console.log('c index 0 dipicu')
            cards[0].classList.remove("p");
            cards[1].classList.add("p");
        } else if (cards[1].classList.contains('p')) {
            console.log('c index 1 dipicu')
            cards[1].classList.remove("p");
            cards[0].classList.add("p");
        }

        setTimeout(() => {
            isProcessing = false;
        }, 1000);
    });
})