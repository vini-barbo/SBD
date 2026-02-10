# API REST - Sistema de E-commerce (SBD)

API REST completa para gerenciamento de e-commerce com Spring Boot.

## 🚀 Tecnologias

- Java 17
- Spring Boot 3.2.2
- Spring Data JPA
- PostgreSQL
- Flyway (Migrations)
- Swagger/OpenAPI
- Lombok
- ModelMapper

## 📡 Endpoints da API

### Base URL
```
http://localhost:8099/api
```

### Documentação Swagger
```
http://localhost:8099/api/swagger-ui.html
```

---

## 👥 Users (Usuários)

### Listar todos os usuários
```http
GET /users?page=0&size=20
```

### Buscar usuário por ID
```http
GET /users/{id}
```

### Buscar usuário por email
```http
GET /users/email/{email}
```

### Criar usuário
```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "phone": "(11) 98765-4321"
}
```

### Atualizar usuário
```http
PUT /users/{id}
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "joao@email.com",
  "password": "novaSenha123",
  "phone": "(11) 98765-4321"
}
```

### Deletar usuário
```http
DELETE /users/{id}
```

---

## 🏷️ Categories (Categorias)

### Listar todas as categorias
```http
GET /categories
```

### Listar categorias raiz (sem pai)
```http
GET /categories/root
```

### Buscar categoria por ID
```http
GET /categories/{id}
```

### Criar categoria
```http
POST /categories
Content-Type: application/json

{
  "name": "Eletrônicos",
  "parentId": null
}
```

### Criar subcategoria
```http
POST /categories
Content-Type: application/json

{
  "name": "Smartphones",
  "parentId": "uuid-da-categoria-pai"
}
```

### Atualizar categoria
```http
PUT /categories/{id}
Content-Type: application/json

{
  "name": "Eletrônicos e Tecnologia",
  "parentId": null
}
```

### Deletar categoria
```http
DELETE /categories/{id}
```

---

## 📦 Products (Produtos)

### Listar todos os produtos
```http
GET /products?page=0&size=20
```

### Listar produtos ativos
```http
GET /products/active?page=0&size=20
```

### Buscar produtos
```http
GET /products/search?q=smartphone&page=0&size=20
```

### Buscar produto por ID
```http
GET /products/{id}
```

### Criar produto
```http
POST /products
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "Smartphone Apple iPhone 15 Pro 256GB",
  "basePrice": 7999.00,
  "categoryId": "uuid-da-categoria",
  "isActive": true
}
```

### Atualizar produto
```http
PUT /products/{id}
Content-Type: application/json

{
  "name": "iPhone 15 Pro Max",
  "description": "Smartphone Apple iPhone 15 Pro Max 512GB",
  "basePrice": 9999.00,
  "categoryId": "uuid-da-categoria",
  "isActive": true
}
```

### Deletar produto
```http
DELETE /products/{id}
```

---

## 🎨 Product Variants (Variantes de Produtos)

### Listar variantes de um produto
```http
GET /product-variants/product/{productId}
```

### Buscar variante por ID
```http
GET /product-variants/{id}
```

### Buscar variante por SKU
```http
GET /product-variants/sku/{sku}
```

### Criar variante
```http
POST /product-variants
Content-Type: application/json

{
  "productId": "uuid-do-produto",
  "size": "256GB",
  "color": "Azul Titânio",
  "sku": "IPHONE15PRO-256-BLUE",
  "price": 7999.00
}
```

### Atualizar variante
```http
PUT /product-variants/{id}
Content-Type: application/json

{
  "productId": "uuid-do-produto",
  "size": "512GB",
  "color": "Azul Titânio",
  "sku": "IPHONE15PRO-512-BLUE",
  "price": 8999.00
}
```

### Deletar variante
```http
DELETE /product-variants/{id}
```

---

## 📍 Addresses (Endereços)

### Listar endereços de um usuário
```http
GET /addresses/user/{userId}
```

### Buscar endereço por ID
```http
GET /addresses/{id}
```

### Criar endereço
```http
POST /addresses
Content-Type: application/json

{
  "userId": "uuid-do-usuario",
  "street": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "zipCode": "01234-567",
  "isDefault": true
}
```

### Atualizar endereço
```http
PUT /addresses/{id}
Content-Type: application/json

{
  "userId": "uuid-do-usuario",
  "street": "Rua das Flores, 456",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "zipCode": "01234-567",
  "isDefault": false
}
```

### Deletar endereço
```http
DELETE /addresses/{id}
```

---

## 📊 Stock (Estoque)

### Buscar estoque por variante
```http
GET /stock/variant/{variantId}
```

### Criar registro de estoque
```http
POST /stock
Content-Type: application/json

{
  "productVariantId": "uuid-da-variante",
  "quantity": 100
}
```

### Atualizar quantidade
```http
PUT /stock/{id}
Content-Type: application/json

{
  "productVariantId": "uuid-da-variante",
  "quantity": 50
}
```

### Adicionar ao estoque
```http
PATCH /stock/{id}/add?quantity=10
```

### Remover do estoque
```http
PATCH /stock/{id}/remove?quantity=5
```

---

## 🛒 Orders (Pedidos)

### Listar todos os pedidos
```http
GET /orders?page=0&size=20
```

### Listar pedidos de um usuário
```http
GET /orders/user/{userId}?page=0&size=20
```

### Buscar pedido por ID
```http
GET /orders/{id}
```

### Criar pedido
```http
POST /orders
Content-Type: application/json

{
  "userId": "uuid-do-usuario",
  "items": [
    {
      "productVariantId": "uuid-da-variante",
      "quantity": 2
    },
    {
      "productVariantId": "uuid-de-outra-variante",
      "quantity": 1
    }
  ],
  "addressId": "uuid-do-endereco",
  "paymentMethod": "CREDIT_CARD"
}
```

### Atualizar status do pedido
```http
PATCH /orders/{id}/status?status=SHIPPED
```

**Status possíveis:**
- `PENDING` - Pendente
- `CONFIRMED` - Confirmado
- `PROCESSING` - Em processamento
- `SHIPPED` - Enviado
- `DELIVERED` - Entregue
- `CANCELLED` - Cancelado

---

## 🔧 Como executar

### 1. Iniciar o banco de dados
```bash
cd applications/SBD
docker-compose up -d
```

### 2. Executar a aplicação
```bash
cd applications/SBD/BE
mvn spring-boot:run
```

### 3. Acessar a documentação
Abra no navegador: http://localhost:8099/api/swagger-ui.html

---

## 📋 Estrutura do Projeto

```
src/main/java/com/portfolio/sbd/
├── config/              # Configurações
├── controller/          # Controllers REST
├── dto/                 # Data Transfer Objects
├── entity/             # Entidades JPA
├── exception/          # Tratamento de exceções
├── repository/         # Repositories JPA
└── service/            # Lógica de negócio
```

---

## 🗃️ Migrations

As migrations do banco são gerenciadas pelo Flyway e estão em:
```
src/main/resources/db/migration/
```

Ao iniciar a aplicação, as migrations são executadas automaticamente.

---

## 🔐 Segurança

⚠️ **ATENÇÃO:** A implementação atual NÃO possui autenticação/autorização e hash de senha adequado. 
Para produção, implemente:
- Spring Security
- JWT ou OAuth2
- BCrypt para hash de senhas
- Rate limiting
- HTTPS

---

## 📝 Licença

Este projeto é parte do portfólio pessoal.
