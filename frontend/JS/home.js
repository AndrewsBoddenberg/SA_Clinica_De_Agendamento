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

async function confirmarAgendamento() {
    const data = document.getElementById("dataAgendamento").value;
    const hora = document.getElementById("horaAgendamento").value;

    if (data === "" || hora === "") {
        alert("Selecione uma data e um horário.");
        return;
    }

    // ID do usuário logado
    const idUsuario = localStorage.getItem("idUsuario");

    try {

        // Busca os dados do usuário
        const respostaUsuario = await fetch(`http://localhost:3031/usuarios/${idUsuario}`);

        if (!respostaUsuario.ok) {
            throw new Error("Erro ao buscar usuário.");
        }

        const usuario = await respostaUsuario.json();

        // Cria o objeto do agendamento
        const consulta = {
            telefone: usuario.telefone,
            medico: medicoSelecionado.nome,
            especialidade: medicoSelecionado.especialidade,
            data: data,
            hora: hora
        };

        // Envia o agendamento
        const resposta = await fetch("http://localhost:3031/agendamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consulta)
        });

        const dados = await resposta.json();

        alert(dados.mensagem);
        fecharModal();

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar ao servidor.");
    }
}

function inicializarAgendamento(){
    btnConfirmar.addEventListener("click",confirmarAgendamento);

}

document.addEventListener("DOMContentLoaded",()=>{

    inicializarSlider();
    inicializarModal();
    inicializarAgendamento();

});

