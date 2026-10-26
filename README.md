# Laboratório DevOps — Cadastro de Usuários

Aplicação full stack com Angular, Spring Boot, H2, ViaCEP e Docker Compose.

## Executar com Docker

Na pasta `06`:

```bash
docker compose up --build -d
```

Acesse <http://localhost:8080>. Para encerrar:

```bash
docker compose down
```

Os cadastros permanecem no volume Docker `dados-h2`.

## Executar sem Docker

Back-end:

```bash
cd cadastro-usuarios
./mvnw spring-boot:run
```

Front-end, em outro terminal:

```bash
cd cadastro-usuarios-web
npm install
npm start
```

## Endpoints

- `GET /api/enderecos/cep/{cep}` — consulta o ViaCEP.
- `POST /api/usuarios` — cadastra um usuário.
- `GET /api/usuarios` — lista os usuários cadastrados.
