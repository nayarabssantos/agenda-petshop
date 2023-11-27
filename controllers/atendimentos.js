

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na roda de atendimentos e está realizando um get'))
}