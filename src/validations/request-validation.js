const yup = require('yup')
const moment = require('moment')

class RequestValidation {
    static async validateMessage(request) {
        const schema = yup.object().shape({
            message: yup.string()
                .required('Favor informar a mensagem')
                .min(10, 'A mensagem deve conter no mínimo 10 caracteres')
                .max(5000, 'A mensagem deve conter no máximo 5000 caracteres')
        })

        return await schema.validate(request)
    }

    static async validateEmails(request) {
        const schema = yup.object().shape({
            subject: yup.string()
                .required('Favor informar o assunto')
                .min(5, 'O assunto deve conter no mínimo 5 caracteres')
                .max(50, 'O assunto deve conter no máximo 50 caracteres'),
            emails: yup.object().shape({
                to: yup.array()
                    .of(yup.string().email('Email inválido de um destinatário!'))
                    .min(1, 'Favor informar pelo menos um email de destinatário'),
                cc: yup.array()
                    .of(yup.string().email('Email inválido de um destinatário em cópia!')),
                cco: yup.array()
                    .of(yup.string().email('Email inválido de um destinatário em cópia oculto!'))
            })
        })

        return await schema.validate(request)
    }

    static async validateSchedule(request) {
        const schema = yup.object().shape({
            subject: yup.string()
                .required('Favor informar o assunto')
                .min(5, 'O assunto deve conter no mínimo 5 caracteres')
                .max(50, 'O assunto deve conter no máximo 50 caracteres'),
            emails: yup.object().shape({
                to: yup.array()
                    .of(yup.string().email('Email inválido de um destinatário!'))
                    .min(1, 'Favor informar pelo menos um email de destinatário'),
                cc: yup.array()
                    .of(yup.string().email('Email inválido de um destinatário em cópia!')),
                cco: yup.array()
                    .of(yup.string().email('Email inválido de um destinatário em cópia oculto!'))
            }),
            typeOfTime: yup.string()
                .required('Favor informar o tipo da periodicidade')
                .matches(/^MINUTE|HOUR|DAY/, 'O tipo da periodicidade deve ser em Minuto, Hora ou Dia'),
            time: yup.number()
                .typeError('Tempo inválido, favor digitar apenas números')
                .integer('Favor digitar apenas números inteiros para o tempo da periodicidade')
                .required('Favor informar a periodicidade')
                .max(999999, 'O tempo deve conter no máximo 6 dígitos'),
            startDate: yup.date()
                .typeError('Data e hora de início inválida. O formato aceito é: YYYY-MM-DD HH:mm:ss')
                .required('Favor informar a data e hora de início')
                .min(moment().toDate(), 'A data e hora de início não pode ser no passado'),
            endDate: yup.date()
                .typeError('Data e hora final inválida. O formato aceito é: YYYY-MM-DD HH:mm:ss')
                .min(request.startDate, 'A data e hora final deve ser depois da data de início'),
            isActive: yup.boolean()
                .typeError('Ativo deve ser true ou false')
        })

        return await schema.validate(request)
    }
}

module.exports = RequestValidation
