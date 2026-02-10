#!/bin/bash

# Script para iniciar a aplicação Spring Boot com variáveis de ambiente

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Iniciando SBD API ===${NC}"

# Carregar variáveis do arquivo .env
if [ -f ../.env ]; then
    echo -e "${GREEN}✓ Carregando variáveis de ambiente do arquivo .env${NC}"
    export $(cat ../.env | grep -v '^#' | xargs)
else
    echo -e "${RED}⚠ Arquivo .env não encontrado, usando valores padrão${NC}"
    export DB_HOST=localhost
    export DB_PORT=5432
    export DB_NAME=sbd_db
    export DB_USER=sbd_user
    export DB_PASSWORD=sbd_password
    export SERVER_PORT=8080
    export CONTEXT_PATH=/api
fi

# Exibir configurações
echo -e "${BLUE}Configurações:${NC}"
echo -e "  Database: ${GREEN}${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}${NC}"
echo -e "  Server: ${GREEN}http://localhost:${SERVER_PORT}${CONTEXT_PATH}${NC}"
echo ""

# Executar Maven
echo -e "${BLUE}Iniciando aplicação...${NC}"
mvn spring-boot:run
