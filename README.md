# AltMeds API 🩺💊

**AltMeds API** is a backend-only RESTful API developed with **Node.js**, **Express**, and **MongoDB**. It serves as a centralized platform to manage and query **alternative medicines** available in pharmacies, specifically designed to address shortages of imported drugs in crisis zones.

---

## 📌 Project Purpose

Due to frequent unavailability of many imported medicines, pharmacies have resorted to offering **alternative medications**.  
**AltMeds API** allows:
- Registering missing/original medicines
- Registering available alternative medicines
- Mapping each alternative to its original medicine and the pharmacies where it's available
- Managing all records via a secure admin-only interface

---

## 🛠️ Technologies Used

- **Node.js** with **Express** – API server
- **MongoDB** with **Mongoose** – Database & ODM
- **JWT Authentication** – Secure admin login/logout
- **RESTful API Standards** – Clean, consistent endpoints
- **Dotenv** – For environment configuration

---

## 📂 Project Structure

AltMeds-API/

├── config/ # DB and config setup

├── controllers/ # Logic for handling API requests

├── models/ # Mongoose schemas

├── routes/ # Express routes

├── middleware/ # Auth & error handling

├── utils/ # Reusable helpers (e.g. response formatter)

├── .env # Environment variables

├── app.js # App entry point

├── package.json




---

## 🔐 Authentication

- Admin is added manually to the database.
- Only authenticated admin can access protected endpoints.

| Endpoint     | Method | Description       |
|--------------|--------|-------------------|
| `/login`     | POST   | Admin login       |
| `/logout`    | POST   | Admin logout      |

---

## 🔄 API Endpoints

### 🩸 Missing Medicines
| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/missing-medicines`  | Get all missing meds     |
| POST   | `/missing-medicines`  | Add a missing medicine   |
| PUT    | `/missing-medicines/:id` | Update a missing medicine |
| DELETE | `/missing-medicines/:id` | Delete a missing medicine |

### 🏥 Pharmacies
| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | `/pharmacies`     | Get all pharmacies   |
| POST   | `/pharmacies`     | Add a pharmacy       |
| PUT    | `/pharmacies/:id` | Update a pharmacy    |
| DELETE | `/pharmacies/:id` | Delete a pharmacy    |

### 💊 Alternative Medicines
| Method | Endpoint          | Description                                     |
|--------|-------------------|-------------------------------------------------|
| GET    | `/alternatives`   | Get all alternative medicines                  |
| POST   | `/alternatives`   | Add alternative medicine (linked to missing med and pharmacy) |
| PUT    | `/alternatives/:id` | Update an alternative medicine               |
| DELETE | `/alternatives/:id` | Delete an alternative medicine               |

---

## ✅ Response Format

All responses follow a standardized structure:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // relevant data here
  }
}
```

### 🚀 Getting Started
# 1. Clone the repository
```
git clone https://github.com/yourusername/altmeds-api.git
cd altmeds-api
```

# 2. Install dependencies
```
npm install
```
# 3. Set up environment variables

Create a .env file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```
# 4. Run the server
```
npm run dev
```

### ✅ Tech Stack
- Node.js

- Express.js

- MongoDB (native driver)

- JWT (Authentication)

- Joi (Input Validation)

### 👨‍🔧 Developer Notes
- The API follows a clear MVC-like folder structure.

- All sensitive routes are protected by JWT.

- The project does not include a frontend – it's meant to be used as a backend API only.

- You can connect this API to a mobile or web frontend later.



### 📬 Contact
For suggestions or collaboration:
- [Mohammed Sbeata](https://github.com/Mohammed-Sbeata)


