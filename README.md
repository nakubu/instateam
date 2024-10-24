# Instateam

## Clone repo

```bash
git clone git@github.com:nakubu/instateam.git
```

## Docker

```bash
cd instateam
docker-compose up --build
```

Open http://localhost:5173/

## Manual

### Client

#### Project Setup

```bash
cd instateam/client
npm install
```

#### Start Development Server

```bash
npm run dev
```

### Server

#### Project Setup

```bash
cd instateam/server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

#### Start Development Server

```bash
python3 manage.py runserver
```

#### Run Tests

```bash
python3 manage.py test api
```
