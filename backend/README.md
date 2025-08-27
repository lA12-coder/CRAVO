# 📘 README — Food Delivery API

## Food Delivery API

Backend for a single-city food delivery MVP built with **Node.js (JavaScript)**, **Express**, **MongoDB (Mongoose)** and **Firebase Auth**.
Designed to be simple, developer-friendly, and deployment-ready (works with Render / Heroku / Docker). Intended to be used with a React/Next.js frontend or a mobile app.

---

## Table of contents

- [📘 README — Food Delivery API](#-readme--food-delivery-api)
  - [Food Delivery API](#food-delivery-api)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Getting started (local)](#getting-started-local)
  - [Environment variables (`.env.example`)](#environment-variables-envexample)
  - [npm scripts](#npm-scripts)
  - [Folder structure (detailed, simple MERN-friendly)](#folder-structure-detailed-simple-mern-friendly)
  - [Seed data (demo)](#seed-data-demo)
  - [API overview \& sample requests](#api-overview--sample-requests)
    - [Auth](#auth)
    - [Orders](#orders)
    - [Driver endpoints](#driver-endpoints)
    - [Payment webhooks](#payment-webhooks)
  - [Deployment](#deployment)
    - [Render (recommended simple flow)](#render-recommended-simple-flow)
    - [Heroku](#heroku)
    - [Docker \& docker-compose (local)](#docker--docker-compose-local)
  - [Testing](#testing)
  - [Observability \& Health](#observability--health)
  - [Notes \& next steps](#notes--next-steps)

---

## Features

- Firebase-based auth (verify Firebase ID tokens server-side)
- Roles: `customer`, `driver`, `cafe`, `admin`
- Orders lifecycle and basic order state machine
- Driver claim (atomic via Mongo transaction)
- Cloudinary-ready receipts upload endpoint (server-signed)
- Webhook endpoints for Chapa / Telebirr (dev mocks + idempotency)
- Weekly payout job (BullMQ-ready; job scaffolding included)
- Rate limiting, basic helmet security, CORS
- Seed script for demo data

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (or yarn)
- MongoDB Atlas or local MongoDB
- Redis (for BullMQ) — optional for dev but recommended
- Firebase project (Service Account JSON) — for verifying tokens
- Cloudinary account (optional for uploads)
- Chapa / Telebirr keys (for production payments; use dev mocks locally)

---

## Getting started (local)

1. Clone:

```bash
git clone <repo-url>
cd food-delivery-api
```

2. Install:

```bash
npm install
```

3. Create `.env` from the `.env.example` below and fill in values.

4. Run the dev server:

```bash
npm run dev
# opens on PORT from .env (default 3000)
```

---

## Environment variables (`.env.example`)

Create `.env` in repo root. DO NOT commit it.

```
# APP
PORT=3000
NODE_ENV=development
APP_BASE_URL=http://localhost:3000
WEBHOOK_BASE_URL=http://localhost:3000/webhooks

# MONGO
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/food_delivery?retryWrites=true&w=majority

# REDIS (for BullMQ)
REDIS_URL=redis://localhost:6379

# FIREBASE (service account JSON string)
# Paste the JSON credential as a single-line string or load from a file path
FIREBASE_SERVICE_ACCOUNT_KEY='{"type": "...", "project_id":"...", ...}'

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PAYMENTS (dev/test and production)
CHAPA_SECRET_KEY=chapa_test_key_or_live_key
CHAPA_WEBHOOK_SECRET=chapa_webhook_secret
TELEBIRR_APP_ID=telebirr_app_id
TELEBIRR_APP_KEY=telebirr_app_key
TELEBIRR_WEBHOOK_SECRET=telebirr_webhook_secret

# AUTH / JWT (fallback; primary trust is Firebase tokens)
JWT_SECRET=some_local_jwt_secret_for_dev

# LOCATION / CITY
CITY_CENTER_LAT=8.9806
CITY_CENTER_LNG=38.7578
CITY_RADIUS_KM=25

# OTHER
FCM_SERVER_KEY=your_fcm_server_key
```

**Notes**

- For `FIREBASE_SERVICE_ACCOUNT_KEY` you can either paste the JSON contents (wrapped in single quotes) or point to a file path (make code read both variants).
- Keep secrets out of git. Use Render/Heroku secret managers in production.

---

## npm scripts

`package.json` should include:

```json
{
  "scripts": {
    "dev": "nodemon --watch src --exec node -r dotenv/config src/server.js",
    "start": "node -r dotenv/config src/server.js",
    "seed": "node -r dotenv/config src/seed.js",
    "lint": "eslint . --ext .js",
    "test": "jest --runInBand",
    "docker:build": "docker build -t food-delivery-api .",
    "docker:up": "docker-compose up --build"
  }
}
```

---

## Folder structure (detailed, simple MERN-friendly)

```
project-root/
│
├─ .env.example
├─ package.json
├─ Dockerfile
├─ docker-compose.yml
├─ Procfile               # for Heroku / Render (optional)
├─ openapi.yaml           # basic API spec (optional)
├─ README.md
│
└─ src/
   ├─ server.js           # app entry: starts server, loads env, connects DB
   ├─ app.js              # express app: middlewares, routes
   ├─ seed.js             # seed demo data
   │
   ├─ config/
   │   ├─ db.js           # Mongoose connection
   │   ├─ redis.js        # Redis client (BullMQ)
   │   └─ firebase.js     # Firebase admin init + verify token helper
   │
   ├─ models/             # Mongoose schemas
   │   ├─ user.model.js
   │   ├─ cafe.model.js
   │   ├─ driver.model.js
   │   ├─ order.model.js
   │   └─ payout.model.js
   │
   ├─ controllers/        # route handlers
   │   ├─ auth.controller.js
   │   ├─ users.controller.js
   │   ├─ cafes.controller.js
   │   ├─ orders.controller.js
   │   └─ payments.controller.js
   │
   ├─ routes/             # express routers
   │   ├─ auth.routes.js
   │   ├─ users.routes.js
   │   ├─ cafes.routes.js
   │   ├─ orders.routes.js
   │   └─ index.js
   │
   ├─ middlewares/
   │   ├─ auth.middleware.js   # verify firebase token & map roles
   │   ├─ role.middleware.js   # requireRole([...])
   │   └─ error.middleware.js
   │
   ├─ services/
   │   ├─ payment.service.js   # chapa/telebirr mock + verification
   │   └─ notification.service.js # FCM wrapper
   │
   └─ utils/
       ├─ logger.js
       ├─ geo.js               # haversine / fee calc
       └─ idempotency.js       # idempotency key store (simple redis)
```

---

## Seed data (demo)

`src/seed.js` should create:

- 1 city config
- 5 cafés with menus (20 items total)
- 5 drivers (status approved)
- 10 customers
- Some completed & pending orders for testing

Run:

```bash
npm run seed
```

---

## API overview & sample requests

Base URL (dev): `http://localhost:3000/api/v1`

### Auth

- `GET /api/v1/me` — get profile (protected)
- `POST /api/v1/drivers/apply` — create driver profile (pending)
- `POST /api/v1/cafes/apply` — create cafe profile (pending)

**How auth works (simple flow):**

1. Frontend signs in users with Firebase (email/phone).
2. Client sends Firebase ID token in `Authorization: Bearer <ID_TOKEN>` to backend.
3. Backend verifies ID token with Firebase Admin SDK and maps custom claims → role.

**Example request (protected):**

```bash
curl -H "Authorization: Bearer <FIREBASE_ID_TOKEN>" http://localhost:3000/api/v1/me
```

### Orders

- `POST /api/v1/orders/quote` — returns fee breakdown (food + delivery)
- `POST /api/v1/orders` — create order (customer must have paid; backend accepts webhook to mark paid)
- `GET /api/v1/orders/:id`
- `GET /api/v1/orders` — list my orders

### Driver endpoints

- `GET /api/v1/driver/orders/available`
- `POST /api/v1/driver/orders/:id/claim` — atomic claim (409 on race)
- `POST /api/v1/driver/orders/:id/receipt` — upload to Cloudinary

### Payment webhooks

- `POST /webhooks/chapa`
- `POST /webhooks/telebirr`

Idempotency: All state-changing endpoints support `Idempotency-Key` header.

---

## Deployment

### Render (recommended simple flow)

1. Push repo to GitHub.
2. Create a Render Web Service -> connect to repo.
3. Set `Environment` to `Node`.
4. Build command: `npm install && npm run build || true` (no build step needed for JS)
5. Start command: `npm start` (or `npm run start`)
6. Add all `.env` variables in Render dashboard (use the `Environment` secrets UI).
7. If you use Redis, add a Redis instance on Render or use a free Redis provider and set `REDIS_URL`.
8. Points:

   - Use Render Background Worker for the BullMQ worker process if you run jobs: set start command to `node src/jobs/worker.js`.

### Heroku

1. `heroku create`
2. `git push heroku main`
3. `heroku config:set MONGO_URI=... FIREBASE_SERVICE_ACCOUNT_KEY='...' ...`
4. Add Redis add-on or external Redis.
5. Use Procfile:

```
web: node -r dotenv/config src/server.js
worker: node -r dotenv/config src/jobs/worker.js
```

### Docker & docker-compose (local)

`docker-compose.yml` should bring up `api`, `mongo`, and `redis` (optional).

```yaml
version: "3.8"
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/food_delivery
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
  mongo:
    image: mongo:6
    restart: always
    volumes:
      - mongo-data:/data/db
  redis:
    image: redis:7
    restart: always
volumes:
  mongo-data:
```

Run:

```bash
docker-compose up --build
```

---

## Testing

- Use Jest + Supertest for integration tests.
- Add tests for:

  - webhook idempotency
  - concurrent driver claim (simulate 2 claims)
  - order state transitions

- Run:

```bash
npm test
```

You can also export a Postman collection (`openapi.yaml` → import to Postman) and add a Newman job in CI.

---

## Observability & Health

- Health endpoints:

  - `GET /healthz` — liveness
  - `GET /readyz` — checks DB + Redis

- Logging:

  - Winston for JSON logs
  - Morgan for request logs

- Request IDs:

  - Add `x-request-id` middleware to correlate logs across services

---

## Notes & next steps

- **Firebase**: Frontend handles sign-up/login. Backend only verifies ID tokens and uses `uid` as canonical user identifier. For admin activities, set custom claims in Firebase or maintain a `users` collection in DB and admin flags there.
- **Payments**: Use Chapa/Telebirr mocks for local dev. Webhook endpoints should verify signature and be idempotent.
- **Cloudinary**: Use server-signed upload if the client uploads directly. For server-side upload, use Cloudinary SDK and store secure URLs in `orders.receipt`.
- **Scaling**: This simple structure keeps you nimble. When app grows, move modules into `src/modules/*` (modular approach).
- **Mobile**: API is RESTful and works well with React Native — keep CORS and content-type rules loose enough for mobile.
