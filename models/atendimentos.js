const moment = require('moment')

const atendimentos = require('../controllers/atendimentos')
const conexao = require('../infraestrutura/conexao')

class Atendimento{
    adiciona(atendimento){
        const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data_atendimento = moment(atendimento.data_atendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {... atendimento, data_criacao, data_atendimento}
        const sql = 'INSERT INTO atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro){
                console.log(erro)
            }else{
                console.log(resultados)
            }
        })

    }
}

module.exports = new Atendimento