# SBD API - Sistema de Banco de Dados

API REST desenvolvida com Spring Boot, incluindo Swagger, validação de endpoints e conexão com banco de dados.

## 🚀 Tecnologias

- Java 17
- Spring Boot 3.2.2
- Spring Data JPA
- Spring Validation
- SpringDoc OpenAPI (Swagger)
- PostgreSQL / MySQL / H2
- Lombok
- ModelMapper
- Maven

## 📁 Estrutura do Projeto

```
src/
├── main/
│   ├── java/com/portfolio/sbd/
│   │   ├── config/          # Configurações (Swagger, CORS, ModelMapper)
│   │   ├── controller/      # Controllers REST
│   │   ├── service/         # Lógica de negócio
│   │   ├── repository/      # Repositórios JPA
│   │   ├── entity/          # Entidades JPA
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── exception/       # Exceções customizadas e handlers
│   │   └── SbdApiApplication.java
│   └── resources/
│       └── application.yml  # Configurações da aplicação
└── test/                    # Testes unitários e integração
```

## ⚙️ Configuração

### Banco de Dados

O projeto está configurado para usar PostgreSQL por padrão. Edite o arquivo `application.yml` para alterar:

**PostgreSQL (padrão):**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/sbd_db
    username: postgres
    password: postgres
```

**MySQL (alternativo):**
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/sbd_db?useSSL=false&serverTimezone=UTC
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
```

**H2 (para testes):**
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: 
```

## 🏃 Como Executar

### Pré-requisitos
- Java 17 ou superior
- Maven 3.6 ou superior
- PostgreSQL/MySQL instalado e rodando (ou use H2 para desenvolvimento)

### Passos

1. **Clone o repositório** (ou navegue até a pasta BE)

2. **Configure o banco de dados** no `application.yml`

3. **Compile o projeto:**
```bash
mvn clean install
```

4. **Execute a aplicação:**
```bash
mvn spring-boot:run
```

Ou execute o JAR gerado:
```bash
java -jar target/sbd-api-1.0.0.jar
```

5. **Acesse a aplicação:**
   - API: http://localhost:8080/api
   - Swagger UI: http://localhost:8080/api/swagger-ui.html
   - API Docs: http://localhost:8080/api/v3/api-docs
   - Health Check: http://localhost:8080/api/health

## 📚 Documentação da API (Swagger)

Após iniciar a aplicação, acesse:
```
http://localhost:8080/api/swagger-ui.html
```

O Swagger fornece:
- Documentação interativa de todos os endpoints
- Possibilidade de testar os endpoints diretamente
- Modelos de dados (DTOs e Entities)
- Exemplos de requisições e respostas

## ✅ Validação de Endpoints

O projeto utiliza Bean Validation para validar os dados de entrada:

```java
@NotNull(message = "Campo não pode ser nulo")
@NotBlank(message = "Campo não pode estar vazio")
@Size(min = 3, max = 100, message = "Tamanho deve estar entre 3 e 100")
@Email(message = "Email inválido")
@Pattern(regexp = "regex", message = "Formato inválido")
```

## 🔧 Tratamento de Exceções

O projeto possui um tratamento global de exceções que retorna respostas padronizadas:

- `ResourceNotFoundException` - 404 Not Found
- `BadRequestException` - 400 Bad Request
- `MethodArgumentNotValidException` - 400 Bad Request (validação)
- `Exception` - 500 Internal Server Error

Formato de resposta de erro:
```json
{
  "timestamp": "2026-02-09T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Recurso não encontrado",
  "path": "/api/resource/1",
  "errors": []
}
```

## 🔐 CORS

O projeto está configurado para aceitar requisições de:
- http://localhost:3000
- http://localhost:5173
- http://localhost:4200

Edite `CorsConfig.java` para adicionar mais origens.

## 📝 Próximos Passos

Agora que a estrutura básica está pronta, você pode:
1. Criar suas entidades (models)
2. Criar repositórios
3. Criar DTOs
4. Implementar services
5. Implementar controllers com endpoints

## 🛠️ Desenvolvimento

Para desenvolvimento, o projeto inclui:
- Spring Boot DevTools para hot reload
- Logging configurado para DEBUG
- H2 console disponível (quando habilitado)

## 📄 Licença

MIT License
