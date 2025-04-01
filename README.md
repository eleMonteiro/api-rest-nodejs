## Description Basic:

- The project consists of an API where dishes, users and demands are registered.
- It was used in its development of nodejs, sequelize, mysql database, express, express-acl, among other js libraries.

## API routes

> ### Users
>
> - GET All Users
>
> To test `GET` to list all users, create a request to the following route `localhost:3000/api/v1/users/`
>
> - Return
>
> ```json
> [
>   {
>       "id": ,
>       "name": "",
>        "cpf": "",
>        "dateOfBirth": "",
>        "password": "",
>        "email": "",
>        "createdAt": "",
>        "updatedAt": "",
>        "addresses": [],
>        "role": ""
>    }
> ]
> ```
>
> - GET User by id
>
> To test `GET` to list one user by id, create a request to the following route `localhost:3000/api/v1/users/:id`
>
> - Return
>
> ```json
>   {
>       "id": ,
>       "name": "",
>        "cpf": "",
>        "dateOfBirth": "",
>        "password": "",
>        "email": "",
>        "createdAt": "",
>        "updatedAt": "",
>        "addresses": [],
>        "role": ""
>    }
> ```
>
> - GET User by CPF
>
> To test `GET` to list one user by CPF, create a request to the following route `localhost:3000/api/v1/users?cfp=`
>
> - Return
>
> ```json
>   {
>       "id": ,
>       "name": "",
>        "cpf": "",
>        "dateOfBirth": "",
>        "password": "",
>        "email": "",
>        "createdAt": "",
>        "updatedAt": "",
>        "addresses": [],
>        "role": ""
>    }
> ```
>
> - POST User
>
> To test `POST` to create a user, create a request to the following route`localhost:3000/api/v1/users/`
>
> - Body
>
> ```json
>   {
>       "id": ,
>       "name": "",
>        "cpf": "",
>        "dateOfBirth": "",
>        "password": "",
>        "email": "",
>        "createdAt": "",
>        "updatedAt": "",
>        "addresses": [
>           {
>               "road": "",
>               "cep": "",
>               "neighborhood": "",
>               "city": "",
>               "uf": ""
>           }
>         ],
>        "role": "ADMIN"
>    }
> ```
>
> - PUT User
>
> To test `PUT` to update a user, create a request to the following route`localhost:3000/api/v1/users/:id`
>
> - Body
>
> ```json
>   {
>       "id": ,
>       "name": "",
>        "cpf": "",
>        "dateOfBirth": "",
>        "password": "",
>        "email": "",
>        "createdAt": "",
>        "updatedAt": "",
>        "addresses": [
>           {
>               "road": "",
>               "cep": "",
>               "neighborhood": "",
>               "city": "",
>               "uf": ""
>           }
>         ],
>        "role": "ADMIN"
>    }
> ```
>
> - DELETE User
>
> To test `DELETE` to delete a user, create a request to the following route `localhost:3000/api/v1/users/:id`

> ### Dishes
>
> - GET All Dishes
>
> To test `GET` to list all dishes, create a request to the following route `localhost:3000/api/v1/dishes/`
>
> - Return
>
> ```json
> [
>   {
>     "id": 1,
>     "name": "",
>     "description": "",
>     "price": 0.0,
>     "image": ""
>   }
> ]
> ```
>
> - GET Dish by id
>
> To test `GET` to list one dish by id, create a request to the following route `localhost:3000/api/v1/dishes/:id`
>
> - Return
>
> ```json
> {
>   "id": 1,
>   "name": "",
>   "description": "",
>   "price": 0.0,
>   "image": ""
> }
> ```
>
> - POST Dish
>
> To test `POST` to create a dish, create a request to the following route`localhost:3000/api/v1/dishes/`
>
> - Body
>
> ```json
> {
>   "name": "",
>   "description": "",
>   "price": 0.0,
>   "image": ""
> }
> ```
>
> - PUT Dish
>
> To test `PUT` to update a dish, create a request to the following route`localhost:3000/api/v1/dishes/:id`
>
> - Body
>
> ```json
> {
>   "id": 1,
>   "name": "",
>   "description": "",
>   "price": 0.0,
>   "image": ""
> }
> ```
>
> - DELETE Dish
>
> To test `DELETE` to delete a dish, create a request to the following route `localhost:3000/api/v1/dishes/:id`

> ### Demands
>
> - GET All Demands
>
> To test `GET` to list all demands, create a request to the following route `localhost:3000/api/v1/demands/`
>
> - Return
>
> ```json
> [
>   {
>     "total": 7.5,
>     "address": "",
>     "dateOfDemand": "",
>     "user": {
>       "id": 1
>     },
>     "itens": [
>       {
>         "amount": 1,
>         "totalPrice": 2.5,
>         "dish": {
>           "id": 1
>         }
>       }
>     ]
>   }
> ]
> ```
>
> - GET Demand by id
>
> To test `GET` to list one demand by id, create a request to the following route `localhost:3000/api/v1/demands/:id`
>
> - Return
>
> ```json
> {
>   "total": 7.5,
>   "address": "",
>   "dateOfDemand": "",
>   "user": {
>     "id": 1
>   },
>   "itens": [
>     {
>       "amount": 1,
>       "totalPrice": 2.5,
>       "dish": {
>         "id": 1
>       }
>     }
>   ]
> }
> ```
>
> - GET Demand by userId
>
> To test `GET` to list one demand by userId, create a request to the following route `localhost:3000/api/v1/demands?userId=`
>
> - Return
>
> ```json
> [
>   {
>     "total": 7.5,
>     "address": "",
>     "dateOfDemand": "",
>     "user": {
>       "id": 1
>     },
>     "itens": [
>       {
>         "amount": 1,
>         "totalPrice": 2.5,
>         "dish": {
>           "id": 1
>         }
>       }
>     ]
>   }
> ]
> ```
>
> - POST Demand
>
> To test `POST` to create a dish, create a request to the following route`localhost:3000/api/v1/demands/`
>
> - Body
>
> ```json
> {
>   "total": 7.5,
>   "address": "",
>   "dateOfDemand": "",
>   "user": {
>     "id": 1
>   },
>   "itens": [
>     {
>       "amount": 1,
>       "totalPrice": 2.5,
>       "dish": {
>         "id": 1
>       }
>     }
>   ]
> }
> ```
>
> To test `DELETE` to delete a demand, create a request to the following route `localhost:3000/api/v1/demands/:id`
