const botaoCadastro = document.getElementById("botaoCadastro");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

botaoCadastro.addEventListener("click", e =>{
    e.preventDefault();

    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const numeroValue = telefone.value.trim();
    const senhaValue = senha.value.trim();
    const confirmarSenhaValue = confirmarSenha.value.trim();

    if (
        nomeValue === "" ||
        emailValue === "" ||
        numeroValue === "" ||
        senhaValue === "" ||
        confirmarSenhaValue === ""
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    if (nomeValue.length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres.");
        nome.focus();
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(emailValue)) {
        alert("Digite um e-mail válido.");
        email.focus();
        return;
    }

    const regexTelefone = /^[0-9]{10,11}$/;

    if (!regexTelefone.test(numeroValue)) {
        alert("Digite um número de telefone válido com DDD (10 ou 11 dígitos).");
        telefone.focus();
        return;
    }
    if (senhaValue.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        senha.focus();
        return;
    }
    if (senhaValue !== confirmarSenhaValue) {
        alert("As senhas não coincidem.");
        confirmarSenha.focus();
        return;
    }

    alert("Cadastro realizado com sucesso!");

    window.location.href = "../pages/login.html";
})