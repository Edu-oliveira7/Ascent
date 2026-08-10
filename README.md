# 🏔️ Ascent

**Ascent** é uma plataforma de gestão de rotina e performance física, projetada como um "sistema operacional pessoal" para atletas que buscam foco, disciplina e alta performance através do rastreamento de dados.

## 🚀 Tecnologias

- **Backend:** Python 3.11+, Django 5.x, Django REST Framework
- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React
- **Autenticação:** JWT (JSON Web Token) com sistema de Refresh Token
- **Banco de Dados:** SQLite (Desenvolvimento)

## 🏗️ Estrutura do Projeto

```bash
Ascent/
├── backend/       # Core da API e Regras de Negócio (Django)
├── frontend/      # Interface do Usuário (React + Vite)
└── README.md      # Documentação Geral
```


## 🛠️ Como Executar

### Backend
1. Entre no diretório: `cd backend`
2. Crie um ambiente virtual: `python -m venv venv`
3. Ative o ambiente: `venv\Scripts\activate` (Windows) ou `source venv/bin/activate` (Linux/Mac)
4. Instale as dependências: `pip install -r requirements.txt`
5. Configure as variáveis de ambiente em um arquivo `.env` local.
6. Execute as migrações: `python manage.py migrate`
7. Inicie o servidor: `python manage.py runserver`

### Frontend
1. Entre no diretório: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`

## 📈 Funcionalidades

- [x] **Gestão de Protocolos:** Criação e edição de treinos personalizados.
- [x] **Registro de Sessões:** Log detalhado de execução com cálculo de volume (kg).
- [x] **Dashboard de Performance:** Métricas de consistência semanal e Recordes Pessoais (PR).
- [x] **Segurança:** Autenticação robusta e proteção de rotas.


