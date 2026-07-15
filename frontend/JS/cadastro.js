const botaoCadastro = document.getElementById("botaoCadastro");
const inputNome = document.getElementById("inputNome");
const inputEmail = document.getElementById("inputEmail");
const inputCpf = document.getElementById("inputCpf");
const inputTelefone = document.getElementById("inputTelefone");
const inputDataNascimento = document.getElementById("inputDataNascimento");
const inputSenha = document.getElementById("inputSenha");
const inputConfirmarSenha = document.getElementById("inputConfirmarSenha");

async function cadastraUsuario(nome, email, cpf, telefone, dataNascimento, senha) {
    const url = "http://localhost:3031/pacientes";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                nome:`${nome}`,
                email:`${email}`,
                cpf: `${cpf}`,
                telefone: `${telefone}`,
                dataNascimento: `${dataNascimento}`,
                senha: `${senha}`
            })
        });
        if (!response.ok) {
            throw new Error(`Usuário cadastrado: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    };
};

botaoCadastro.addEventListener("click", (e) =>{
    e.preventDefault();

    const nomeValue = inputNome.value;
    const emailValue = inputEmail.value;
    const cpfValue = inputCpf.value;
    const telefoneValue = inputTelefone.value;
    const dataNascimentoValue = inputDataNascimento.value;
    const senhaValue = inputSenha.value;
    const confirmarSenhaValue = inputConfirmarSenha.value;

    cadastraUsuario(nomeValue, emailValue, cpfValue, telefoneValue, dataNascimentoValue, senhaValue);
    
    if (
            nomeValue === "" ||
            emailValue === "" ||
            telefoneValue === "" ||
            senhaValue === "" ||
            confirmarSenhaValue === "" ||
            cpfValue === "" ||
            dataNascimentoValue === ""
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
                        emailValue.focus();
                        return;
                    }
                    
                    const regexTelefone = /^[0-9]{10,11}$/;
                    
    if (!regexTelefone.test(telefoneValue)) {
            alert("Digite um número de telefone válido com DDD (10 ou 11 dígitos).");
            telefoneValue.focus();
            return;
        }
        if (senhaValue.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres.");
                senhaValue.focus();
                return;
            }
            if (senhaValue !== confirmarSenhaValue) {
                    alert("As senhas não coincidem.");
                    confirmarSenhaValue.focus();
                    return;
                }
                if(cpfValue.length != 11 ){
                    alert("O CPF tem que ter 11 numeros");
                    cpfValue.focus();
                    return;
                }
                const regexDataNascimento = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

                if(!regexDataNascimento.test(dataNascimentoValue)){
                    alert("data tem que ser em numero")
                    dataNascimentoValue.focus();
                    return;
                }
                alert("Cadastro realizado com sucesso!");
                
                window.location.href = "../pages/login.html";
                
            
})