# ⚙️ Ascent Backend (API)

O núcleo do sistema Ascent, responsável pelo processamento de métricas de performance, persistência de dados e autenticação.

## 🛠️ Tecnologias

- **Django & Django REST Framework**
- **SimpleJWT** (Autenticação robusta)
- **CORS Headers** (Integração com Frontend)

## 🚀 Instalação e Execução

1. **Configurar Ambiente:**
```bash
python -m venv venv
source venv/bin/activate # Ou venv\Scripts\activate no Windows
pip install -r requirements.txt
```

2. **Preparar Banco:**
```bash
python manage.py migrate
```

3. **Subir API:**
```bash
python manage.py runserver
```

## 📡 Endpoints Principais

- `POST /api/token/` - Autenticação de usuário.
- `POST /api/users/register/` - Registro de atletas.
- `GET /api/workouts/` - Protocolos de treino base.
- `GET /api/workouts/logs/stats/` - Estatísticas de performance.

## 📊 Lógica de Cálculo
O volume total é calculado no momento da criação ou atualização de um log de treino, multiplicando as séries, repetições e peso de cada exercício.