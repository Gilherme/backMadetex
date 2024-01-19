// const pag = require('@mercadopago/sdk-js')
const mpKeySecret = require('../../.pag')
const mpKeyPublic = "TEST-6cc8b8f8-b27e-41d9-856e-ccf7ea111fa5"
const mercadopago = require('mercadopago')


if (!mpKeyPublic) {
  console.log("Error: public key not defined");
  process.exit(1);
}

if (!mpKeySecret) {
  console.log("Error: access token not defined");
  process.exit(1);
}

const client = new mercadopago.MercadoPagoConfig({
  accessToken: mpKeySecret,
});


module.exports.processarPagamento = async function (app, req, res){
  let reqs = await fetch("https://sandbox.api.pagseguro.com/charges", {
    method: "POST",
    headers:{
      'Autorization': 'BF5B7FCB05EB4538B1F04710AFCD6BAE',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })
}

function validateError(error) {
  let errorMessage = "Unknown error cause";
  let errorStatus = 400;

  if (error.cause) {
    const sdkErrorMessage = error.cause[0].description;
    errorMessage = sdkErrorMessage || errorMessage;

    const sdkErrorStatus = error.status;
    errorStatus = sdkErrorStatus || errorStatus;
  }

  return { errorMessage, errorStatus };
}