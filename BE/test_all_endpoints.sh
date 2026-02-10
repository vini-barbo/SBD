#!/bin/bash

echo "🧪 Testando todos os endpoints da API SBD"
echo "=========================================="
echo ""

BASE_URL="http://localhost:8099/api"

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
TOTAL=0
SUCCESS=0
FAILED=0

test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    TOTAL=$((TOTAL + 1))
    echo -n "[$TOTAL] $description... "
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" 2>&1)
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data" 2>&1)
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [[ $http_code =~ ^(200|201|204)$ ]]; then
        echo -e "${GREEN}✓ OK${NC} (HTTP $http_code)"
        SUCCESS=$((SUCCESS + 1))
        return 0
    else
        echo -e "${RED}✗ FALHOU${NC} (HTTP $http_code)"
        FAILED=$((FAILED + 1))
        echo "   Resposta: $(echo $body | head -c 100)"
        return 1
    fi
}

echo "📋 1. USERS (Usuários)"
echo "-------------------"
test_endpoint "GET" "/users" "" "Listar usuários"
test_endpoint "GET" "/users/2b4cbfaf-6f6b-443b-9475-b5ea3a17c84a" "" "Buscar usuário por ID"
test_endpoint "GET" "/users/email/joao@email.com" "" "Buscar usuário por email"
test_endpoint "POST" "/users" '{"name":"Maria Santos","email":"maria@test.com","password":"senha123","phone":"(11) 99999-8888"}' "Criar novo usuário"
echo ""

# Capturar ID do usuário criado para testes posteriores
MARIA_ID=$(curl -s "$BASE_URL/users/email/maria@test.com" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

echo "📍 2. ADDRESSES (Endereços)"
echo "-------------------------"
test_endpoint "POST" "/addresses" "{\"userId\":\"$MARIA_ID\",\"street\":\"Rua das Flores, 123\",\"city\":\"São Paulo\",\"state\":\"SP\",\"country\":\"Brasil\",\"zipCode\":\"01234-567\",\"isDefault\":true}" "Criar endereço"
test_endpoint "GET" "/addresses/user/$MARIA_ID" "" "Listar endereços do usuário"
echo ""

# Capturar ID do endereço
ADDR_ID=$(curl -s "$BASE_URL/addresses/user/$MARIA_ID" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

echo "🏷️  3. CATEGORIES (Categorias)"
echo "----------------------------"
test_endpoint "GET" "/categories" "" "Listar categorias"
test_endpoint "GET" "/categories/root" "" "Listar categorias raiz"
test_endpoint "POST" "/categories" '{"name":"Móveis","parentId":null}' "Criar categoria raiz"
echo ""

# Capturar IDs
ELETRONICOS_ID=$(curl -s "$BASE_URL/categories" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
MOVEIS_ID=$(curl -s "$BASE_URL/categories" | grep -o '"name":"Móveis"[^}]*"id":"[^"]*' | grep -o '"id":"[^"]*' | cut -d'"' -f4)

test_endpoint "POST" "/categories" "{\"name\":\"Smartphones\",\"parentId\":\"$ELETRONICOS_ID\"}" "Criar subcategoria"
test_endpoint "GET" "/categories/$ELETRONICOS_ID" "" "Buscar categoria por ID"
echo ""

echo "📦 4. PRODUCTS (Produtos)"
echo "-----------------------"
test_endpoint "GET" "/products" "" "Listar produtos"
test_endpoint "GET" "/products/active" "" "Listar produtos ativos"
test_endpoint "POST" "/products" "{\"name\":\"Galaxy S24\",\"description\":\"Smartphone Samsung\",\"basePrice\":4999.00,\"categoryId\":\"$ELETRONICOS_ID\",\"isActive\":true}" "Criar produto"
echo ""

# Capturar ID do produto
GALAXY_ID=$(curl -s "$BASE_URL/products/search?q=Galaxy" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "GET" "/products/$GALAXY_ID" "" "Buscar produto por ID"
test_endpoint "GET" "/products/search?q=Galaxy" "" "Buscar produtos por termo"
echo ""

echo "🎨 5. PRODUCT VARIANTS (Variantes)"
echo "--------------------------------"
test_endpoint "POST" "/product-variants" "{\"productId\":\"$GALAXY_ID\",\"size\":\"256GB\",\"color\":\"Preto\",\"sku\":\"GALAXY-S24-256-BLK\",\"price\":4999.00}" "Criar variante"
echo ""

# Capturar ID da variante
VARIANT_ID=$(curl -s "$BASE_URL/product-variants/product/$GALAXY_ID" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "GET" "/product-variants/product/$GALAXY_ID" "" "Listar variantes do produto"
test_endpoint "GET" "/product-variants/$VARIANT_ID" "" "Buscar variante por ID"
test_endpoint "GET" "/product-variants/sku/GALAXY-S24-256-BLK" "" "Buscar variante por SKU"
echo ""

echo "📊 6. STOCK (Estoque)"
echo "-------------------"
test_endpoint "POST" "/stock" "{\"productVariantId\":\"$VARIANT_ID\",\"quantity\":100}" "Criar estoque"
echo ""

# Capturar ID do estoque
STOCK_ID=$(curl -s "$BASE_URL/stock/variant/$VARIANT_ID" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

test_endpoint "GET" "/stock/variant/$VARIANT_ID" "" "Buscar estoque por variante"
test_endpoint "PATCH" "/stock/$STOCK_ID/add?quantity=50" "" "Adicionar ao estoque"
test_endpoint "PATCH" "/stock/$STOCK_ID/remove?quantity=10" "" "Remover do estoque"
echo ""

echo "🛒 7. ORDERS (Pedidos)"
echo "--------------------"
test_endpoint "POST" "/orders" "{\"userId\":\"$MARIA_ID\",\"items\":[{\"productVariantId\":\"$VARIANT_ID\",\"quantity\":2}],\"addressId\":\"$ADDR_ID\",\"paymentMethod\":\"CREDIT_CARD\"}" "Criar pedido"
echo ""

# Capturar ID do pedido
ORDER_ID=$(curl -s "$BASE_URL/orders/user/$MARIA_ID" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "GET" "/orders" "" "Listar pedidos"
test_endpoint "GET" "/orders/user/$MARIA_ID" "" "Listar pedidos do usuário"
test_endpoint "GET" "/orders/$ORDER_ID" "" "Buscar pedido por ID"
test_endpoint "PATCH" "/orders/$ORDER_ID/status?status=CONFIRMED" "" "Atualizar status do pedido"
echo ""

echo "=========================================="
echo "📊 RESUMO DOS TESTES"
echo "=========================================="
echo -e "Total de testes: ${YELLOW}$TOTAL${NC}"
echo -e "Sucessos: ${GREEN}$SUCCESS${NC}"
echo -e "Falhas: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ TODOS OS ENDPOINTS ESTÃO FUNCIONANDO!${NC}"
    exit 0
else
    echo -e "${RED}✗ Alguns endpoints falharam. Verifique os logs acima.${NC}"
    exit 1
fi
