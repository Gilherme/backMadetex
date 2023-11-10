const AWS = require('aws-sdk');

// Configurar automaticamente com as credenciais associadas à role
const ses = new AWS.SES();

// Definir os parâmetros do e-mail
const params = {
  Destination: {
    ToAddresses: ['guibarreto64042@gmail.com'],
  },
  Message: {
    Body: {
      Text: {
        Data: 'Este é um email de teste enviado via Amazon SES a partir de uma instância EC2.',
      },
    },
    Subject: {
      Data: 'Amigo estou aqui',
    },
  },
  Source: 'guilherme@madetex.com.br',
};

// Enviar o e-mail
ses.sendEmail(params, (err, data) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('E-mail enviado com sucesso:', data);
  }
});