const botaoCadastro = document.getElementById("botaoCadastro");
const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;
const telefone = document.getElementById("telefone").value;
const senha = document.getElementById("senha").value;
const confirmarSenha = document.getElementById("confirmarSenha").value;
const dataNasc = document.getElementById("datanascimento").value;
const cpf = document.getElementById("cpf").value;

async function cadastraUsuario() {
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
                senha: `${senha}`,
                cpf: `${cpf}`,
                telefone: `${telefone}`,
                dataNascimento: `${dataNasc}`
            })
        });
        if (!response.ok) {
            throw new Error(`Usuário cadastrado: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(result);
    } catch (error) {
    console.error(error.message);
}
};

botaoCadastro.addEventListener("click", (e) =>{
    e.preventDefault();
    
    // const nomeValue = nome.value.trim();
    // const emailValue = email.value.trim();
    // const numeroValue = telefone.value.trim();
    // const senhaValue = senha.value.trim();
    // const confirmarSenhaValue = confirmarSenha.value.trim();
    
    // if (
        //     nomeValue === "" ||
        //     emailValue === "" ||
        //     numeroValue === "" ||
        //     senhaValue === "" ||
        //     confirmarSenhaValue === ""
        // ) {
            //     alert("Preencha todos os campos.");
            //     return;
            // }
            
            // if (nomeValue.length < 3) {
                //     alert("O nome deve ter pelo menos 3 caracteres.");
                //     nome.focus();
                //     return;
                // }
                
                // const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                // if (!regexEmail.test(emailValue)) {
                    //     alert("Digite um e-mail válido.");
                    //     email.focus();
                    //     return;
                    // }
                    
                    // const regexTelefone = /^[0-9]{10,11}$/;
                    
    // if (!regexTelefone.test(numeroValue)) {
        //     alert("Digite um número de telefone válido com DDD (10 ou 11 dígitos).");
        //     telefone.focus();
        //     return;
        // }
        // if (senhaValue.length < 6) {
            //     alert("A senha deve ter pelo menos 6 caracteres.");
            //     senha.focus();
            //     return;
            // }
            // if (senhaValue !== confirmarSenhaValue) {
                //     alert("As senhas não coincidem.");
                //     confirmarSenha.focus();
                //     return;
                // }
                
                console.log(dataNasc);
                cadastraUsuario();
                
                // alert("Cadastro realizado com sucesso!");
                
                // window.location.href = "../pages/login.html";
                
                
})