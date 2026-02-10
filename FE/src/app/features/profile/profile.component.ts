import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-5 py-10">
      <h1 class="text-4xl font-bold mb-8 text-gray-800">Meu Perfil</h1>

      <div class="bg-white rounded-lg shadow-md p-8">
        <form [formGroup]="profileForm" (ngSubmit)="updateProfile()" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input formControlName="name" 
                     class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input formControlName="email" type="email" 
                     class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CPF</label>
              <input formControlName="cpf" 
                     class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100" 
                     readonly>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input formControlName="phone" 
                     class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>
          </div>

          <div class="pt-4">
            <button type="submit" 
                    [disabled]="profileForm.invalid || !profileForm.dirty"
                    class="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-medium">
              Salvar Alterações
            </button>
          </div>
        </form>

        <div class="mt-8 pt-8 border-t">
          <h2 class="text-2xl font-bold mb-4">Alterar Senha</h2>
          <form [formGroup]="passwordForm" (ngSubmit)="changePassword()" class="space-y-4 max-w-md">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
              <input formControlName="currentPassword" type="password" 
                     class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
              <input formControlName="newPassword" type="password" 
                     class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
              <input formControlName="confirmPassword" type="password" 
                     class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>

            <button type="submit" 
                    [disabled]="passwordForm.invalid"
                    class="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-medium">
              Alterar Senha
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: [{ value: '', disabled: true }],
      phone: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.profileForm.patchValue(this.currentUser);
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid && this.currentUser) {
      console.log('Atualizar perfil:', this.profileForm.value);
      // TODO: Implementar chamada ao serviço
    }
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;
      if (newPassword !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      console.log('Alterar senha');
      // TODO: Implementar chamada ao serviço
    }
  }
}
