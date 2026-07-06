const slides = document.querySelectorAll(".slide");
const btnProximo = document.querySelector(".proximo");
const btnAnterior = document.querySelector(".anterior");

let indice = 0;

function mostrarSlide(posicao){

    slides.forEach(slide =>{
        slide.classList.remove("active");
    });

    slides[posicao].classList.add("active");
}

btnProximo.addEventListener("click", ()=>{

    indice++;

    if(indice >= slides.length){
        indice = 0;
    }

    mostrarSlide(indice);

});

btnAnterior.addEventListener("click", ()=>{

    indice--;

    if(indice < 0){
        indice = slides.length -1;
    }

    mostrarSlide(indice);

});

setInterval(() => {

    indice++;

    if(indice >= slides.length){
        indice = 0;
    }

    mostrarSlide(indice);

}, 4000);