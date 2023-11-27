const moment = require('moment')

const atendimentos = require('../controllers/atendimentos')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data_atendimento = moment(atendimento.data_atendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataValida = moment(data_atendimento).isSameOrAfter(data_criacao)
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros){
            res.status(400).json(erros)
        }else{

            const atendimentoDatado = { ...atendimento, data_criacao, data_atendimento }
            const sql = 'INSERT INTO atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(resultados)
            }
        })
        }

        



    }
}

module.exports = new Atendimento