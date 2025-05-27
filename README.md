# 🍽️ UNT-Cafeteria-MVP

**UNT-Cafeteria-MVP** is a secure, cross-platform mobile application designed for the University of North Texas (UNT) Engineering Department. It allows students and staff to browse cafeteria menus, place orders, and make secure payments through an intuitive mobile interface.

---

## 🚀 Features

- 📱 **Cross-Platform App** – Built with React Native for iOS and Android compatibility.
- 🔐 **UNT Authentication Integration** – Ensures secure, authorized access to university-specific resources.
- 💳 **Stripe Integration** – Enables secure and reliable payment processing for cafeteria orders.
- 🛡️ **Secure Data Handling** – Sensitive user information is encrypted using bcrypt.js and securely stored in MongoDB.
- 🍔 **Menu & Ordering System** – Browse cafeteria items and place real-time orders via the app.
- 📦 **Order History** – Users can view their past orders and transaction details.

---

## 🧰 Tech Stack

**Frontend:**
- React Native
- Expo 

**Backend:**
- Node.js
- Express.js
- MongoDB
- bcrypt.js (for password encryption)
- Stripe API

**Authentication:**
- UNT Single Sign-On (SSO) - Multi factor authentication

---

## 📸 Screenshots
## 📸 Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/48527c69-4cf9-4d98-be93-0057835ee539" alt="Screenshot 1" width="200" height="400" />
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/user-attachments/assets/da954583-409f-497e-ba45-168d9b6e3fc5" alt="Screenshot 2" width="200" height="400" />
    </td>
  </tr>
</table>

---

## 🔧 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or hosted via Atlas)
- Stripe Developer Account
- UNT SSO API access (internal only)
- Expo CLI (for React Native)

---

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/UNT-Cafeteria-MVP.git
cd UNT-Cafeteria-MVP

cd backend
npm install

# Create .env file
touch .env

MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
PORT=5000

npm run dev

cd ../frontend
npm install
npm start

UNT-Cafeteria-MVP/
│
├── backend/              # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
│
├── frontend/             # React Native app
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── assets/

```
