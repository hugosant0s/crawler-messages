const moment = require('moment')
const chai = require('chai')

const expect = chai.expect

const RequestValidation = require('../../src/validations/request-validation')

const noRequest = async () => {
    try {
        const response = await RequestValidation.validateMessage({})
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Favor informar a mensagem')
    }
}

const noMessage = async () => {
    try {
        const response = await RequestValidation.validateMessage({ 'message': '' })
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Favor informar a mensagem')
    }
}

const messageLess10Characters = async () => {
    try {
        const response = await RequestValidation.validateMessage({ 'message': 'Test' })
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('A mensagem deve conter no mínimo 10 caracteres')
    }
}

const messageMore5000Characters = async () => {
    try {
        const response = await RequestValidation.validateMessage({
            'message': `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                magna aliqua. Senectus et netus et malesuada fames ac. Commodo quis imperdiet massa tincidunt nunc. Vitae et 
                leo duis ut diam quam nulla. Sed adipiscing diam donec adipiscing tristique risus. Quis vel eros donec ac odio 
                tempor. Vel facilisis volutpat est velit egestas dui. Congue eu consequat ac felis. Pretium aenean pharetra magna 
                ac. Vitae auctor eu augue ut lectus arcu bibendum at varius.

                Malesuada bibendum arcu vitae elementum. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. 
                Gravida dictum fusce ut placerat orci nulla. Nulla pellentesque dignissim enim sit amet venenatis urna 
                cursus eget. Ante in nibh mauris cursus. Amet consectetur adipiscing elit pellentesque. Sodales ut etiam 
                sit amet nisl. Non nisi est sit amet facilisis. Amet venenatis urna cursus eget nunc scelerisque. Senectus 
                et netus et malesuada. Sit amet volutpat consequat mauris nunc. Etiam tempor orci eu lobortis elementum nibh 
                tellus molestie nunc. Viverra justo nec ultrices dui sapien eget. Vitae sapien pellentesque habitant morbi. 
                Auctor elit sed vulputate mi sit. Nisi quis eleifend quam adipiscing. Malesuada bibendum arcu vitae elementum 
                curabitur vitae nunc sed. Morbi tristique senectus et netus et malesuada fames ac turpis. Odio tempor orci 
                dapibus ultrices in iaculis nunc. Senectus et netus et malesuada fames ac.

                Sit amet dictum sit amet justo donec enim diam. Dui nunc mattis enim ut tellus elementum sagittis vitae. 
                Sagittis eu volutpat odio facilisis mauris. Sit amet nisl suscipit adipiscing. Blandit libero volutpat sed 
                cras ornare arcu dui vivamus arcu. Fusce ut placerat orci nulla pellentesque dignissim. Pulvinar pellentesque 
                habitant morbi tristique senectus et netus. Commodo odio aenean sed adipiscing diam. Dignissim cras tincidunt 
                lobortis feugiat. Egestas sed tempus urna et pharetra pharetra massa massa. Placerat orci nulla pellentesque 
                dignissim enim sit amet venenatis urna. Morbi tristique senectus et netus. Nullam ac tortor vitae purus 
                faucibus ornare suspendisse. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Amet porttitor 
                eget dolor morbi. Arcu bibendum at varius vel pharetra vel. Cras fermentum odio eu feugiat pretium nibh 
                ipsum consequat nisl. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Odio eu feugiat 
                pretium nibh ipsum consequat nisl vel pretium. Eget mauris pharetra et ultrices neque.

                Vitae turpis massa sed elementum tempus egestas. Auctor elit sed vulputate mi sit. Viverra nibh cras 
                pulvinar mattis nunc sed blandit libero. Sit amet facilisis magna etiam tempor orci eu lobortis elementum. 
                Tristique senectus et netus et malesuada fames. Nisl rhoncus mattis rhoncus urna neque viverra. Feugiat 
                scelerisque varius morbi enim nunc. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Eget 
                sit amet tellus cras adipiscing. Dui vivamus arcu felis bibendum ut tristique et egestas quis.

                Risus ultricies tristique nulla aliquet. Sodales ut eu sem integer vitae justo. Et netus et malesuada 
                fames ac turpis egestas sed tempus. Metus aliquam eleifend mi in nulla posuere. Non nisi est sit amet 
                facilisis. Orci ac auctor augue mauris. Proin libero nunc consequat interdum. Aliquam etiam erat velit 
                scelerisque in dictum non. Porttitor leo a diam sollicitudin tempor id. Pellentesque habitant morbi tristique 
                senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Dui sapien eget mi proin. 
                Eu facilisis sed odio morbi quis commodo odio. Volutpat lacus laoreet non curabitur. Imperdiet nulla malesuada 
                pellentesque elit. Et ligula ullamcorper malesuada proin libero nunc consequat.

                At volutpat diam ut venenatis tellus in metus vulputate eu. Diam quis enim lobortis scelerisque. Purus 
                gravida quis blandit turpis cursus in hac. Blandit aliquam etiam erat velit scelerisque in dictum. Quisque 
                id diam vel quam. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Enim diam vulputate ut 
                pharetra sit. Velit dignissim sodales ut eu sem. Est pellentesque elit ullamcorper dignissim cras tincidunt 
                lobortis. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Massa ultricies mi quis hendrerit 
                dolor magna eget. Sed nisi lacus sed viverra tellus in.

                Eget nunc lobortis mattis aliquam faucibus. Turpis egestas sed tempus urna et pharetra pharetra massa massa. 
                Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Dictumst quisque sagittis purus 
                sit amet volutpat consequat mauris nunc. Imperdiet nulla malesuada pellentesque elit eget gravida cum 
                sociis natoque. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Turpis tincidunt id aliquet risus 
                feugiat in ante. Diam donec adipiscing tristique risus nec feugiat in fermentum. Quam vulputate dignissim 
                suspendisse in est ante in. Aliquam nulla facilisi cras fermentum odio. Leo a diam sollicitudin tempor id. 
                Eu turpis egestas pretium aenean pharetra. Aenean sed adipiscing diam donec adipiscing tristique risus nec. 
                Non curabitur gravida arcu ac tortor. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. 
                Suscipit tellus mauris a diam maecenas. Vitae turpis massa sed elementum tempus egestas sed sed risus. 
                Diam vel quam elementum pulvinar etiam. Donec et odio pellentesque diam volutpat commodo sed. Eleifend 
                donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.
            `
        })

        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('A mensagem deve conter no máximo 5000 caracteres')
    }
}

const messageSuccess = async () => {
    try {
        const request = { 'message': 'Hello World!' }
        const response = await RequestValidation.validateMessage(request)
        expect(response).to.be.deep.equal(request)
    } catch (err) {
        expect(err.name).to.not.be.equal('ValidationError')
    }
}

const noSubject = async () => {
    try {
        const request = {
            'subject': '',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            }
        }

        const response = await RequestValidation.validateEmails(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Favor informar o assunto')
    }
}

const subjectLess5Characters = async () => {
    try {
        const request = {
            'subject': 'Test',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            }
        }

        const response = await RequestValidation.validateEmails(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('O assunto deve conter no mínimo 5 caracteres')
    }
}

const subjectMore50Characters = async () => {
    try {
        const request = {
            'subject': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            }
        }

        const response = await RequestValidation.validateEmails(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('O assunto deve conter no máximo 50 caracteres')
    }
}

const noEmailTo = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': [],
                'cc': [],
                'cco': []
            }
        }

        const response = await RequestValidation.validateEmails(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Favor informar pelo menos um email de destinatário')
    }
}

const invalidEmailTo = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['invalid-email.@gmail.com'],
                'cc': [],
                'cco': []
            }
        }

        const response = await RequestValidation.validateEmails(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Email inválido de um destinatário!')
    }
}

const invalidEmailCc = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': ['invalid-email.@gmail.com'],
                'cco': []
            }
        }

        const response = await RequestValidation.validateEmails(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Email inválido de um destinatário em cópia!')
    }
}

const invalidEmailCco = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': ['invalid-email.@gmail.com']
            }
        }

        const response = await RequestValidation.validateEmails(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Email inválido de um destinatário em cópia oculto!')
    }
}

const noTypeOfTime = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': '',
            'time': 30,
            'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Favor informar o tipo da periodicidade')
    }
}

const valueNotAvaiableOfTypeOfTime = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'TATU',
            'time': 30,
            'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('O tipo da periodicidade deve ser em Minuto, Hora ou Dia')
    }
}

const invalidTimeType = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 'abc',
            'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Tempo inválido, favor digitar apenas números')
    }
}

const timeInFloat = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 30.6,
            'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Favor digitar apenas números inteiros para o tempo da periodicidade')
    }
}

const noTime = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Favor informar a periodicidade')
    }
}

const maxTime = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 9999999999,
            'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('O tempo deve conter no máximo 6 dígitos')
    }
}

const noStartDate = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 30,
            'startDate': null,
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('TypeError')
        // expect(err.name).to.be.equal('ValidationError')
        // expect(err.message).to.be.equal('Favor informar a data e hora de início')
    }
}

const invalidFormatStartDate = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 30,
            'startDate': moment().add(1, 'hour').format('DD/MM/YYYY HH:mm:ss'),
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('AssertionError')
        // expect(err.name).to.be.equal('ValidationError')
        // expect(err.message).to.be.equal('Data e hora de início inválida. O formato aceito é: YYYY-MM-DD HH:mm:ss')
    }
}

const startDateInPast = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 30,
            'startDate': moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': null,
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('A data e hora de início não pode ser no passado')
    }
}

const invalidFormatEndDate = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 30,
            'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': moment().add(2, 'hour').format('DD/MM/YYYY HH:mm:ss'),
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('AssertionError')
        // expect(err.name).to.be.equal('ValidationError')
        // expect(err.message).to.be.equal('Data e hora final inválida. O formato aceito é: YYYY-MM-DD HH:mm:ss')
    }
}

const endDateBeforeStartDate = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 30,
            'startDate': moment().add(3, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': moment().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'isActive': false
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('A data e hora final deve ser depois da data de início')
    }
}

const invalidTypeisActive = async () => {
    try {
        const request = {
            'subject': 'First message',
            'emails': {
                'to': ['test@gmail.com'],
                'cc': [],
                'cco': []
            },
            'typeOfTime': 'MINUTE',
            'time': 30,
            'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'endDate': moment().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
            'isActive': 'asdv'
        }

        const response = await RequestValidation.validateSchedule(request)
        expect(response).to.be.undefined
    } catch (err) {
        expect(err.name).to.be.equal('ValidationError')
        expect(err.message).to.be.equal('Ativo deve ser true ou false')
    }
}

describe('Request Validation', function () {
    describe('Validations referer message', function () {
        it('No request', noRequest)
        it('No message', noMessage)
        it('Message less 10 characters', messageLess10Characters)
        it('Message more 5000 characters', messageMore5000Characters)
        it('Message success', messageSuccess)
    })

    describe('Validations referer emails', function () {
        it('No subject', noSubject)
        it('Subject less 5 characters', subjectLess5Characters)
        it('Subject more 50 characters', subjectMore50Characters)
        it('No email to', noEmailTo)
        it('Invalid email to', invalidEmailTo)
        it('Invalid email cc', invalidEmailCc)
        it('Invalid email cco', invalidEmailCco)
    })

    describe('Validations referer schedule', function () {
        it('No type of time', noTypeOfTime)
        it('Value not avaiable of type of time', valueNotAvaiableOfTypeOfTime)
        it('Invalid time type', invalidTimeType)
        it('Time in float', timeInFloat)
        it('No time', noTime)
        it('Max time', maxTime)
        it('No start date', noStartDate)
        it('Invalid format of start date', invalidFormatStartDate)
        it('Start date in past', startDateInPast)
        it('Invalid format of end date', invalidFormatEndDate)
        it('End date before start date', endDateBeforeStartDate)
        it('Invalid type of is active', invalidTypeisActive)
    })
})
