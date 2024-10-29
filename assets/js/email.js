(function() {
    // Inicializa o serviço emailjs com a chave pública fornecida
    emailjs.init("a8-1Gcvpszt0kXjkh"); 
})();

document.querySelector('.contact-form').addEventListener('submit', function(event) {
    // Previne o comportamento padrão de recarregar a página ao enviar o formulário
    event.preventDefault();

    // Seleciona o botão de envio e salva o texto original
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    // Define o texto do botão como "Enviando..." e o desativa para evitar múltiplos envios
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Coleta os dados do formulário e os organiza no objeto templateParams
    const templateParams = {
        from_name: event.target.querySelector('#name').value,
        from_email: event.target.querySelector('#email').value,
        message: event.target.querySelector('#message').value
    };

    // Envia os dados coletados usando o serviço emailjs com as configurações de serviço e template
    emailjs.send(
        'service_olmuoq4', // ID do serviço do emailjs
        'template_lllf7oy', // ID do template configurado no emailjs
        templateParams     // Dados do formulário que serão enviados
    )
    .then(function(response) {
        // Em caso de sucesso, exibe uma mensagem no console e alerta o usuário
        console.log('SUCCESS!', response.status, response.text);
        alert('Mensagem enviada com sucesso!');
        event.target.reset(); // Limpa o formulário após o envio bem-sucedido
    }, function(error) {
        // Em caso de erro, exibe a mensagem de falha no console e alerta o usuário
        console.log('FAILED...', error);
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    })
    .finally(() => {
        // Restaura o texto original do botão e o habilita novamente, independentemente do resultado
        btn.textContent = originalText;
        btn.disabled = false;
    });
});
