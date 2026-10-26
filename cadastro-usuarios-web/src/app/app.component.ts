import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
interface Usuario {
  id?: number;
  nome: string;
  email: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  numero: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private http = inject(HttpClient);
  usuario: Usuario = this.novoUsuario();
  usuarios: Usuario[] = [];
  mensagem = '';
  carregandoCep = false;
  constructor() {
    this.listar();
  }
  novoUsuario(): Usuario {
    return {
      nome: '',
      email: '',
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: '',
      numero: '',
    };
  }
  buscarCep(): void {
    const cep = this.usuario.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    this.carregandoCep = true;
    this.http
      .get<Record<string, string>>(`/api/enderecos/cep/${cep}`)
      .subscribe({
        next: (e) => {
          Object.assign(this.usuario, {
            logradouro: e['logradouro'] ?? '',
            bairro: e['bairro'] ?? '',
            cidade: e['localidade'] ?? '',
            uf: e['uf'] ?? '',
          });
          this.carregandoCep = false;
        },
        error: () => {
          this.mensagem = 'CEP não encontrado ou serviço indisponível.';
          this.carregandoCep = false;
        },
      });
  }
  salvar(): void {
    this.http.post<Usuario>('/api/usuarios', this.usuario).subscribe({
      next: () => {
        this.mensagem = 'Usuário cadastrado com sucesso!';
        this.usuario = this.novoUsuario();
        this.listar();
      },
      error: () => (this.mensagem = 'Revise os campos e tente novamente.'),
    });
  }
  listar(): void {
    this.http
      .get<Usuario[]>('/api/usuarios')
      .subscribe({
        next: (u) => (this.usuarios = u),
        error: () => (this.usuarios = []),
      });
  }
}
