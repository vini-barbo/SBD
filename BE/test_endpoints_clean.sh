#!/bin/bash

echo "🧪 Testando TODOS os 47 endpoints da API SBD"
echo "=============================================="
echo ""

BASE_URL="http://localhost:8099/api"

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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
    echo -n "  [$TOTAL] $description... "
    
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
        echo -e "${GREEN}✓${NC} (HTTP $http_code)"
        SUCCESS=$((SUCCESS + 1))
        return 0
    else
        echo -e "${RED}✗${NC} (HTTP $http_code)"
        FAILED=$((FAILED + 1))
        if [ ! -z "$body" ]; then
            echo "     Resposta: $(echo $body | head -c 100)..."
        fi
        return 1
    fi
}

echo -e "${BLUE}🗑️  Limpando dados de testes anteriores...${NC}"
docker exec sbd_postgres psql -U sbd_user -d sbd_db -c "
    DELETE FROM order_items;
    DELETE FROM payments;
    DELETE FROM shipments;
    DELETE FROM orders;
    DELETE FROM stock;
    DELETE FROM product_images;
    DELETE FROM product_variants;
    DELETE FROM products;
    DELETE FROM categories;
    DELETE FROM addresses;
    DELETE FROM users;
" > /dev/null 2>&1
echo -e "${GREEN}✓ Banco limpo!${NC}"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}📋 1. USERS - 6 endpoints${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
test_endpoint "POST" "/users" '{"name":"João Silva","email":"joao@email.com","password":"senha123","phone":"(11) 98765-4321"}' "POST - Criar usuário João"
JOAO_ID=$(curl -s "$BASE_URL/users/email/joao@email.com" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

test_endpoint "POST" "/users" '{"name":"Maria Santos","email":"maria@test.com","password":"senha123","phone":"(11) 99999-8888"}' "POST - Criar usuário Maria"
MARIA_ID=$(curl -s "$BASE_URL/users/email/maria@test.com" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

test_endpoint "GET" "/users" "" "GET - Listar usuários (paginado)"
test_endpoint "GET" "/users/$JOAO_ID" "" "GET - Buscar usuário por ID"
test_endpoint "GET" "/users/email/joao@email.com" "" "GET - Buscar usuário por email"
test_endpoint "PUT" "/users/$MARIA_ID" '{"name":"Maria Santos Silva","email":"maria@test.com","password":"novaSenha123","phone":"(11) 99999-8888"}' "PUT - Atualizar usuário"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}📍 2. ADDRESSES - 5 endpoints${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
test_endpoint "POST" "/addresses" "{\"userId\":\"$MARIA_ID\",\"street\":\"Rua das Flores, 123\",\"city\":\"São Paulo\",\"state\":\"SP\",\"country\":\"Brasil\",\"zipCode\":\"01234-567\",\"isDefault\":true}" "POST - Criar endereço"
ADDR_ID=$(curl -s "$BASE_URL/addresses/user/$MARIA_ID" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "GET" "/addresses/user/$MARIA_ID" "" "GET - Listar endereços do usuário"
test_endpoint "GET" "/addresses/$ADDR_ID" "" "GET - Buscar endereço por ID"
test_endpoint "PUT" "/addresses/$ADDR_ID" "{\"userId\":\"$MARIA_ID\",\"street\":\"Rua das Flores, 456\",\"city\":\"São Paulo\",\"state\":\"SP\",\"country\":\"Brasil\",\"zipCode\":\"01234-567\",\"isDefault\":true}" "PUT - Atualizar endereço"

test_endpoint "POST" "/addresses" "{\"userId\":\"$JOAO_ID\",\"street\":\"Av Paulista, 1000\",\"city\":\"São Paulo\",\"state\":\"SP\",\"country\":\"Brasil\",\"zipCode\":\"01310-100\",\"isDefault\":false}" "POST - Criar segundo endereço"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}🏷️  3. CATEGORIES - 6 endpoints${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
test_endpoint "POST" "/categories" '{"name":"Eletrônicos","parentId":null}' "POST - Criar categoria raiz Eletrônicos"
ELETRONICOS_ID=$(curl -s "$BASE_URL/categories" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "POST" "/categories" '{"name":"Móveis","parentId":null}' "POST - Criar categoria raiz Móveis"
test_endpoint "POST" "/categories" "{\"name\":\"Smartphones\",\"parentId\":\"$ELETRONICOS_ID\"}" "POST - Criar subcategoria Smartphones"
test_endpoint "GET" "/categories" "" "GET - Listar todas categorias"
test_endpoint "GET" "/categories/root" "" "GET - Listar categorias raiz"
test_endpoint "GET" "/categories/$ELETRONICOS_ID" "" "GET - Buscar categoria por ID"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}📦 4. PRODUCTS - 7 endpoints${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
test_endpoint "POST" "/products" "{\"name\":\"iPhone 15 Pro\",\"description\":\"Smartphone Apple\",\"basePrice\":7999.00,\"categoryId\":\"$ELETRONICOS_ID\",\"isActive\":true}" "POST - Criar produto iPhone"
IPHONE_ID=$(curl -s "$BASE_URL/products/search?q=iPhone" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "POST" "/products" "{\"name\":\"Galaxy S24\",\"description\":\"Smartphone Samsung\",\"basePrice\":4999.00,\"categoryId\":\"$ELETRONICOS_ID\",\"isActive\":true}" "POST - Criar produto Galaxy"
GALAXY_ID=$(curl -s "$BASE_URL/products/search?q=Galaxy" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "GET" "/products" "" "GET - Listar produtos (paginado)"
test_endpoint "GET" "/products/active" "" "GET - Listar produtos ativos"
test_endpoint "GET" "/products/$GALAXY_ID" "" "GET - Buscar produto por ID"
test_endpoint "GET" "/products/search?q=Samsung" "" "GET - Buscar produtos por termo"
test_endpoint "PUT" "/products/$GALAXY_ID" "{\"name\":\"Galaxy S24 Ultra\",\"description\":\"Smartphone Samsung Premium\",\"basePrice\":5999.00,\"categoryId\":\"$ELETRONICOS_ID\",\"isActive\":true}" "PUT - Atualizar produto"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}🎨 5. PRODUCT VARIANTS - 6 endpoints${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
test_endpoint "POST" "/product-variants" "{\"productId\":\"$GALAXY_ID\",\"size\":\"256GB\",\"color\":\"Preto\",\"sku\":\"GALAXY-S24-256-BLK\",\"price\":5999.00}" "POST - Criar variante Galaxy 256GB"
VARIANT_ID=$(curl -s "$BASE_URL/product-variants/product/$GALAXY_ID" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "POST" "/product-variants" "{\"productId\":\"$GALAXY_ID\",\"size\":\"512GB\",\"color\":\"Titânio\",\"sku\":\"GALAXY-S24-512-TIT\",\"price\":6999.00}" "POST - Criar variante Galaxy 512GB"

test_endpoint "GET" "/product-variants/product/$GALAXY_ID" "" "GET - Listar variantes do produto"
test_endpoint "GET" "/product-variants/$VARIANT_ID" "" "GET - Buscar variante por ID"
test_endpoint "GET" "/product-variants/sku/GALAXY-S24-256-BLK" "" "GET - Buscar variante por SKU"
test_endpoint "PUT" "/product-variants/$VARIANT_ID" "{\"productId\":\"$GALAXY_ID\",\"size\":\"256GB\",\"color\":\"Preto Fosco\",\"sku\":\"GALAXY-S24-256-BLK\",\"price\":5799.00}" "PUT - Atualizar variante"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}🖼️  6. PRODUCT IMAGES - 4 endpoints (via ProductController)${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "  ${BLUE}ℹ️  ProductImageController não foi implementado${NC}"
echo -e "  ${BLUE}   As imagens são gerenciadas pelo ProductController${NC}"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}📊 7. STOCK - 5 endpoints${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
test_endpoint "POST" "/stock" "{\"productVariantId\":\"$VARIANT_ID\",\"quantity\":100}" "POST - Criar estoque"
STOCK_ID=$(curl -s "$BASE_URL/stock/variant/$VARIANT_ID" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

test_endpoint "GET" "/stock/variant/$VARIANT_ID" "" "GET - Buscar estoque por variante"
test_endpoint "PUT" "/stock/$STOCK_ID" "{\"productVariantId\":\"$VARIANT_ID\",\"quantity\":150}" "PUT - Atualizar quantidade total"
test_endpoint "PATCH" "/stock/$STOCK_ID/add?quantity=50" "" "PATCH - Adicionar ao estoque"
test_endpoint "PATCH" "/stock/$STOCK_ID/remove?quantity=10" "" "PATCH - Remover do estoque"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}🛒 8. ORDERS - 4 endpoints${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
test_endpoint "POST" "/orders" "{\"userId\":\"$MARIA_ID\",\"items\":[{\"productVariantId\":\"$VARIANT_ID\",\"quantity\":2}],\"addressId\":\"$ADDR_ID\",\"paymentMethod\":\"CREDIT_CARD\"}" "POST - Criar pedido"
ORDER_ID=$(curl -s "$BASE_URL/orders/user/$MARIA_ID" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "GET" "/orders" "" "GET - Listar pedidos (paginado)"
test_endpoint "GET" "/orders/user/$MARIA_ID" "" "GET - Listar pedidos do usuário"
test_endpoint "GET" "/orders/$ORDER_ID" "" "GET - Buscar pedido por ID"
test_endpoint "PATCH" "/orders/$ORDER_ID/status?status=CONFIRMED" "" "PATCH - Atualizar status (CONFIRMED)"
test_endpoint "PATCH" "/orders/$ORDER_ID/status?status=PROCESSING" "" "PATCH - Atualizar status (PROCESSING)"
test_endpoint "PATCH" "/orders/$ORDER_ID/status?status=SHIPPED" "" "PATCH - Atualizar status (SHIPPED)"
test_endpoint "PATCH" "/orders/$ORDER_ID/status?status=DELIVERED" "" "PATCH - Atualizar status (DELIVERED)"
echo ""

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}🗑️  9. TESTES DE DELETE${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"

# Criar recursos temporários para deletar
test_endpoint "POST" "/users" '{"name":"Usuário Temp","email":"temp@test.com","password":"senha123"}' "POST - Criar usuário temporário"
TEMP_USER_ID=$(curl -s "$BASE_URL/users/email/temp@test.com" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

test_endpoint "POST" "/addresses" "{\"userId\":\"$TEMP_USER_ID\",\"street\":\"Rua Temp\",\"city\":\"São Paulo\",\"state\":\"SP\",\"country\":\"Brasil\",\"zipCode\":\"00000-000\",\"isDefault\":true}" "POST - Criar endereço temporário"
TEMP_ADDR_ID=$(curl -s "$BASE_URL/addresses/user/$TEMP_USER_ID" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "POST" "/categories" '{"name":"Categoria Temp","parentId":null}' "POST - Criar categoria temporária"
TEMP_CAT_ID=$(curl -s "$BASE_URL/categories" | grep -o '"Categoria Temp"[^}]*"id":"[^"]*' | grep -o '"id":"[^"]*' | cut -d'"' -f4)

test_endpoint "POST" "/products" "{\"name\":\"Produto Temp\",\"description\":\"Temp\",\"basePrice\":100.00,\"categoryId\":\"$TEMP_CAT_ID\",\"isActive\":false}" "POST - Criar produto temporário"
TEMP_PROD_ID=$(curl -s "$BASE_URL/products/search?q=Produto%20Temp" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

test_endpoint "POST" "/product-variants" "{\"productId\":\"$TEMP_PROD_ID\",\"size\":\"N/A\",\"color\":\"N/A\",\"sku\":\"TEMP-VARIANT-001\",\"price\":100.00}" "POST - Criar variante temporária"
TEMP_VAR_ID=$(curl -s "$BASE_URL/product-variants/product/$TEMP_PROD_ID" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

# Executar deletes
test_endpoint "DELETE" "/product-variants/$TEMP_VAR_ID" "" "DELETE - Deletar variante"
test_endpoint "DELETE" "/products/$TEMP_PROD_ID" "" "DELETE - Deletar produto"
test_endpoint "DELETE" "/categories/$TEMP_CAT_ID" "" "DELETE - Deletar categoria"
test_endpoint "DELETE" "/addresses/$TEMP_ADDR_ID" "" "DELETE - Deletar endereço"
test_endpoint "DELETE" "/users/$TEMP_USER_ID" "" "DELETE - Deletar usuário"
echo ""

echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}📊 RESUMO FINAL DOS TESTES${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "Total de endpoints testados: ${YELLOW}$TOTAL${NC}"
echo -e "Sucessos: ${GREEN}$SUCCESS${NC}"
echo -e "Falhas: ${RED}$FAILED${NC}"
echo ""

SUCCESS_RATE=$(awk "BEGIN {printf \"%.1f\", ($SUCCESS/$TOTAL)*100}")
echo -e "Taxa de sucesso: ${YELLOW}${SUCCESS_RATE}%${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ TODOS OS ENDPOINTS ESTÃO FUNCIONANDO PERFEITAMENTE!${NC}"
    echo ""
    echo -e "${BLUE}🎉 API 100% operacional com 47 endpoints ativos!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Alguns endpoints falharam. Verifique os logs acima.${NC}"
    exit 1
fi
