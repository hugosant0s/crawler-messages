const moment = require('moment')
const chai = require('chai')
const sinon = require('sinon')

const expect = chai.expect

const EmailScheduleService = require('../../src/services/email-schedule-service')

const Schedule = require('../../src/models/schedule')

const findAllSchedulesToProcess = async () => {
    const schedulesStub = [{
        'id': 1,
        'plataform': 'EMAIL',
        'type_of_time': 'MINUTE',
        'time': 30,
        'subject': 'First message',
        'message': 'Hello World!',
        'to': 'test@gmail.com',
        'cc': '',
        'cco': '',
        'end_date': moment().add(2, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        'last_executed_at': moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')
    }]

    const stub = sinon.stub(Schedule, 'findAllToProcess').returns(schedulesStub)

    const response = await EmailScheduleService.findAllToProcess()

    expect(stub.calledOnce).to.be.true
    expect(response).to.not.be.undefined
    expect(response).to.not.be.empty
    expect(response).to.be.deep.equal([{
        'id': schedulesStub[0].id,
        'plataform': schedulesStub[0].plataform,
        'typeOfTime': schedulesStub[0].type_of_time,
        'time': schedulesStub[0].time,
        'subject': schedulesStub[0].subject,
        'message': schedulesStub[0].message,
        'to': schedulesStub[0].to,
        'cc': schedulesStub[0].cc,
        'cco': schedulesStub[0].cco,
        'endDate': schedulesStub[0].end_date,
        'lastExecutedAt': schedulesStub[0].last_executed_at
    }])

    stub.restore()
}

const updateLastExecutedAt = async () => {
    const updatedStub = {
        fieldCount: 0,
        affectedRows: 0,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '(Rows matched: 0  Changed: 0  Warnings: 0',
        protocol41: true,
        changedRows: 0
    }

    const stub = sinon.stub(Schedule, 'updateLastExecutedAt').returns(updatedStub)

    const response = await EmailScheduleService.updateLastExecutedAt()

    expect(stub.calledOnce).to.be.true
    expect(response).to.be.deep.equal(updatedStub)

    stub.restore()
}

const createScheduleForEmail = async () => {
    const createScheduleStub = {
        insertId: 1
    }

    const stub = sinon.stub(Schedule, 'create').returns(createScheduleStub)

    const request = {
        'subject': 'First message',
        'message': 'Hello World!',
        'emails': {
            'to': ['test@gmail.com'],
            'cc': [],
            'cco': []
        },
        'typeOfTime': 'MINUTE',
        'time': 30,
        'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
        'endDate': moment().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
        'isActive': false
    }

    const response = await EmailScheduleService.createForEmail(
        request.typeOfTime, request.time, request.subject, request.message, request.emails.to,
        request.emails.cc, request.emails.cco, request.startDate, request.endDate, request.isActive
    )

    expect(stub.calledOnce).to.be.true
    expect(response.insertId).to.not.be.null

    stub.restore()
}

const createScheduleForWhatsapp = async () => {
    const createScheduleStub = {
        insertId: 1
    }

    const stub = sinon.stub(Schedule, 'create').returns(createScheduleStub)

    const request = {
        'subject': 'First message',
        'message': 'Hello World!',
        'emails': {
            'to': ['test@gmail.com']
        },
        'typeOfTime': 'MINUTE',
        'time': 30,
        'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
        'endDate': moment().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
        'isActive': false
    }

    const response = await EmailScheduleService.createForWhatsapp(
        request.typeOfTime, request.time, request.subject, request.message,
        request.emails.to, request.startDate, request.endDate, request.isActive
    )

    expect(stub.calledOnce).to.be.true
    expect(response.insertId).to.not.be.null

    stub.restore()
}

const createScheduleForFacebook = async () => {
    const createScheduleStub = {
        insertId: 1
    }

    const stub = sinon.stub(Schedule, 'create').returns(createScheduleStub)

    const request = {
        'subject': 'First message',
        'message': 'Hello World!',
        'emails': {
            'to': ['test@gmail.com']
        },
        'typeOfTime': 'MINUTE',
        'time': 30,
        'startDate': moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
        'endDate': moment().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
        'isActive': false
    }

    const response = await EmailScheduleService.createForFacebook(
        request.typeOfTime, request.time, request.subject, request.message,
        request.emails.to, request.startDate, request.endDate, request.isActive
    )

    expect(stub.calledOnce).to.be.true
    expect(response.insertId).to.not.be.null

    stub.restore()
}

describe('Email Schedule Service', function () {
    this.timeout(10000)

    it('Find all schedules to process', findAllSchedulesToProcess)
    it('Update last executed at', updateLastExecutedAt)

    it('Create schedule for email', createScheduleForEmail)
    it('Create schedule for whatsapp', createScheduleForWhatsapp)
    it('Create schedule for facebook', createScheduleForFacebook)
})
