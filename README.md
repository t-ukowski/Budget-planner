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

New user is added automatically if there are no users in the database. 

How to change/set the only user's email (you can do the same with username):
![image](https://user-images.githubusercontent.com/69384237/169008265-32c374c9-6303-41e2-a839-9ba0ae78e715.png)

How to get the only user's info:
![image](https://user-images.githubusercontent.com/69384237/169008371-a1c2fe16-11e4-43e4-a66a-0e0b6b15286e.png)

How to set/edit any user's email/username:
![image](https://user-images.githubusercontent.com/69384237/169008619-5903c1f4-3304-49e8-a014-c68e058428a6.png)
![image](https://user-images.githubusercontent.com/69384237/169008655-8e6fd6f4-aba1-4b6c-b9c0-e134ed2def9e.png)



How to add new goal:
To add a goal without any goal elements you have to make post to http://localhost:8080/goals with goalElementName the same as goalName.
![image](https://user-images.githubusercontent.com/69384237/166660079-75072654-cbfa-4424-a80b-1dcb012abfff.png)

How to add new goal element:
Please remember to choose the existing goalName.
![image](https://user-images.githubusercontent.com/69384237/166660389-57db2a66-484f-4332-a51c-7e44a3219a63.png)

