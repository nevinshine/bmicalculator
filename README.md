💧 Aesthetic BMI CalculatorA modern, glassmorphism-styled Body Mass Index (BMI) calculator built with Angular and Tailwind CSS. This application goes beyond simple calculation by providing instant health insights, ideal weight ranges, hydration recommendations, and static meal/workout plans based on the user's result.✨ Features🎨 Liquid Glass Interface: A beautiful, responsive UI with animated background blobs and glassmorphism effects.🔄 Dual Unit Support: Seamlessly switch between Metric (kg/cm) and Imperial (lbs/ft+in) units.⚡ Instant Calculation: Real-time BMI calculation with visual gauge indicators.🥗 Smart Recommendations:Dietary Tips: Tailored food suggestions based on BMI category.Meal Plans: A daily meal plan guide (Breakfast, Lunch, Dinner, Snack).Workout Routines: Suggested exercises to match fitness goals.💧 Hydration Tracker: Calculates daily water intake based on body weight.⚖️ Ideal Weight: Displays the healthy weight range for your specific height.📱 Fully Responsive: Works perfectly on mobile, tablet, and desktop.🛠️ Tech StackFramework: Angular (Standalone Components)Styling: Tailwind CSSLanguage: TypeScriptState Management: Angular Signals🚀 Getting StartedFollow these instructions to get a copy of the project up and running on your local machine.PrerequisitesEnsure you have Node.js installed on your computer. You can download it from nodejs.org.InstallationClone the repository (or download the ZIP):git clone [https://github.com/YOUR-USERNAME/bmi-calculator.git](https://github.com/YOUR-USERNAME/bmi-calculator.git)
cd bmi-calculator
Install dependencies:npm install
Run the development server:ng serve
Open your browser:Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.📦 Build & DeploymentTo create a production build for deployment (e.g., Netlify, Vercel, GitHub Pages):Build the project:# Standard build
npm run build

# OR if you face path issues on deployment
ng build --base-href=./
Locate the build files:The build artifacts will be stored in the dist/bmi-app/browser directory.Deploy:Upload the contents of the browser folder to your hosting provider.📂 Project Structurebmi-calculator/
├── src/
│   ├── app/
│   │   └── app.component.ts   # Main logic & template (Single File Component)
│   ├── index.html             # HTML entry point
│   ├── main.ts                # Application bootstrapper
│   └── styles.css             # Tailwind directives & global styles
├── tailwind.config.js         # Tailwind configuration
├── angular.json               # Angular CLI configuration
└── package.json               # Dependencies & scripts
🤝 ContributingContributions are welcome! Feel free to fork the repository and submit a pull request.Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📄 LicenseThis project is licensed under the MIT License - see the LICENSE file for details.
