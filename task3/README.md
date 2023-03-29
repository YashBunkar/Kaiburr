# Task 3


**NOTE:** [README First](/README.md)

### Requirements

- Docker
- docker-compose

## Docker compose Dockerizing multi-container application

#### Containerizing Task1 and Task4 apps

docker-compose.yaml file contains commands to set up multi-container services.

Example docker-compose.yaml file

```
version: '3.1'

services:

  mongod:	#Service name
    image: mongo	#Official MongoDB container image
    container_name: "mongod"
    ports:
    - 27017:27017	#<host-port>:<container-port>

  spring-server:
    image: imbipulkumar/task1javarestapiserver	#My task1 container image. You can set
    ports:                                      #your own task1 container image
    - 8080:8080	#<host-port>:<container-port>
    links:
    - mongod	#Links
```

1. Go to `/Task1docker-compose` folder

2. Run `sudo docker-compose up`
Containers of Task2 and Task4 will load and run.

Web App will start and available at port `80` of the `localhost`.

#### Containerizing Task2 and Task4 apps

1. Go to `/Task1docker-compose` folder

2. Run `sudo docker-compose up`
Containers of Task1 will load and run.

3. Go to `Task4Dockerfile`

4. Run `sudo docker run -p 80:3000 <task4_container_image_name>

Web App will start and available at port `80` of the `localhost`.

**Note:** *The docker-compose part is Documented in Task3*

**If run into problem, do not hesitate to comment or connect :smile: !**