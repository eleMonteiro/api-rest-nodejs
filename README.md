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
>        "roles": [ ]
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
>        "roles": [ ]
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
>        "roles": [ ]
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
>        "addresses": [
>           {
>               "road": "",
>               "cep": "",
>               "neighborhood": "",
>               "city": "",
>               "uf": ""
>           }
>         ],
>        "roles": [
>           {
>              "id": "ADMIN"
>            }
>          ]
>    }
> ]
> ```
>
> - PUT User
>
> To test `PUT` to update a user, create a request to the following route`localhost:3000/api/v1/users/:id`
>
> - Body
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
>        "addresses": [
>           {
>               "road": "",
>               "cep": "",
>               "neighborhood": "",
>               "city": "",
>               "uf": ""
>           }
>         ],
>        "roles": [
>           {
>              "id": "ADMIN"
>            }
>          ]
>    }
> ]
> ```
>
> - DELETE User
>
> To test `DELETE` to delete a user, create a request to the following route `localhost:3000/api/v1/:id`
