# Planejamento de Implementação com PrimeNG

## 📋 Visão Geral
Migração da interface atual (Tailwind CSS) para **PrimeNG** - biblioteca de componentes UI para Angular com tema profissional e rico em funcionalidades.

---

## 🔧 1. Setup e Configuração Inicial

### 1.1 Instalação de Dependências
```bash
npm install primeng primeicons primeflex
```

**Pacotes**:
- `primeng`: Biblioteca de componentes
- `primeicons`: Ícones do PrimeNG
- `primeflex`: Utilitários CSS (similar ao Tailwind, mas integrado ao PrimeNG)

### 1.2 Configuração de Estilos
**Arquivos a modificar**: `src/styles.css`, `angular.json`

```css
/* styles.css */
@import 'primeng/resources/themes/lara-light-blue/theme.css';
@import 'primeng/resources/primeng.css';
@import 'primeicons/primeicons.css';
@import 'primeflex/primeflex.css';
```

**Tema escolhido**: `lara-light-blue` (moderno, clean, com azul primário #667eea)

### 1.3 Configuração do Angular
- Configurar `provideAnimations()` no `app.config.ts`
- Importar módulos PrimeNG conforme necessário (standalone components)

---

## 🗺️ 2. Mapeamento de Componentes

### 2.1 Componentes Atuais → PrimeNG

| Componente Atual | PrimeNG Equivalente | Prioridade |
|-----------------|---------------------|------------|
| **Navbar** | `p-menubar` | Alta |
| **Loading Spinner** | `p-progressSpinner` | Alta |
| **Pagination** | `p-paginator` | Alta |
| **Login Form** | `p-card` + `p-inputText` + `p-password` + `p-button` | Alta |
| **Register Form** | `p-card` + `p-inputText` + `p-button` | Alta |
| **Product List** | `p-dataView` ou `p-card` grid | Alta |
| **Product Filters** | `p-dropdown` + `p-slider` | Média |
| **Cart** | `p-table` + `p-button` | Alta |
| **Checkout** | `p-steps` + `p-card` + `p-radioButton` | Alta |
| **Order List** | `p-table` + `p-tag` (status) | Alta |
| **Order Detail** | `p-card` + `p-timeline` | Média |
| **Profile** | `p-tabView` + `p-inputText` | Média |

### 2.2 Componentes Adicionais PrimeNG

| Componente | Uso | Página |
|-----------|-----|--------|
| `p-toast` | Notificações | Global |
| `p-confirmDialog` | Confirmações | Global |
| `p-message` | Mensagens de validação | Forms |
| `p-tag` | Status de pedidos | Orders |
| `p-badge` | Contador do carrinho | Navbar |
| `p-divider` | Separadores | Várias |
| `p-skeleton` | Loading states | Várias |
| `p-dialog` | Modais | Várias |

---

## 📐 3. Estrutura de Implementação

### 3.1 Fase 1 - Core Components (Semana 1)
**Objetivo**: Estabelecer infraestrutura base

#### 3.1.1 Setup (Dia 1)
- [x] Instalar PrimeNG + PrimeIcons + PrimeFlex
- [x] Configurar temas e estilos globais
- [x] Configurar animations no app.config.ts
- [x] Criar serviço de mensagens (MessageService)
- [x] Adicionar Toast global no app.html

#### 3.1.2 Componentes Compartilhados (Dia 2)
**Arquivos**: `src/app/shared/components/`

1. **Navbar** (`navbar.component.ts`)
   - Usar `p-menubar` com menu dinâmico
   - `p-badge` para contador do carrinho
   - `p-avatar` para usuário logado
   - Menu responsivo automático

2. **Loading Spinner** (`loading-spinner.component.ts`)
   - Substituir por `p-progressSpinner`
   - Adicionar `p-blockUI` para overlay

3. **Pagination** (`pagination.component.ts`)
   - Usar `p-paginator`
   - Configurar rows per page options

### 3.2 Fase 2 - Autenticação (Semana 1)
**Objetivo**: Telas de login e registro

#### 3.2.1 Login Component
**Arquivo**: `src/app/features/auth/login/login.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  CardModule,        // p-card para container
  InputTextModule,   // p-inputText para email
  PasswordModule,    // p-password com força
  ButtonModule,      // p-button
  CheckboxModule,    // p-checkbox "Lembrar-me"
  MessageModule      // p-message para erros
]
```

**Layout**:
- Card centralizado com sombra
- Logo no topo
- Campos de email e senha
- Botão primário "Entrar"
- Link "Esqueceu a senha?"
- Link "Criar conta"

#### 3.2.2 Register Component
**Arquivo**: `src/app/features/auth/register/register.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  CardModule,
  InputTextModule,
  InputMaskModule,   // p-inputMask para CPF/telefone
  PasswordModule,
  ButtonModule,
  MessageModule
]
```

**Layout**:
- Card com formulário em duas colunas
- Validações visuais inline
- Indicador de força de senha

### 3.3 Fase 3 - Catálogo de Produtos (Semana 2)
**Objetivo**: Listagem e busca de produtos

#### 3.3.1 Product List Component
**Arquivo**: `src/app/features/catalog/product-list/product-list.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  DataViewModule,    // p-dataView para grid/list
  DropdownModule,    // p-dropdown para filtros
  SliderModule,      // p-slider para faixa de preço
  ButtonModule,
  TagModule,         // p-tag para categorias
  RatingModule,      // p-rating para avaliações
  PaginatorModule
]
```

**Layout**:
- Sidebar com filtros (categorias, preço, rating)
- DataView com opção Grid/List
- Cards de produtos com imagem, nome, preço
- Botão "Adicionar ao carrinho"
- Paginação no rodapé

#### 3.3.2 Product Detail Component (NOVO)
**Arquivo**: `src/app/features/catalog/product-detail/product-detail.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  GalleriaModule,    // p-galleria para galeria de imagens
  SelectButtonModule, // p-selectButton para variantes
  InputNumberModule,  // p-inputNumber para quantidade
  ButtonModule,
  DividerModule,
  TabViewModule      // p-tabView para descrição/specs
]
```

### 3.4 Fase 4 - Carrinho e Checkout (Semana 2-3)

#### 3.4.1 Cart Component
**Arquivo**: `src/app/features/cart/cart/cart.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  TableModule,       // p-table para itens
  ButtonModule,
  InputNumberModule, // p-inputNumber para quantidade
  CardModule,
  DividerModule
]
```

**Layout**:
- Table com colunas: Produto, Preço, Quantidade, Subtotal, Ações
- Resumo lateral com Total
- Botões "Continuar Comprando" e "Finalizar Compra"

#### 3.4.2 Checkout Component
**Arquivo**: `src/app/features/checkout/checkout.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  StepsModule,       // p-steps para stepper
  CardModule,
  InputTextModule,
  InputMaskModule,   // p-inputMask para CEP
  RadioButtonModule, // p-radioButton para pagamento
  ButtonModule,
  DividerModule,
  PanelModule        // p-panel para resumo do pedido
]
```

**Layout**:
- Steps: 1) Endereço, 2) Pagamento, 3) Revisão
- Formulário de endereço com validação
- Seleção de método de pagamento
- Resumo do pedido fixo lateral

### 3.5 Fase 5 - Pedidos (Semana 3)

#### 3.5.1 Order List Component
**Arquivo**: `src/app/features/orders/order-list/order-list.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  TableModule,
  TagModule,         // p-tag para status colorido
  ButtonModule,
  PaginatorModule,
  CalendarModule     // p-calendar para filtro de data
]
```

**Layout**:
- Table com: ID, Data, Status, Total, Ações
- Tags coloridas por status (Pendente=warning, Entregue=success, etc)
- Filtros por data e status
- Paginação

#### 3.5.2 Order Detail Component
**Arquivo**: `src/app/features/orders/order-detail/order-detail.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  CardModule,
  TimelineModule,    // p-timeline para status do pedido
  TableModule,
  TagModule,
  DividerModule,
  ButtonModule
]
```

**Layout**:
- Timeline do status do pedido
- Detalhes do endereço e pagamento
- Table com itens do pedido
- Informações de rastreamento

### 3.6 Fase 6 - Perfil do Usuário (Semana 3)

#### 3.6.1 Profile Component
**Arquivo**: `src/app/features/profile/profile.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  TabViewModule,     // p-tabView para abas
  CardModule,
  InputTextModule,
  InputMaskModule,
  PasswordModule,
  ButtonModule,
  AvatarModule,      // p-avatar para foto
  FileUploadModule   // p-fileUpload para foto
]
```

**Layout**:
- Tabs: "Dados Pessoais", "Endereços", "Segurança"
- Avatar com upload de foto
- Formulários por aba

### 3.7 Fase 7 - Home Page (Semana 4)

#### 3.7.1 Home Component
**Arquivo**: `src/app/features/home/home.component.ts`

**Componentes PrimeNG**:
```typescript
imports: [
  CarouselModule,    // p-carousel para banners
  CardModule,
  ButtonModule,
  DividerModule
]
```

**Layout**:
- Carousel de banners promocionais
- Seção de produtos em destaque
- Cards de categorias
- Call-to-action

---

## 🎨 4. Customização de Tema

### 4.1 Variáveis CSS Customizadas
**Arquivo**: `src/styles.css`

```css
:root {
  --primary-color: #667eea;
  --primary-darker: #5568d3;
  --primary-lighter: #8091f0;
  --surface-ground: #f8f9fa;
  --text-color: #212529;
}
```

### 4.2 Override de Classes PrimeNG
- Ajustar border-radius para 8px (padrão mais arredondado)
- Customizar cores de status (success, warning, danger)
- Ajustar espaçamentos para grid 8px

---

## 🔄 5. Serviços Globais PrimeNG

### 5.1 MessageService
**Arquivo**: `src/app/core/services/notification.service.ts`

```typescript
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private messageService: MessageService) {}

  success(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message
    });
  }

  error(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message
    });
  }
}
```

### 5.2 ConfirmationService
**Para confirmações de ações críticas** (ex: remover item do carrinho, cancelar pedido)

---

## 📦 6. Organização de Imports

### 6.1 Shared Module (Opcional)
Criar `shared/primeng.module.ts` para centralizar imports comuns:

```typescript
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
// ... outros

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    // ... outros
  ]
})
export class PrimeNGModule {}
```

**Vantagem**: Reduz repetição de imports
**Desvantagem**: Aumenta bundle inicial

**Decisão**: Usar imports diretos em cada componente standalone para melhor tree-shaking

---

## 🧪 7. Testes e Validação

### 7.1 Checklist por Componente
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Acessibilidade (ARIA labels)
- [ ] Estados de loading
- [ ] Validações de formulário
- [ ] Mensagens de erro/sucesso
- [ ] Navegação por teclado

### 7.2 Browser Testing
- Chrome/Edge (Desktop)
- Firefox
- Safari (Desktop)
- Mobile browsers (Chrome Mobile, Safari Mobile)

---

## 📊 8. Ordem de Implementação Sugerida

### Sprint 1 (Semana 1)
1. ✅ Setup e configuração
2. ✅ Componentes compartilhados (Navbar, Loading, Pagination)
3. ✅ Login Component
4. ✅ Register Component

### Sprint 2 (Semana 2)
5. ✅ Product List Component
6. ✅ Product Detail Component (NOVO)
7. ✅ Cart Component

### Sprint 3 (Semana 3)
8. ✅ Checkout Component
9. ✅ Order List Component
10. ✅ Order Detail Component

### Sprint 4 (Semana 4)
11. ✅ Profile Component
12. ✅ Home Component
13. ✅ Polimento e refinamentos

---

## 🎯 9. Componentes PrimeNG por Prioridade

### Críticos (Instalar Primeiro)
- `primeng/button` - Botões
- `primeng/card` - Cards
- `primeng/inputtext` - Campos de texto
- `primeng/password` - Campo de senha
- `primeng/toast` - Notificações
- `primeng/progressspinner` - Loading

### Alta Prioridade
- `primeng/menubar` - Navegação
- `primeng/table` - Tabelas
- `primeng/paginator` - Paginação
- `primeng/tag` - Tags/badges
- `primeng/dataview` - Listagem de produtos

### Média Prioridade
- `primeng/steps` - Stepper do checkout
- `primeng/radiobutton` - Radio buttons
- `primeng/dropdown` - Dropdowns
- `primeng/calendar` - Seletor de data
- `primeng/timeline` - Timeline de pedidos

### Baixa Prioridade (Melhorias Futuras)
- `primeng/galleria` - Galeria de imagens
- `primeng/carousel` - Carrossel
- `primeng/rating` - Avaliações
- `primeng/fileupload` - Upload de arquivos

---

## 💡 10. Boas Práticas

### 10.1 Performance
- Usar `trackBy` em `*ngFor` de listas grandes
- Lazy loading de módulos PrimeNG
- Virtual scrolling para listas longas (`p-virtualScroller`)

### 10.2 Acessibilidade
- Sempre adicionar `aria-label` em botões com ícones
- Usar `pTooltip` para informações adicionais
- Garantir navegação por teclado

### 10.3 UX
- Feedback visual imediato (loading spinners)
- Confirmações para ações destrutivas
- Mensagens de sucesso/erro claras
- Estados vazios informativos

---

## 📝 11. Checklist de Migração

### Preparação
- [ ] Instalar PrimeNG, PrimeIcons, PrimeFlex
- [ ] Configurar tema no styles.css
- [ ] Configurar animations no app.config.ts
- [ ] Adicionar MessageService provider
- [ ] Adicionar Toast global

### Componentes
- [ ] Navbar → p-menubar
- [ ] Loading Spinner → p-progressSpinner
- [ ] Pagination → p-paginator
- [ ] Login → PrimeNG forms
- [ ] Register → PrimeNG forms
- [ ] Product List → p-dataView
- [ ] Cart → p-table
- [ ] Checkout → p-steps
- [ ] Order List → p-table + p-tag
- [ ] Order Detail → p-timeline
- [ ] Profile → p-tabView

### Testes
- [ ] Testar em todos navegadores
- [ ] Testar responsividade
- [ ] Testar acessibilidade
- [ ] Testar fluxos completos

---

## 🚀 12. Próximos Passos

1. **Aprovação do Planejamento**: Revisar e aprovar este documento
2. **Setup Inicial**: Executar instalações e configurações
3. **Implementação Iterativa**: Seguir ordem de sprints
4. **Code Review**: Revisar cada componente implementado
5. **Testes**: Validar funcionalidades
6. **Deploy**: Publicar versão com PrimeNG

---

## 📚 Recursos de Referência

- [PrimeNG Documentation](https://primeng.org/)
- [PrimeNG Showcase](https://primeng.org/showcase)
- [PrimeFlex Grid System](https://primeflex.org/)
- [PrimeIcons Catalog](https://primeng.org/icons)
- [Theme Designer](https://designer.primeng.org/)

---

**Estimativa Total**: 3-4 semanas de desenvolvimento
**Esforço**: 1 desenvolvedor full-time
**Resultado**: Aplicação moderna, profissional e rica em funcionalidades com PrimeNG
