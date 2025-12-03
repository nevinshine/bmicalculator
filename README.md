# 💧 Aesthetic BMI Calculator

A modern, glassmorphism-styled **Body Mass Index (BMI) Calculator** built with **Angular** and **Tailwind CSS**.
This application goes beyond simple calculation by offering instant health insights, ideal weight ranges, hydration recommendations, and static meal/workout plans based on user input.

---

## ✨ Features

### 🎨 Liquid Glass Interface

Beautiful, responsive UI featuring animated background blobs and glassmorphism effects.

### 🔄 Dual Unit Support

Seamlessly switch between **Metric (kg/cm)** and **Imperial (lbs/ft+in)** units.

### ⚡ Instant Calculation

Real-time BMI calculation with visual gauge indicators.

### 🥗 Smart Recommendations

* **Dietary Tips** – tailored food suggestions based on BMI category
* **Meal Plans** – daily meal guides (Breakfast, Lunch, Dinner, Snack)
* **Workout Routines** – curated exercises to match fitness goals

### 💧 Hydration Tracker

Automatically calculates suggested daily water intake based on body weight.

### ⚖️ Ideal Weight

Displays healthy weight range for the user’s height.

### 📱 Fully Responsive

Flawless experience across mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

* **Framework:** Angular (Standalone Components)
* **Styling:** Tailwind CSS
* **Language:** TypeScript
* **State Management:** Angular Signals

---

## 🚀 Getting Started

Follow the steps below to set up the project on your local machine.

### **Prerequisites**

Ensure you have **Node.js** installed. Download here: [https://nodejs.org](https://nodejs.org)

---

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/bmi-calculator.git
cd bmi-calculator

# Install dependencies
npm install

# Run the development server
ng serve
```

Now open your browser at: **[http://localhost:4200/](http://localhost:4200/)**
The app will auto-reload when source files change.

---

## 📦 Build & Deployment

To create a production-ready build:

```bash
# Standard build
npm run build

# OR if encountering path issues on deployment
ng build --base-href=./
```

### Locate Build Files

Build output is generated in:

```
dist/bmi-app/browser
```

### Deployment

Upload the **contents of the `browser` folder** to your hosting provider (Netlify, Vercel, GitHub Pages, etc.)

---

## 📂 Project Structure

```
bmi-calculator/
├── src/
│   ├── app/
│   │   └── app.component.ts   # Main logic & template (Single File Component)
│   ├── index.html             # HTML entry point
│   ├── main.ts                # App bootstrapper
│   └── styles.css             # Tailwind directives & global styles
├── tailwind.config.js         # Tailwind configuration
├── angular.json               # Angular CLI config
└── package.json               # Dependencies & scripts
```

---

## 🤝 Contributing

Contributions are welcome!
Follow the standard Git workflow:

```bash
# Fork the Project
# Create your Feature Branch
git checkout -b feature/AmazingFeature

# Commit Your Changes
git commit -m 'Add some AmazingFeature'

# Push to the Branch
git push origin feature/AmazingFeature

# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.
