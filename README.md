# Budget-planner
Frontend + backend of web application for income + expenses planner


w application.properties nalezy ustawic:

spring.datasource.url=

spring.datasource.username =

spring.datasource.password =


To get started on the app:
- open the project in your favourite editor (preferably VSCode)
- make sure you have `npm` installed
- go to the frontend directory: `cd frontend`
- run ```npm install``` to get the latest dependencies
- finally, start the web app: `npm start`
- go to http://localhost:3000 to see the app in action

How to add new goal:
To add a goal without any goal elements you have to make post to http://localhost:8080/goals with goalElementName the same as goalName.
![image](https://user-images.githubusercontent.com/69384237/166660079-75072654-cbfa-4424-a80b-1dcb012abfff.png)

How to add new goal element:
Please remember to choose the existing goalName.
![image](https://user-images.githubusercontent.com/69384237/166660389-57db2a66-484f-4332-a51c-7e44a3219a63.png)

