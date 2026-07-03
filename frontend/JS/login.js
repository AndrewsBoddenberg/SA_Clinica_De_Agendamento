const botaoEntrar = document.getElementById("botaoEntrar");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

botaoEntrar.addEventListener("click", (e) => {
    e.preventDefault();

    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();

    if (emailValue === "" || senhaValue === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(emailValue)) {
        alert("Digite um e-mail válido.");
        email.focus();
        return;
    }

    if (senhaValue.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        senha.focus();
        return;
    }

    window.location.href = "../pages/home.html";
});