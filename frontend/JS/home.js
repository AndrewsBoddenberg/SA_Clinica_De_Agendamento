// SLIDER

const slides = document.querySelectorAll(".slide");
const btnProximo = document.querySelector(".proximo");
const btnAnterior = document.querySelector(".anterior");

let indice = 0;

// MODAL

const modal = document.getElementById("modal");
const btnFechar = document.querySelector(".fechar");
const botoesAgendar = document.querySelectorAll(".btn-agendar");
const btnConfirmar = document.getElementById("btnConfirmarModal");

const modalImagem = document.getElementById("modalImagem");
const modalNome = document.getElementById("modalNome");
const modalEspecialidade = document.getElementById("modalEspecialidade");
const modalDescricao = document.getElementById("modalDescricao");
const modalDias = document.getElementById("modalDias");
const modalHorario = document.getElementById("modalHorario");
const typeFilter = document.getElementById("typeFilter")


let medicoSelecionado = {};

function mostrarSlide(posicao){
    slides.forEach(slide => {
        slide.classList.remove("active");
    });
    
    slides[posicao].classList.add("active");
}

function inicializarSlider(){
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
            indice = slides.length-1;
        }
        mostrarSlide(indice);
    });

    setInterval(()=>{
        indice++;

        if(indice >= slides.length){
            indice = 0;
        }

        mostrarSlide(indice);
    },4000);

}

function abrirModal(botao){
    medicoSelecionado = {

        imagem: botao.dataset.imagem,
        nome: botao.dataset.nome,
        especialidade: botao.dataset.especialidade,
        descricao: botao.dataset.descricao,
        dias: botao.dataset.dias,
        horario: botao.dataset.horario
    };

    modalImagem.src = medicoSelecionado.imagem;
    modalNome.textContent = medicoSelecionado.nome;
    modalEspecialidade.textContent = medicoSelecionado.especialidade;
    modalDescricao.textContent = medicoSelecionado.descricao;
    modalDias.textContent = medicoSelecionado.dias;
    modalHorario.textContent = medicoSelecionado.horario;

    modal.style.display = "flex";

}

function fecharModal(){
    modal.style.display = "none";
}

function inicializarModal(){
    botoesAgendar.forEach(botao=>{
        botao.addEventListener("click",()=>{
            abrirModal(botao);
        });

    });

    btnFechar.addEventListener("click",fecharModal);
    window.addEventListener("click",(event)=>{

        if(event.target===modal){
            fecharModal();
        }

    });

}

async function carregarHorarios(idMedico){
    try{
        console.log(idMedico);
        
        const url = `http://localhost:3031/horarios/${idMedico}`;
        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        });

        const horarios = await resposta.json();

        console.log(horarios);
        
        typeFilter.innerHTML = "";
        horarios.forEach(horario => {
            typeFilter.innerHTML = `
                <option value="${horario.idhorario}">${horario.dia} | ${horario.hora}</option>
            `;
        });
    }catch(erro){
        console.log(erro);
    }
}

// function inicializarAgendamento(){
//     btnConfirmar.addEventListener("click",confirmarAgendamento);
// }

typeFilter.addEventListener("click", () => {
    carregarHorarios();
})

document.addEventListener("DOMContentLoaded",()=>{

    inicializarSlider();
    inicializarModal();

});