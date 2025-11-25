# BookCare – Fullstack + AI (Integrated)

## Chạy thủ công
Backend:
```
cd backend
cp .env.example .env
# đặt OPENAI_API_KEY nếu dùng AI
npm install
npm run dev
```
Frontend:
```
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

## Docker
```
docker compose up --build
```

## API
- POST /api/auth/login
- GET/POST/PUT/DELETE /api/specialties | /api/clinics | /api/posts (POST/PUT/DELETE cần admin)
- GET/POST /api/doctors
- POST /api/appointments
- POST /api/ai/chat (yêu cầu token)
