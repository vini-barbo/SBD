# 📡 Documentação de Endpoints - API SBD E-commerce

**Base URL:** `http://localhost:8099/api`  
**Swagger UI:** `http://localhost:8099/api/swagger-ui.html`

---

## 📑 Índice

- [👥 Users (Usuários)](#-users-usuários)
- [📍 Addresses (Endereços)](#-addresses-endereços)
- [🏷️ Categories (Categorias)](#️-categories-categorias)
- [📦 Products (Produtos)](#-products-produtos)
- [🎨 Product Variants (Variantes)](#-product-variants-variantes)
- [🖼️ Product Images (Imagens)](#️-product-images-imagens)
- [📊 Stock (Estoque)](#-stock-estoque)
- [🛒 Orders (Pedidos)](#-orders-pedidos)

---

## 👥 Users (Usuários)

### Listar todos os usuários (paginado)
```http
GET /users?page=0&size=20&sort=name,asc
```

**Parâmetros de Query:**
- `page` (opcional): Número da página (padrão: 0)
- `size` (opcional): Tamanho da página (padrão: 20)
- `sort` (opcional): Campo de ordenação (ex: name,asc)

**Resposta de Sucesso (200):**
```json
{
  "content": [
    {
      "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 98765-4321",
      "createdAt": "2026-02-09T21:00:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20
  },
  "totalPages": 1,
  "totalElements": 1
}
```

---

### Buscar usuário por ID
```http
GET /users/{id}
```

**Parâmetros de Path:**
- `id`: UUID do usuário

**Resposta de Sucesso (200):**
```json
{
  "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 98765-4321",
  "createdAt": "2026-02-09T21:00:00"
}
```

**Resposta de Erro (404):**
```json
{
  "message": "Usuário não encontrado com ID: {id}",
  "timestamp": "2026-02-09T21:00:00"
}
```

---

### Buscar usuário por email
```http
GET /users/email/{email}
```

**Parâmetros de Path:**
- `email`: Email do usuário

**Resposta de Sucesso (200):**
```json
{
  "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 98765-4321",
  "createdAt": "2026-02-09T21:00:00"
}
```

---

### Criar novo usuário
```http
POST /users
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "phone": "(11) 98765-4321"
}
```

**Validações:**
- `name`: Obrigatório, 2-255 caracteres
- `email`: Obrigatório, formato válido, único
- `password`: Obrigatório, mínimo 6 caracteres
- `phone`: Opcional

**Resposta de Sucesso (201):**
```json
{
  "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 98765-4321",
  "createdAt": "2026-02-09T21:00:00"
}
```

**Resposta de Erro (400):**
```json
{
  "message": "Email já cadastrado: joao@email.com",
  "timestamp": "2026-02-09T21:00:00"
}
```

---

### Atualizar usuário
```http
PUT /users/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "João Silva Santos",
  "email": "joao.novo@email.com",
  "password": "novaSenha123",
  "phone": "(11) 98765-4321"
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "name": "João Silva Santos",
  "email": "joao.novo@email.com",
  "phone": "(11) 98765-4321",
  "createdAt": "2026-02-09T21:00:00"
}
```

---

### Deletar usuário
```http
DELETE /users/{id}
```

**Resposta de Sucesso (204):**
```
No Content
```

---

## 📍 Addresses (Endereços)

### Listar endereços de um usuário
```http
GET /addresses/user/{userId}
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "8f9e7d6c-5b4a-3210-fedc-ba9876543210",
    "userId": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
    "street": "Rua das Flores, 123",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brasil",
    "zipCode": "01234-567",
    "isDefault": true
  }
]
```

---

### Buscar endereço por ID
```http
GET /addresses/{id}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "8f9e7d6c-5b4a-3210-fedc-ba9876543210",
  "userId": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "street": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "zipCode": "01234-567",
  "isDefault": true
}
```

---

### Criar endereço
```http
POST /addresses
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "street": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "zipCode": "01234-567",
  "isDefault": true
}
```

**Validações:**
- `userId`: Obrigatório, deve existir
- `street`: Obrigatório
- `city`: Obrigatório
- `state`: Obrigatório
- `country`: Obrigatório
- `zipCode`: Obrigatório
- `isDefault`: Opcional (padrão: false)

**Resposta de Sucesso (201):**
```json
{
  "id": "8f9e7d6c-5b4a-3210-fedc-ba9876543210",
  "userId": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "street": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "zipCode": "01234-567",
  "isDefault": true
}
```

---

### Atualizar endereço
```http
PUT /addresses/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "street": "Rua das Flores, 456",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "zipCode": "01234-567",
  "isDefault": false
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "8f9e7d6c-5b4a-3210-fedc-ba9876543210",
  "userId": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "street": "Rua das Flores, 456",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "zipCode": "01234-567",
  "isDefault": false
}
```

---

### Deletar endereço
```http
DELETE /addresses/{id}
```

**Resposta de Sucesso (204):**
```
No Content
```

---

## 🏷️ Categories (Categorias)

### Listar todas as categorias
```http
GET /categories
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
    "name": "Eletrônicos",
    "parentId": null,
    "subcategories": [
      {
        "id": "7a8b9c0d-1234-5678-9abc-def012345678",
        "name": "Smartphones",
        "parentId": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
        "subcategories": []
      }
    ]
  }
]
```

---

### Listar categorias raiz (sem pai)
```http
GET /categories/root
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
    "name": "Eletrônicos",
    "parentId": null,
    "subcategories": []
  }
]
```

---

### Buscar categoria por ID
```http
GET /categories/{id}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
  "name": "Eletrônicos",
  "parentId": null,
  "subcategories": []
}
```

---

### Criar categoria
```http
POST /categories
Content-Type: application/json
```

**Request Body (Categoria Raiz):**
```json
{
  "name": "Eletrônicos",
  "parentId": null
}
```

**Request Body (Subcategoria):**
```json
{
  "name": "Smartphones",
  "parentId": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2"
}
```

**Validações:**
- `name`: Obrigatório
- `parentId`: Opcional, deve existir se informado

**Resposta de Sucesso (201):**
```json
{
  "id": "7a8b9c0d-1234-5678-9abc-def012345678",
  "name": "Smartphones",
  "parentId": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
  "subcategories": []
}
```

---

### Atualizar categoria
```http
PUT /categories/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Eletrônicos e Tecnologia",
  "parentId": null
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
  "name": "Eletrônicos e Tecnologia",
  "parentId": null,
  "subcategories": []
}
```

---

### Deletar categoria
```http
DELETE /categories/{id}
```

**Resposta de Sucesso (204):**
```
No Content
```

---

## 📦 Products (Produtos)

### Listar todos os produtos (paginado)
```http
GET /products?page=0&size=20&sort=name,asc
```

**Parâmetros de Query:**
- `page` (opcional): Número da página (padrão: 0)
- `size` (opcional): Tamanho da página (padrão: 20)
- `sort` (opcional): Campo de ordenação

**Resposta de Sucesso (200):**
```json
{
  "content": [
    {
      "id": "e948c21c-a6e4-401e-8449-589ba16442b4",
      "name": "iPhone 15 Pro",
      "description": "Smartphone Apple",
      "basePrice": 7999.00,
      "isActive": true,
      "createdAt": "2026-02-09T21:00:00",
      "category": {
        "id": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
        "name": "Eletrônicos",
        "parentId": null,
        "subcategories": []
      },
      "variants": [],
      "images": []
    }
  ],
  "totalPages": 1,
  "totalElements": 1
}
```

---

### Listar produtos ativos (paginado)
```http
GET /products/active?page=0&size=20
```

**Resposta de Sucesso (200):**
```json
{
  "content": [
    {
      "id": "e948c21c-a6e4-401e-8449-589ba16442b4",
      "name": "iPhone 15 Pro",
      "description": "Smartphone Apple",
      "basePrice": 7999.00,
      "isActive": true,
      "createdAt": "2026-02-09T21:00:00",
      "category": { },
      "variants": [],
      "images": []
    }
  ]
}
```

---

### Buscar produtos por termo (paginado)
```http
GET /products/search?q=iphone&page=0&size=20
```

**Parâmetros de Query:**
- `q`: Termo de busca (busca em nome e descrição)
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Resposta de Sucesso (200):**
```json
{
  "content": [
    {
      "id": "e948c21c-a6e4-401e-8449-589ba16442b4",
      "name": "iPhone 15 Pro",
      "description": "Smartphone Apple",
      "basePrice": 7999.00,
      "isActive": true
    }
  ]
}
```

---

### Buscar produto por ID
```http
GET /products/{id}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "name": "iPhone 15 Pro",
  "description": "Smartphone Apple com chip A17 Pro",
  "basePrice": 7999.00,
  "isActive": true,
  "createdAt": "2026-02-09T21:00:00",
  "category": {
    "id": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
    "name": "Eletrônicos",
    "parentId": null,
    "subcategories": []
  },
  "variants": [],
  "images": []
}
```

---

### Criar produto
```http
POST /products
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "iPhone 15 Pro",
  "description": "Smartphone Apple com chip A17 Pro",
  "basePrice": 7999.00,
  "categoryId": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
  "isActive": true
}
```

**Validações:**
- `name`: Obrigatório
- `description`: Opcional
- `basePrice`: Obrigatório, > 0.01
- `categoryId`: Opcional, deve existir se informado
- `isActive`: Opcional (padrão: true)

**Resposta de Sucesso (201):**
```json
{
  "id": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "name": "iPhone 15 Pro",
  "description": "Smartphone Apple com chip A17 Pro",
  "basePrice": 7999.00,
  "isActive": true,
  "createdAt": "2026-02-09T21:00:00",
  "category": {
    "id": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
    "name": "Eletrônicos"
  },
  "variants": [],
  "images": []
}
```

---

### Atualizar produto
```http
PUT /products/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "iPhone 15 Pro Max",
  "description": "Smartphone Apple com chip A17 Pro - Versão Max",
  "basePrice": 9999.00,
  "categoryId": "4d19ce7c-5956-44ef-ba7c-962adcc9aec2",
  "isActive": true
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "name": "iPhone 15 Pro Max",
  "description": "Smartphone Apple com chip A17 Pro - Versão Max",
  "basePrice": 9999.00,
  "isActive": true
}
```

---

### Deletar produto
```http
DELETE /products/{id}
```

**Resposta de Sucesso (204):**
```
No Content
```

---

## 🎨 Product Variants (Variantes)

### Listar variantes de um produto
```http
GET /product-variants/product/{productId}
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    "productId": "e948c21c-a6e4-401e-8449-589ba16442b4",
    "size": "256GB",
    "color": "Azul Titânio",
    "sku": "IPHONE15PRO-256-BLUE",
    "price": 7999.00,
    "stockQuantity": 100
  }
]
```

---

### Buscar variante por ID
```http
GET /product-variants/{id}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "productId": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "size": "256GB",
  "color": "Azul Titânio",
  "sku": "IPHONE15PRO-256-BLUE",
  "price": 7999.00,
  "stockQuantity": 100
}
```

---

### Buscar variante por SKU
```http
GET /product-variants/sku/{sku}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "productId": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "size": "256GB",
  "color": "Azul Titânio",
  "sku": "IPHONE15PRO-256-BLUE",
  "price": 7999.00,
  "stockQuantity": 100
}
```

---

### Criar variante de produto
```http
POST /product-variants
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "size": "256GB",
  "color": "Azul Titânio",
  "sku": "IPHONE15PRO-256-BLUE",
  "price": 7999.00
}
```

**Validações:**
- `productId`: Obrigatório, deve existir
- `size`: Opcional
- `color`: Opcional
- `sku`: Obrigatório, único
- `price`: Obrigatório, > 0.01

**Resposta de Sucesso (201):**
```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "productId": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "size": "256GB",
  "color": "Azul Titânio",
  "sku": "IPHONE15PRO-256-BLUE",
  "price": 7999.00,
  "stockQuantity": 0
}
```

---

### Atualizar variante
```http
PUT /product-variants/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "size": "512GB",
  "color": "Azul Titânio",
  "sku": "IPHONE15PRO-512-BLUE",
  "price": 8999.00
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "productId": "e948c21c-a6e4-401e-8449-589ba16442b4",
  "size": "512GB",
  "color": "Azul Titânio",
  "sku": "IPHONE15PRO-512-BLUE",
  "price": 8999.00
}
```

---

### Deletar variante
```http
DELETE /product-variants/{id}
```

**Resposta de Sucesso (204):**
```
No Content
```

---

## 📊 Stock (Estoque)

### Buscar estoque por variante
```http
GET /stock/variant/{variantId}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
  "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "sku": "IPHONE15PRO-256-BLUE",
  "quantity": 100
}
```

---

### Criar registro de estoque
```http
POST /stock
Content-Type: application/json
```

**Request Body:**
```json
{
  "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "quantity": 100
}
```

**Validações:**
- `productVariantId`: Obrigatório, deve existir
- `quantity`: Obrigatório, >= 0

**Resposta de Sucesso (201):**
```json
{
  "id": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
  "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "sku": "IPHONE15PRO-256-BLUE",
  "quantity": 100
}
```

---

### Atualizar quantidade em estoque
```http
PUT /stock/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "quantity": 50
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
  "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "sku": "IPHONE15PRO-256-BLUE",
  "quantity": 50
}
```

---

### Adicionar quantidade ao estoque
```http
PATCH /stock/{id}/add?quantity=10
```

**Parâmetros de Query:**
- `quantity`: Quantidade a adicionar

**Resposta de Sucesso (200):**
```json
{
  "id": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
  "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "sku": "IPHONE15PRO-256-BLUE",
  "quantity": 110
}
```

---

### Remover quantidade do estoque
```http
PATCH /stock/{id}/remove?quantity=5
```

**Parâmetros de Query:**
- `quantity`: Quantidade a remover

**Resposta de Sucesso (200):**
```json
{
  "id": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
  "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "sku": "IPHONE15PRO-256-BLUE",
  "quantity": 105
}
```

---

## 🛒 Orders (Pedidos)

### Listar todos os pedidos (paginado)
```http
GET /orders?page=0&size=20&sort=createdAt,desc
```

**Resposta de Sucesso (200):**
```json
{
  "content": [
    {
      "id": "9a8b7c6d-5e4f-3210-fedc-ba9876543210",
      "user": {
        "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
        "name": "João Silva",
        "email": "joao@email.com"
      },
      "status": "PENDING",
      "totalAmount": 15998.00,
      "createdAt": "2026-02-09T21:00:00",
      "items": [
        {
          "id": "item-1",
          "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
          "productName": "iPhone 15 Pro",
          "sku": "IPHONE15PRO-256-BLUE",
          "quantity": 2,
          "price": 7999.00,
          "subtotal": 15998.00
        }
      ],
      "payment": {
        "id": "pay-1",
        "paymentMethod": "CREDIT_CARD",
        "status": "PENDING",
        "paidAt": null
      },
      "shipment": {
        "id": "ship-1",
        "addressId": "8f9e7d6c-5b4a-3210-fedc-ba9876543210",
        "trackingCode": null,
        "shippedAt": null,
        "deliveredAt": null
      }
    }
  ]
}
```

---

### Listar pedidos de um usuário (paginado)
```http
GET /orders/user/{userId}?page=0&size=20
```

**Resposta de Sucesso (200):**
```json
{
  "content": [
    {
      "id": "9a8b7c6d-5e4f-3210-fedc-ba9876543210",
      "user": {
        "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
        "name": "João Silva"
      },
      "status": "PENDING",
      "totalAmount": 15998.00,
      "createdAt": "2026-02-09T21:00:00"
    }
  ]
}
```

---

### Buscar pedido por ID
```http
GET /orders/{id}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "9a8b7c6d-5e4f-3210-fedc-ba9876543210",
  "user": {
    "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 98765-4321"
  },
  "status": "PENDING",
  "totalAmount": 15998.00,
  "createdAt": "2026-02-09T21:00:00",
  "items": [
    {
      "id": "item-1",
      "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "productName": "iPhone 15 Pro",
      "sku": "IPHONE15PRO-256-BLUE",
      "quantity": 2,
      "price": 7999.00,
      "subtotal": 15998.00
    }
  ],
  "payment": {
    "id": "pay-1",
    "paymentMethod": "CREDIT_CARD",
    "status": "PENDING",
    "paidAt": null
  },
  "shipment": {
    "id": "ship-1",
    "addressId": "8f9e7d6c-5b4a-3210-fedc-ba9876543210",
    "trackingCode": null,
    "shippedAt": null,
    "deliveredAt": null
  }
}
```

---

### Criar pedido
```http
POST /orders
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
  "items": [
    {
      "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "quantity": 2
    },
    {
      "productVariantId": "b2c3d4e5-6789-01bc-def0-234567890bcd",
      "quantity": 1
    }
  ],
  "addressId": "8f9e7d6c-5b4a-3210-fedc-ba9876543210",
  "paymentMethod": "CREDIT_CARD"
}
```

**Validações:**
- `userId`: Obrigatório, deve existir
- `items`: Obrigatório, mínimo 1 item
  - `productVariantId`: Obrigatório, deve existir
  - `quantity`: Obrigatório, >= 1
- `addressId`: Opcional, deve existir se informado
- `paymentMethod`: Opcional

**Funcionalidades:**
- Calcula automaticamente o `totalAmount`
- Deduz automaticamente do estoque
- Cria registro de pagamento (se `paymentMethod` informado)
- Cria registro de envio (se `addressId` informado)
- Valida disponibilidade de estoque

**Resposta de Sucesso (201):**
```json
{
  "id": "9a8b7c6d-5e4f-3210-fedc-ba9876543210",
  "user": {
    "id": "2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a",
    "name": "João Silva"
  },
  "status": "PENDING",
  "totalAmount": 15998.00,
  "createdAt": "2026-02-09T21:00:00",
  "items": [
    {
      "id": "item-1",
      "productVariantId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "productName": "iPhone 15 Pro",
      "sku": "IPHONE15PRO-256-BLUE",
      "quantity": 2,
      "price": 7999.00,
      "subtotal": 15998.00
    }
  ],
  "payment": {
    "id": "pay-1",
    "paymentMethod": "CREDIT_CARD",
    "status": "PENDING",
    "paidAt": null
  },
  "shipment": {
    "id": "ship-1",
    "addressId": "8f9e7d6c-5b4a-3210-fedc-ba9876543210",
    "trackingCode": null,
    "shippedAt": null,
    "deliveredAt": null
  }
}
```

**Resposta de Erro (400):**
```json
{
  "message": "Estoque insuficiente para: IPHONE15PRO-256-BLUE",
  "timestamp": "2026-02-09T21:00:00"
}
```

---

### Atualizar status do pedido
```http
PATCH /orders/{id}/status?status=SHIPPED
```

**Parâmetros de Query:**
- `status`: Novo status do pedido

**Status possíveis:**
- `PENDING` - Pendente
- `CONFIRMED` - Confirmado
- `PROCESSING` - Em processamento
- `SHIPPED` - Enviado
- `DELIVERED` - Entregue
- `CANCELLED` - Cancelado

**Resposta de Sucesso (200):**
```json
{
  "id": "9a8b7c6d-5e4f-3210-fedc-ba9876543210",
  "status": "SHIPPED",
  "totalAmount": 15998.00,
  "createdAt": "2026-02-09T21:00:00"
}
```

---

## 🔒 Códigos de Status HTTP

| Código | Significado | Uso |
|--------|------------|-----|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 204 | No Content | Recurso deletado com sucesso |
| 400 | Bad Request | Dados inválidos ou violação de regra de negócio |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

---

## 📝 Notas Importantes

### Paginação
Todos os endpoints que retornam listas suportam paginação:
- `page`: Número da página (começa em 0)
- `size`: Tamanho da página (padrão: 20)
- `sort`: Ordenação (formato: `campo,direção`)

Exemplo:
```
GET /users?page=0&size=10&sort=name,asc
```

### UUIDs
Todos os IDs são UUIDs (Universally Unique Identifier) no formato:
```
2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a
```

### Timestamps
Todas as datas seguem o padrão ISO 8601:
```
2026-02-09T21:00:00
```

### Validações
- Campos obrigatórios são validados automaticamente
- Emails devem ter formato válido
- Preços devem ser maiores que zero
- Quantidades não podem ser negativas

---

## 🧪 Testando a API

### cURL
```bash
# Listar usuários
curl http://localhost:8099/api/users

# Criar usuário
curl -X POST http://localhost:8099/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@email.com","password":"senha123"}'
```

### Swagger UI
Acesse a documentação interativa:
```
http://localhost:8099/api/swagger-ui.html
```

### Postman
Importe a collection usando a URL do Swagger:
```
http://localhost:8099/api/v3/api-docs
```

---

## ⚠️ Segurança

**ATENÇÃO:** Esta API está em desenvolvimento e **NÃO possui**:
- Autenticação
- Autorização
- Criptografia de senha adequada
- Rate limiting
- HTTPS

**Para produção, implemente:**
- Spring Security
- JWT ou OAuth2
- BCrypt para senhas
- HTTPS/TLS
- Rate limiting
- CORS apropriado

---

## 📞 Suporte

Para mais informações:
- Documentação Swagger: http://localhost:8099/api/swagger-ui.html
- Repositório: [Portfolio/applications/SBD](.)

---

**Última atualização:** 09/02/2026
