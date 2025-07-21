# 🧠 MindMate – Mental Health Companion App  
> Empowering mental wellness with AI, daily tracking, and mindful habits.  
> _Crafted with care by [@ramcodeverse](https://github.com/ramcodeverse)_

---

## 📌 Overview

**MindMate** is a full-stack wellness app that combines the power of **daily mood tracking**, **habit management**, **journaling**, and **AI-powered therapy** to help users take control of their emotional and mental health. Built with empathy and cutting-edge technology, it provides a safe and soothing digital space to reflect, grow, and heal.

---

## ✨ Key Features

| Feature            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| 😄 Mood Tracker     | Log your mood with emojis and notes, track patterns over time              |
| 📓 Daily Journal     | Secure personal journaling with timestamps and emotional context          |
| 📊 Habit Tracker     | Build and track healthy habits with progress visualization                 |
| 🤖 AI Therapist      | Talk to an AI-powered virtual therapist for support and motivation         |
| 📅 Calendar Overview | Visualize habits and mood history via interactive calendar                |
| 🔐 Auth System       | Role-based secure login and registration                                   |
| ☁️ Cloud Sync        | Real-time database updates (MongoDB/Firebase)                              |
| 🎨 Calming UI/UX     | Beautifully themed frontend (React + Tailwind CSS / Chakra UI)             |

---

## 🛠️ Tech Stack

### Frontend:
- **React.js**
- **Tailwind CSS / Chakra UI**
- **React Router**
- **Framer Motion** (animations)

### Backend:
- **Node.js + Express.js**
- **MongoDB** with Mongoose (Atlas Cloud)
- **JWT** for Authentication

### AI Integration:
- **OpenAI GPT-4** API for therapy chatbot

### DevOps (optional):
- **Vercel / Netlify** for frontend deployment
- **Render / Railway** for backend API
- **GitHub Actions** for CI/CD

---

## 🧑‍💻 Installation

### Clone the Repo
```bash
git clone https://github.com/ramcodeverse/mindmate.git
cd mindmate
````

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run start
```

---

## 📂 Folder Structure

```bash
mindmate/
│
├── client/             # React frontend
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── server/             # Express backend
│   ├── routes/
│   ├── models/
│   └── controllers/
│
├── .env.example
└── README.md
```

---

## 🔒 Environment Variables

Rename `.env.example` to `.env` in the `server` folder and add your keys:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

---

## 🧠 AI Therapy Chatbot (GPT Integration)

* OpenAI GPT-4 is integrated with a custom prompt to provide mental wellness advice.
* Responses are context-aware, safe, and supportive.
* Uses moderation filters to ensure ethical use.

---

## 📸 Screenshots
![Screenshot 2025-07-21 191423](https://github.com/user-attachments/assets/e476a2ec-d8d9-4495-8d0f-9f9f6f3b6cb7)
![Screenshot 2025-07-21 191517](https://github.com/user-attachments/assets/9978f2ab-20bb-4040-a6f5-780502ac6941)
![Screenshot 2025-07-21 191543](https://github.com/user-attachments/assets/19ade466-93fd-4594-b68a-2c8f53ac25b5)

![Screenshot 2025-07-21 191612](https://github.com/user-attachments/assets/6502e21a-e01a-425a-9b57-c28ad9a47314)

![Screenshot 2025-07-21 191637](https://github.com/user-attachments/assets/4378e332-117c-47d0-95dd-5f73dbc5e80b)

![Screenshot 2025-07-21 191701](https://github.com/user-attachments/assets/418ea715-1acf-43d2-a0db-9cc656856a3d)

![Screenshot 2025-07-21 191758](https://github.com/user-attachments/assets/99fefe96-3b37-44e2-85e3-e157ef52745f)

---

## 🧪 Roadmap / To-Do

* [x] Journal & Mood Tracker
* [x] GPT-4 AI Therapist
* [x] Habit Calendar
* [ ] Push notifications for reminders
* [ ] Gamified habit badges
* [ ] Voice note journaling
* [ ] Mobile version (React Native)

---

## 🙌 Credits

* Designed and Developed by **[Ram @ramcodeverse](https://github.com/ramcodeverse)**
* AI Powered by [OpenAI](https://openai.com/)
* UI inspired by Calm and Headspace apps

---

## 📃 License

This project is licensed under the MIT License.
Feel free to use and enhance it with proper attribution.

---

> "Healing doesn’t mean the damage never existed. It means the damage no longer controls your life."
> – Akshay Dubey
