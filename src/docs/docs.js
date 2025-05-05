import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API (v1)",
      version: "1.0.0",
      description: "Documentação da API versão 1.0.0 usando Swagger",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do usuário",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nome do usuário",
              example: "Silva",
            },
            cpf: {
              type: "string",
              description: "CPF do usuário",
              example: "123.456.789-00",
            },
            dateOfBirth: {
              type: "string",
              description: "Data de nascimento do usuário",
              example: "1990-01-01",
            },
            password: {
              type: "string",
              description: "Senha do usuário",
              example: "12345678",
            },
            email: {
              type: "string",
              description: "E-mail do usuário",
              example: "silva@example.com",
            },
            role: {
              type: "string",
              description: "Papel do usuário",
              example: "admin",
            },
            addresses: {
              type: "array",
              description: "Lista de endereços do usuário",
              items: {
                $ref: "#/components/schemas/Address",
              },
            },
          },
        },
        Dish: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do prato",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nome do prato",
              example: "Pizza Margherita",
            },
            description: {
              type: "string",
              description: "Descrição do prato",
              example: "Molho de tom",
            },
            price: {
              type: "number",
              description: "Preço do prato",
              example: 29.99,
            },
            category: {
              type: "string",
              description: "Categoria do prato",
              example: "Italiano",
            },
            image: {
              type: "string",
              description: "URL da imagem do prato",
              example: "https://example.com/pizza.jpg",
            },
          },
        },
        Demand: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do pedido",
              example: 1,
            },
            total: {
              type: "number",
              description: "Total do pedido",
              example: 29.99,
            },
            addressId: {
              type: "integer",
              description: "ID do endereço",
              example: 1,
            },
            userId: {
              type: "integer",
              description: "ID do usuário",
              example: 1,
            },
            dateOfDemand: {
              type: "string",
              description: "Data do pedido",
              example: "2021-01-01",
            },
            items: {
              type: "array",
              description: "Lista de itens do pedido",
              items: {
                $ref: "#/components/schemas/Item",
              },
            },
          },
        },
        Item: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do item",
              example: 1,
            },
            amount: {
              type: "integer",
              description: "Quantidade do item",
              example: 2,
            },
            totalPrice: {
              type: "number",
              description: "Preço total do item",
              example: 59.98,
            },
            dishId: {
              type: "integer",
              description: "ID do prato",
              example: 1,
            },
            demandId: {
              type: "integer",
              description: "ID do pedido",
              example: 1,
            },
          },
        },
        Address: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do endereço",
              example: 1,
            },
            road: {
              type: "string",
              example: "Rua das Flores",
            },
            cep: {
              type: "string",
              example: "12345-678",
            },
            neighborhood: {
              type: "string",
              example: "Centro",
            },
            city: {
              type: "string",
              example: "São Paulo",
            },
            uf: {
              type: "string",
              example: "SP",
            },
            number: {
              type: "string",
              example: "123",
            },
            complement: {
              type: "string",
              example: "Apto 101",
            },
            userId: {
              type: "integer",
              description: "ID do usuário",
              example: 1,
            },
          },
        },
        Card: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do Card",
              example: 1,
            },
            cardNumber: {
              type: "string",
              description: "Número do cartão",
              example: "1234 5678 9012 3456",
            },
            cardHolderName: {
              type: "string",
              description: "Nome do titular do cartão",
              example: "João Silva",
            },            
            brand: {
              type: "string",
              description: "Bandeira do cartão",
              example: "Visa",
            },
            userId: {
              type: "integer",
              description: "ID do usuário",
              example: 1,
            },
          }
        }
      },
    },
  },
  apis: [path.resolve(__dirname, "../routes/*.js")],
};
