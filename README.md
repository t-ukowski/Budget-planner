# Budget planner
## Main functionalities
- [x] account definition & balance preview
- [x] cash-flow diagram
- [x] incomes & expenses planner
- [x] goals definition and realization

## Presentation
https://prezi.com/view/g7zzhV9vtOOGQUXPgk4Q/

## Running the app
### Prerequisites
You need to have Docker installed. Installation process is described [here](https://docs.docker.com/compose/install/).

### Get a clone of this repo and prepare a docker container
Enter the following in your command line:
```
git clone https://github.com/t-ukowski/Budget-planner.git
cd Budget-planner
docker-compose build
```

### Play with the app
Make use of the container you've built in the previous step by clicking on `Start` in your Docker Desktop:

![docker](https://user-images.githubusercontent.com/48785655/172591745-1ac2e939-0192-4ad9-8418-b5f74cc9bee7.png)

Or have some extra fun with the command line:
```
docker-compose up
```

When the compilation processes are done, open your browser and type in [localhost:3000](http://localhost:3000).

To stop the running app, use the following command:
```
docker-compose down
```
