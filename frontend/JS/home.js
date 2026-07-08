const { getRandomValues } = require("node:crypto");
const { lchown } = require("node:fs");

const slides = document.querySelectorAll(".slide");
const btnProximo = document.querySelector(".proximo");
const btnAnterior = document.querySelector(".anterior");

// Função para os MODAIS

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const btnFechar = document.querySelector('.fechar');
    const botoesAgendar = document.querySelectorAll('.btn-agendar');

    // Elementos internos do modal que receberão os textos
    const modalImagem = document.getElementById('modalImagem');
    const modalNome = document.getElementById('modalNome');
    const modalEspecialidade = document.getElementById('modalEspecialidade');
    const modalDescricao = document.getElementById('modalDescricao');
    const modalDias = document.getElementById('modalDias');
    const modalHorario = document.getElementById('modalHorario');

    const botoes = document.querySelectorAll(".btn-agendar");

botoes.forEach(botao => {

    botao.addEventListener("click", async () => {

        const consulta = {
            medico: botao.dataset.nome,
            especialidade: botao.dataset.especialidade,
            descricao: botao.dataset.descricao,
            dias: botao.dataset.dias,
            horario: botao.dataset.horario
        };

        try{

            const resposta = await fetch("http://localhost:3031/agendamentos",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(consulta)

            });

            const dados = await resposta.json();

            alert(dados.mensagem);

        }catch(error){

            console.log(error);

        }

    });

});

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



    // 1. Escuta o clique em qualquer botão de agendar para ABRIR o modal
    botoesAgendar.forEach(botao => {
        botao.addEventListener('click', () => {
            // Puxa os dados salvos no HTML através do dataset
            modalImagem.src = botao.dataset.imagem;
            modalNome.textContent = botao.dataset.nome;
            modalEspecialidade.textContent = botao.dataset.especialidade;
            modalDescricao.textContent = botao.dataset.descricao;
            modalDias.textContent = botao.dataset.dias;
            modalHorario.textContent = botao.dataset.horario;

            // Abre o modal
            modal.style.display = 'flex';
        });
    });

    // 2. Escuta o clique no botão "X" para fechar
    btnFechar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 3. Escuta o clique fora do modal (na área escura) para fechar
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
