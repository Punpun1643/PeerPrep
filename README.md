
# CS3219-AY22-23-G12

![example event parameter](https://github.com/Punpun1643/PeerPrep/actions/workflows/main.yml/badge.svg?event=push)

## Local deployment (dockerized)

### Set-up:

1. Ensure that Docker desktop application is running. 
2. Go to the root directory of the repository.
3. Run the following command:
    ```bash
    #build and run each microservice using docker-compose
    docker-compose up --build -d
    ```
4. After the docker containers are up, navigate to  `localhost:3000` on your web browser and start using the application. 


### Tear down:
1. Run the following command:
   ```bash
   # tear down containers 
   docker-compose down
   ```

## Running Locally (without Docker):
To switch from dockerized version to local development, 
1. Go to the root directory of the repository.
2. Run the following command:
   ```bash 
   cd matching-service
   ```
3. Open `configs.js` and set `isDocker` toggle to false. 
4. Run the following command to go back to the root directory:
    ```bash 
   cd..
   ```
5. Ensure that you are in the root directory before opening a new terminal and run the following command:
   ``` bash 
   cd user-service
   npm run dev 
   ``` 
6. Repeat Step 5 for the other microservices `matching-service`, `question-service`, `chat-service`, and `history-service`.

7. Lastly, to get the frontend working, run the following command from root directory:
   ``` bash
   cd frontend
   npm start 
   ```
8. Navigate to  `localhost:3000` on your web browser and start using the application.

