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


module.exports.processarPagamento = function (app, req, res){
  const { body } = req;
  const { payer } = body;

  const payment = new mercadopago.Payment(client);

  const paymentData = {
    transaction_amount: Number(body.transactionAmount),
    token: body.token,
    description: body.description,
    installments: Number(body.installments),
    payment_method_id: body.paymentMethodId,
    issuer_id: body.issuerId,
    payer: {
      email: payer.email,
      identification: {
        type: payer.identification.docType,
        number: payer.identification.docNumber,
      },
    },
  };

  payment
    .create({ body: paymentData })
    .then(function (data) {
      res.status(201).json({
        detail: data.status_detail,
        status: data.status,
        id: data.id,
      });
    })
    .catch(function (error) {
      console.log(error);
      const { errorMessage, errorStatus } = validateError(error);
      res.status(errorStatus).json({ error_message: errorMessage });
    });
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