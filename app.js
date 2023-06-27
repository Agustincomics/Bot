const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// FLOWS 
const flujoLink = addKeyword('3').addAnswer('Rellene los datos de este formulario y adjunte su comprobante para Informar el pago 👇📄').addAnswer('https://forms.gle/57teysmg1NZVhGfm6')
    const flujoVentas = addKeyword('4').addAnswer('Rellene los datos de este formulario y nos contactaremos con usted a la brevedad 👇📄').addAnswer('https://forms.gle/jafYA7XrHLgDbbUU8')
    const flujoTecnico = addKeyword('5').addAnswer('Rellene los datos de este formulario para que un tecnico pronto se comunique con usted 👇📄').addAnswer('https://forms.gle/QSeZ1EMffXXHLj2H9')
    const flujoConsulta = addKeyword('2').addAnswer('Rellene los datos de este formulario para que podamos responder su consulta👇📄').addAnswer('https://forms.gle/VS57bcdT8ViNrF5T7')
    const flujoDatos = addKeyword('1').addAnswer([
        'Cᴏɴɴᴇᴛ | Pᴀɢᴏ ᴄᴏɴ Tʀᴀɴsғᴇʀᴇɴᴄɪᴀ Bᴀɴᴄᴀʀɪᴀ / Vɪʀᴛᴜᴀʟ',
        'Pagá desde tu home banking o billetera virtual, sin moverte de tu casa. Recordá pasarnos el comprobante junto al nombre del titular a este número.',
        
        ' ',
    
        '• Bᴀɴᴄᴏ Sᴀɴᴛᴀɴᴅᴇʀ Rɪᴏ',
        'Empresa: CONNET SRL ',
        'CUIT: 33-71525569-9',
        'CBU: 0720 0694 - 2000 0000 8175 90',
        'Alias: ATAJO.PIEDRA.CIUDAD',
    
        ' ',
    
        '• Bᴀɴᴄᴏ Gᴀʟɪᴄɪᴀ',
        'Empresa: CONNET SRL',
        'CUIT: 33-71525569-9',
        'CBU: 0070 0894 - 2000 0018 1497 17',
        'Alias: BUDA.ATADO.CABLE',
    
        ' ',
    
        '• Bᴀɴᴄᴏ Nᴀᴄɪᴏ́ɴ',
        'Empresa: CONNET SRL',
        'CUIT: 33-71525569-9',
        'CBU: 0110 4817 2004 8101 7708 28',
        'Alias: CETRO.MORSA.MOZO',
        
        ' ',
    
        '• Bᴀɴᴄᴏ Sᴜᴘᴇʀᴠɪᴇʟʟᴇ',
        'Empresa: CONNET SRL ',
        'CUIT: 33-71525569-9',
        'CBU: 0270 0656 1004 4474 8500 34',
        'Alias: MEDUSA.SILLON.CUENTA'
    ])

const flowAgente = addKeyword("6"
).addAnswer("Estamos conectandolo con uno de nuestros agentes"
).addAction(async (ctx, {provider}) => {
    const nanoid = await import('nanoid')
    const ID_GROUP = nanoid.nanoid(5)
    const refProvider = await provider.getInstance()
    await refProvider.groupCreate(`Servicio Tecnico Connet (${ID_GROUP})`,[
        `${ctx.from}@s.whatsapp.net`,
        `5493813002236@s.whatsapp.net`,
    ])
}).addAnswer("Te logramos contactar con un agente! Gracias")

const flujoSaludo = addKeyword('').addAnswer([
    '🤖 Hola bienvenido al *Chatbot* de *Connet SRL*',
    '¿Como podemos ayudarte?',
    'Por favor ingrese el numero de acuerdo a la opcion que desee',
    
    'Informacion y consultas 👇:', 
    '1) Datos para pago',
    '2) Consultas Administrativas',
    '3) Informar Pago',
    '4) Ventas' ,
    '5) Servicio Tecnico',
    '6) Para conectarse con un AGENTE'], null, null, [flujoTecnico, flujoVentas, flujoLink, flujoConsulta, flujoDatos, flowAgente])


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoSaludo])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
