const chai = require('chai')
const sinon = require('sinon')

const expect = chai.expect

const EmailConfig = require('../../src/config/email-config')

const EmailService = require('../../src/services/email-service')

const sendMailSuccess = async () => {
    const emailStub = {
        'accepted': ['test@gmail.com'],
        'rejected': [],
        'envelopeTime': 1037,
        'messageTime': 920,
        'messageSize': 11785,
        'response': '250 2.0.0 OK  1583701891 k202sm8515182qke.134 - gsmtp',
        'envelope': { from: 'hugosantos.2012@gmail.com', to: ['test@gmail.com'] },
        'messageId': '<e8c02830-da5e-66bf-52fb-bfaeda02ce94@gmail.com>'
    }

    const stub = sinon.stub(EmailConfig.transporter, 'sendMail').returns(emailStub)

    const request = {
        'name': 'Alan',
        'subject': 'First message',
        'message': 'Hello World!',
        'emails': {
            'to': ['test@gmail.com'],
            'cc': [],
            'cco': []
        }
    }

    const response = await EmailService.sendMail(
        request.name, request.subject, request.message,
        request.emails.to, request.emails.cc, request.emails.cco
    )

    expect(stub.calledOnce).to.be.true
    expect(response).to.not.be.null
    expect(response).to.not.be.undefined
    expect(response.messageId).to.be.not.null
    expect(response.accepted).to.be.not.empty
    expect(response.rejected).to.be.empty
    expect(response.response).to.be.contains('OK')

    stub.restore()
}

describe('Email Service', function () {
    this.timeout(10000)

    it('Send mail success', sendMailSuccess)
})
