import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-[80vh] bg-gradient-to-br from-primary-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-5 py-20 text-center">
        <h1 class="text-6xl font-bold text-gray-800 mb-6">Bem-vindo à SBD Store</h1>
        <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Encontre os melhores produtos com preços incríveis. 
          Navegue pelo nosso catálogo e aproveite nossas ofertas!
        </p>
        <div class="flex gap-4 justify-center">
          <a routerLink="/catalog" 
             class="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
            Ver Produtos
          </a>
          <a routerLink="/auth/register" 
             class="border-2 border-primary-500 text-primary-500 hover:bg-primary-50 px-8 py-4 rounded-lg text-lg font-medium transition-colors">
            Criar Conta
          </a>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-5 py-16">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div class="text-5xl mb-4">🚚</div>
            <h3 class="text-xl font-bold mb-2">Entrega Rápida</h3>
            <p class="text-gray-600">Receba seus produtos com agilidade e segurança</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div class="text-5xl mb-4">💳</div>
            <h3 class="text-xl font-bold mb-2">Pagamento Seguro</h3>
            <p class="text-gray-600">Múltiplas formas de pagamento disponíveis</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div class="text-5xl mb-4">⭐</div>
            <h3 class="text-xl font-bold mb-2">Qualidade Garantida</h3>
            <p class="text-gray-600">Produtos selecionados com os melhores padrões</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}
