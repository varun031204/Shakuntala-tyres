# Shakuntala Tyres Backend

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Install MongoDB:**
   - Download and install MongoDB Community Server
   - Start MongoDB service

3. **Create admin user:**
   ```bash
   # Start the server first
   npm run dev

   # Then make a POST request to create admin
   curl -X POST http://localhost:5000/api/admin/create \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Tyres
- `GET /api/tyres` - Get all tyres
- `GET /api/tyres/:id` - Get single tyre
- `POST /api/tyres` - Create new tyre (with image upload)
- `PUT /api/tyres/:id` - Update tyre (with image upload)
- `DELETE /api/tyres/:id` - Delete tyre

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/create` - Create admin user

## Frontend Admin Panel

Access the admin panel at: `http://localhost:3000/admin`

Default credentials:
- Username: admin
- Password: admin123

## Features

- Product management with image uploads
- Stock tracking
- Price management
- Status toggle (active/inactive)
- Brand filtering
- Secure admin authentication