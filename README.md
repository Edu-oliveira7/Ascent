# Ascent

> Plataforma para acompanhamento de treinos e evolução física.

O **Ascent** é uma aplicação web desenvolvida para centralizar o acompanhamento da rotina de treinamento. A proposta é transformar os dados dos treinos em informações úteis para acompanhar consistência, evolução e desempenho ao longo do tempo.

O projeto está sendo desenvolvido com uma arquitetura separando frontend e backend, utilizando uma API REST para comunicação entre as aplicações.

---

## Stack

### Backend

- Python 3.11+
- Django 5.x
- Django REST Framework
- Simple JWT
- SQLite

### Frontend

- React 19
- Vite
- Tailwind CSS
- Lucide React

### Autenticação

- JWT
- Access Token
- Refresh Token
- Proteção de endpoints
- Controle de acesso por usuário

---

## Estrutura

```text
Ascent/
├── backend/
│   ├── apps/
│   │   ├── users/
│   │   ├── workouts/
│   │   └── recovery/
│   ├── config/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
│
└── README.md
