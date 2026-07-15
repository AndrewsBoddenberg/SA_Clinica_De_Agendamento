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
const campoSelect = document.getElementById("campoSelect");
const confirmarModal = document.getElementById("btnConfirmarModal");



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

    carregarHorarios(botao.dataset.idmedico)

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

let listaHorarios = [];

async function carregarHorarios(idMedico){
    try{
        const url = `http://localhost:3031/horarios/medico/${idMedico}`;
        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        });

        // Guardamos a resposta original aqui na variável global
        listaHorarios = await resposta.json();

        let options = "";
        listaHorarios.forEach(horario => {
            // Formata a data apenas para EXIBIÇÃO do usuário (Ex: "10/07/2026")
            const dataIso = horario.dia.substring(0, 10); 
            const [ano, mes, dia] = dataIso.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;

            // Formata a hora apenas para EXIBIÇÃO do usuário (Ex: "08:00")
            const horaFormatada = horario.hora.substring(0, 5);

            // IMPORTANTE: O "value" guarda o ID único deste horário
            options += `
                <option value="${horario.idhorario}">${dataFormatada} | ${horaFormatada}</option>
            `;
        });
        
        campoSelect.innerHTML = `
            <label for="typeFilter">Horário da consulta</label>
            <select id="typeFilter" class="select-horario">
                ${options}
            </select>
        `;
    }catch(erro){
        console.log(erro);
    }
}

// FUNÇÃO DE AGENDAMENTO COM MECANISMO DE ADAPTAÇÃO
async function agendar(idhorario, dia, hora, status) {
    // 1. URL padrão:
    // Se o seu backend foi feito para atualizar um registro existente, o comum é que
    // o ID do registro vá no final da URL, por exemplo: http://localhost:3031/horarios/1
    // Se o método POST continuar falhando, mude "POST" abaixo para "PUT" ou "PATCH".
    const url = `http://localhost:3031/horarios/${idhorario}`; 

    try {
        const response = await fetch(url, {
            method: "PUT", // Trocamos para PUT porque estamos alterando um registro que já existe (Mudando de Livre para Ocupado)
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                dia: `${dia}`,
                hora: `${hora}`,
                status: `${status}`
            })
        });

        // Se o PUT na URL falhar, tentamos o POST clássico na rota raiz como segunda opção
        if (!response.ok) {
            console.log("Falha no método PUT, tentando método POST na rota raiz...");
            const fallbackResponse = await fetch(`http://localhost:3031/horarios`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    idhorario: Number(idhorario),
                    dia: `${dia}`,
                    hora: `${hora}`,
                    status: `${status}`
                })
            });

            if (!fallbackResponse.ok) {
                throw new Error(`Erro ao cadastrar agendamento: ${fallbackResponse.status}`);
            }

            const fallbackResult = await fallbackResponse.json();
            console.log("Sucesso no fallback (POST):", fallbackResult);
        } else {
            const result = await response.json();
            console.log("Sucesso no método principal (PUT):", result);
        }
        
        alert("Consulta agendada com sucesso!");
        fecharModal();
        
    } catch (error) {
        console.error(error.message);
        alert("Ocorreu um erro ao salvar o agendamento no servidor. Verifique o terminal do seu backend.");
    }
}

// EVENTO DE CONFIRMAÇÃO: Usa a variável "confirmarModal" mapeada no topo do seu código
confirmarModal.addEventListener("click", async (e) => {
    e.preventDefault();

    // 1. Captura o select
    const selectHorario = document.getElementById("typeFilter");

    if (!selectHorario) {
        console.error("Selecione um horário válido.");
        return;
    }

    // 2. Pega o ID selecionado (o value do option)
    const idSelecionado = selectHorario.value;

    // 3. Procura o horário correspondente com os dados originais obtidos do banco
    const horarioOriginal = listaHorarios.find(h => String(h.idhorario) === String(idSelecionado));

    if (horarioOriginal) {
        // Envia as strings exatamente do jeito que vieram do banco (ISO e HH:MM:SS) junto com o ID
        const idParaBanco = horarioOriginal.idhorario;
        const diaParaBanco = horarioOriginal.dia;
        const horaParaBanco = horarioOriginal.hora;
        const status = "Ocupado"; 

        // 4. Dispara a chamada assíncrona
        await agendar(idParaBanco, diaParaBanco, horaParaBanco, status);
    } else {
        console.error("Não foi possível encontrar as informações originais do horário selecionado.");
    }
});


document.addEventListener("DOMContentLoaded",()=>{

    inicializarSlider();
    inicializarModal();

});