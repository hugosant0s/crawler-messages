# Crawler Messages
[![build status](https://img.shields.io/badge/build-passing-green)](https://travis-ci.org/hugosant0s/crawler-messages)
[![License](https://img.shields.io/npm/l/redoc.svg)](https://github.com/Redocly/redoc/blob/master/LICENSE)

## :vertical_traffic_light: Getting Started
Follow this instructions to run the project

### :minidisc: Installing
We recommend using Yarn, but you can use npm.

* First you need to have the [Docker](https://hub.docker.com/_/node/) installed on your computer.

* You will need to run the docker images:

    **MySQL:**
    ```
    docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 -d mysql:latest 
    ``` 

* You need to install the dependencies:

    **Using NPM:**
    ```
    $ npm install
    ```
    **Using Yarn:**
    ```
    $ yarn install
    ```

* Configure your enviroment variables (put your database connection and email credentials):
    ```
    $ cd env
    $ mv .env.default .env
    ```

* Create the databases using the script: public/migrations/script_of_database.sql.

### :rocket: Start the application

**Using NPM:**
```
$ npm start
```
**Using Yarn:**
```
$ yarn start
```

### :book: Docs
Get Insomnia workspace [here](https://raw.githubusercontent.com/hugosant0s/crawler-messages/master/public/docs/Insomnia_2020-03-07.json), import it and start using right now :octocat:

### :eyes: Example:

* Send email manually:
    #### Request
    BASE URL: `http://localhost:8000/api/v1`

    POST `/email/send-message` 
    ```json
    {
    	"subject": "First Message",
    	"message": "Hello World!",
    	"emails": {
    		"to": ["email@gmail.com"],
    		"cc": [],
    		"cco": []
    	}
    }
    ```
    
    #### Response
    ```json
    {
      "message": "Email enviado com sucesso! ID: <54e1923d-0cda-0ab3-a94e-bef1f5668ea1@gmail.com>"
    }
    ```

* Save schedule to send email automatically:
    #### Request
    BASE URL: `http://localhost:8000/api/v1`

    POST `/email/schedule` 
    ```json
    {
    	"subject": "First Message",
    	"message": "Hello World!",
    	"emails": {
    		"to": ["email@gmail.com"],
    		"cc": [],
    		"cco": []
    	},
    	"typeOfTime": "MINUTE",
    	"time": 30,
    	"startDate": "2020-03-08 00:00:00",
    	"endDate": "2020-03-31 23:59:59",
    	"isActive": false
    }
    ```
    
    #### Response
    ```json
    {
      "message": "Agendamento salvo com sucesso!"
    }
    ```
    ![](https://raw.githubusercontent.com/hugosant0s/crawler-messages/master/public/images/example-schedule.png)

## Roadmap
  - [x] ~~send message to email~~
  - [x] ~~create schedule for send messages automatically~~
  - [x] ~~improve request validations~~
  - [ ] configure to use mocha/chai/sinon
  - [ ] improve exception handling
  - [ ] do not send the message as spam
  - [ ] send message to whatsapp
  - [ ] send message to facebook messenger

## Versioning
1.0.0

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/hugosant0s/crawler-messages/blob/master/LICENSE.md) file for details