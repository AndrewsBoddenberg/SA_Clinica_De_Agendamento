const slides = document.querySelectorAll(".slide");
const btnProximo = document.querySelector(".proximo");
const btnAnterior = document.querySelector(".anterior");

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

const formPesquisa = document.getElementById("formPesquisa");
const inputPesquisa = document.getElementById("inputPesquisa");
const cardsMedicos = document.querySelectorAll(".cards-especialidades .card");

let indice = 0;
let medicoSelecionado = {};
let listaHorarios = [];

function mostrarSlide(posicao) {
    slides.forEach(slide => {
        slide.classList.remove("active");
    });
    slides[posicao].classList.add("active");
}

function inicializarSlider() {
    if (!btnProximo || !btnAnterior || slides.length === 0) return;

    btnProximo.addEventListener("click", () => {
        indice++;
        if (indice >= slides.length) {
            indice = 0;
        }
        mostrarSlide(indice);
    });

    btnAnterior.addEventListener("click", () => {
        indice--;
        if (indice < 0) {
            indice = slides.length - 1;
        }
        mostrarSlide(indice);
    });

    setInterval(() => {
        indice++;
        if (indice >= slides.length) {
            indice = 0;
        }
        mostrarSlide(indice);
    }, 4000);
}

function inicializarPesquisa() {
    if (!formPesquisa || !inputPesquisa || cardsMedicos.length === 0) return;

    formPesquisa.addEventListener("submit", (e) => {
        e.preventDefault();

        const termoBusca = inputPesquisa.value.toLowerCase().trim();
        let encontrouQualquer = false;

        cardsMedicos.forEach(card => {
            const botaoAgendar = card.querySelector(".btn-agendar");
            if (!botaoAgendar) return;

            const nomeMedico = (botaoAgendar.dataset.nome || "").toLowerCase();
            const especialidade = (botaoAgendar.dataset.especialidade || "").toLowerCase();

            if (nomeMedico.includes(termoBusca) || especialidade.includes(termoBusca)) {
                card.style.display = "";
                encontrouQualquer = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!encontrouQualquer && termoBusca !== "") {
            alert("Nenhum médico ou especialidade encontrada.");
            cardsMedicos.forEach(card => card.style.display = "");
        }
    });

    inputPesquisa.addEventListener("input", () => {
        if (inputPesquisa.value.trim() === "") {
            cardsMedicos.forEach(card => card.style.display = "");
        }
    });
}

function abrirModal(botao) {
    medicoSelecionado = {
        idmedico: botao.dataset.idmedico,
        imagem: botao.dataset.imagem,
        nome: botao.dataset.nome,
        especialidade: botao.dataset.especialidade,
        descricao: botao.dataset.descricao,
        dias: botao.dataset.dias,
        horario: botao.dataset.horario
    };

    if (modalImagem) modalImagem.src = medicoSelecionado.imagem;
    if (modalNome) modalNome.textContent = medicoSelecionado.nome;
    if (modalEspecialidade) modalEspecialidade.textContent = medicoSelecionado.especialidade;
    if (modalDescricao) modalDescricao.textContent = medicoSelecionado.descricao;
    if (modalDias) modalDias.textContent = medicoSelecionado.dias;
    if (modalHorario) modalHorario.textContent = medicoSelecionado.horario;

    modal.style.display = "flex";

    carregarHorarios(botao.dataset.idmedico);
}

function fecharModal() {
    modal.style.display = "none";
}

function inicializarModal() {
    botoesAgendar.forEach(botao => {
        botao.addEventListener("click", () => {
            abrirModal(botao);
        });
    });

    if (btnFechar) {
        btnFechar.addEventListener("click", fecharModal);
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    });
}

async function carregarHorarios(idMedico) {
    try {
        const url = `http://localhost:3031/horarios/medico/${idMedico}`;
        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro ao carregar horários: ${resposta.status}`);
        }

        listaHorarios = await resposta.json();

        let options = "";
        listaHorarios.forEach(horario => {
            if (horario.status === "Ocupado") {
                return;
            }

            const dataIso = horario.dia.substring(0, 10);
            const [ano, mes, dia] = dataIso.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;

            const horaFormatada = horario.hora.substring(0, 5);

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
    } catch (erro) {
        console.error(erro);
    }
}

async function agendar(idhorario, dia, hora, status, idmedico) {
    const url = `http://localhost:3031/horarios/${idhorario}`;
    const diaFormatadoBanco = dia.includes('T') ? dia.split('T')[0] : dia;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                medicos_idmedicos: Number(idmedico),
                dia: `${diaFormatadoBanco}`,
                hora: `${hora}`,
                status: `${status}`
            })
        });

        if (!response.ok) {
            console.log("Falha no método PUT, tentando método POST na rota raiz...");

            const fallbackResponse = await fetch(`http://localhost:3031/horarios`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    idhorario: Number(idhorario),
                    medicos_idmedicos: Number(idmedico),
                    dia: `${diaFormatadoBanco}`,
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
        alert("Ocorreu um erro ao salvar o agendamento no servidor. Verifique o console do navegador e o terminal do backend.");
    }
}

confirmarModal.addEventListener("click", async (e) => {
    e.preventDefault();

    const selectHorario = document.getElementById("typeFilter");

    if (!selectHorario) {
        console.error("Selecione um horário válido.");
        return;
    }

    const idSelecionado = selectHorario.value;

    const horarioOriginal = listaHorarios.find(h => String(h.idhorario) === String(idSelecionado));

    if (horarioOriginal) {
        const idParaBanco = horarioOriginal.idhorario;
        const diaParaBanco = horarioOriginal.dia;
        const horaParaBanco = horarioOriginal.hora;
        const status = "Ocupado";

        const idmedico = medicoSelecionado.idmedico;

        if (!idmedico) {
            alert("Erro interno: ID do médico não pôde ser recuperado.");
            return;
        }

        await agendar(idParaBanco, diaParaBanco, horaParaBanco, status, idmedico);
    } else {
        console.error("Não foi possível encontrar as informações originais do horário selecionado.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    inicializarSlider();
    inicializarModal();
    inicializarPesquisa();
});