# SBD API - Guia de Configuração

## Configuração com Docker Compose

### 1. Iniciar o Banco de Dados PostgreSQL

No diretório `/applications/SBD`:

```bash
# Iniciar o PostgreSQL
docker compose up -d

# Verificar se está rodando
docker compose ps

# Ver logs
docker compose logs -f postgres
```

### 2. Verificar se o Banco Está Pronto

```bash
docker exec -it sbd_postgres pg_isready -U sbd_user -d sbd_db
```

### 3. Iniciar a Aplicação Spring Boot

No diretório `/applications/SBD/BE`:

```bash
# Opção 1: Com Maven
mvn spring-boot:run

# Opção 2: Compilar e executar o JAR
mvn clean package
java -jar target/sbd-api-1.0.0.jar
```

## Variáveis de Ambiente

### Arquivo `.env`

As variáveis estão configuradas no arquivo `.env`:

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sbd_db
DB_USER=sbd_user
DB_PASSWORD=sbd_password

# Servidor
SERVER_PORT=8080
CONTEXT_PATH=/api
```

### Usar Variáveis de Ambiente (alternativa)

#### Linux/Mac:
```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=sbd_db
export DB_USER=sbd_user
export DB_PASSWORD=sbd_password
export SERVER_PORT=8080
export CONTEXT_PATH=/api

mvn spring-boot:run
```

#### Windows (PowerShell):
```powershell
$env:DB_HOST="localhost"
$env:DB_PORT="5432"
$env:DB_NAME="sbd_db"
$env:DB_USER="sbd_user"
$env:DB_PASSWORD="sbd_password"
$env:SERVER_PORT="8080"
$env:CONTEXT_PATH="/api"

mvn spring-boot:run
```

## Acessar a Aplicação

- **API Base:** http://localhost:8080/api
- **Swagger UI:** http://localhost:8080/api/swagger-ui.html
- **API Docs:** http://localhost:8080/api/v3/api-docs
- **Health Check:** http://localhost:8080/api/health

## Acessar o Banco de Dados

### Via Docker:
```bash
docker exec -it sbd_postgres psql -U sbd_user -d sbd_db
```

### Via Cliente Local:
```bash
psql -h localhost -p 5432 -U sbd_user -d sbd_db
# Senha: sbd_password
```

### Comandos Úteis SQL:
```sql
-- Listar tabelas
\dt

-- Descrever tabela
\d nome_da_tabela

-- Ver dados
SELECT * FROM nome_da_tabela;

-- Sair
\q
```

## Gerenciar Docker Compose

```bash
# Parar containers
docker compose stop

# Parar e remover containers
docker compose down

# Parar e remover containers + volumes (apaga dados)
docker compose down -v

# Reiniciar
docker compose restart

# Ver logs
docker compose logs -f
```

## Troubleshooting

### Erro de Conexão com Banco

1. Verificar se o PostgreSQL está rodando:
```bash
docker compose ps
```

2. Verificar logs do PostgreSQL:
```bash
docker compose logs postgres
```

3. Testar conexão:
```bash
docker exec -it sbd_postgres pg_isready -U sbd_user
```

### Porta já em Uso

Se a porta 8080 ou 5432 já estiver em uso, altere no `.env`:

```env
DB_PORT=5433
SERVER_PORT=8081
```

### Resetar Banco de Dados

```bash
docker compose down -v
docker compose up -d
```

## Profiles do Spring Boot

Para usar diferentes configurações:

```bash
# Desenvolvimento
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Produção
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```
