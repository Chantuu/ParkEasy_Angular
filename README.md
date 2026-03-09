<div align="center">
  <img src="./readme-assets/project-logo.svg" alt="Logo" width="400">
  <h1></h1>
</div>

![Static Badge](https://img.shields.io/badge/angular-v21.1.0-red)
![Static Badge](https://img.shields.io/badge/npm-v11.6.2-green)
![Static Badge](https://img.shields.io/badge/node-v24.13.0-green)
![Static Badge](https://img.shields.io/badge/License-MIT-cyan)

## 📋 Table of Contents

- [📍 Overview](#overview)
- [✨ Features](#-features)
- [🛠️ Built With](#️-built-with)
- [📢 Important Notes](#-important-notes)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Development Server](#development-server)
- [🧰 Angular Development Tools](#-angular-development-tools)
  - [Code Generation](#code-generation)
  - [Building for Production](#building-for-production)
- [🔌 API Integration](#-api-integration)
- [🤝 Credits](#-credits)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

## 📍 Overview

**ParkEasy** is a full-stack application, which gives user data about all parking spots in a parking lot in real time, giving them a peace of mind, when searching for free parking spots, while reducing time spent in that activity. Reservation functionality is also available for users, preventing sudden parking from other drivers to that spot.

This repository contains frontend portion of the application, written in Angular. Main goal of this project is skill demonstration in angular development, where maintanibility, scalabality and reliability represent fundamental principles for software development, while adhering to coding standards.

This project was done as part of the **[GITA (Georgia's Innovation and Technology Agency)](https://gita.gov.ge/en)** course, where I was tasked to create prototype of the innovative product.

## ✨ Features

- **Intuitive Design** - View full parking space data in a simple UI.
- **Real-time SSE Integration** - Get detailed information about parking spot in real-time from sensor.
- **Peservation** - Reserve desired parking spot.
- **Full Reservation History** - Get information about currently active and old reservations.
- **Payment Card Mockup** - Simple Payment Card simulation for improved user experience.
- **Responsive Design** - Optimized for all devices from mobile to desktop.

## 🛠️ Built With

- **Angular** - Frontend framework providing robust component architecture.
- **ngx-env/builder** - Package used to implement .env support for the project.
- **PrimeNG** - UI suite for the angular.

## 📢 Important Notes

Please note, that ESP32 prototype was used for this project, which physically detects 1:42 sized toy cars using HC-SR04 sensors and lights corresponding 5mm RGB LED lamp with corresponding colour.

Detailed information about prototype building will be provided **soon.**

## 🚀 Getting Started

### Prerequisites

- Node.js (`v24.13.0` or later)
- npm (`v11.6.2` or later)
- Angular (`v21.1.0` or later)

### Environment Variables

These environment variables must be set up in `.env`, which is crucial for the application functionality

_Note: This file must be present in project's root directory._

- `NG_APP_API_URL` - Specifies the backend application url, where this app will connect to.

### Installation

```bash
# Clone current repository
git clone https://github.com/Chantuu/ParkEasy_Angular.git
```

```bash
# Install required dependencies
npm install
```

### Development Server

```bash
# Start the development server
ng serve
```

Navigate to `http://localhost:4200/` to see and use the application. The app will automatically reload on any source file changes.

## 🧰 Angular Development Tools

### Code Generation

Angular CLI provides powerful tools to speed up development:

```bash
# Generate a new component
ng generate component component-name

# Generate a service
ng generate service service-name

# See all available generation options
ng generate --help
```

### Building for Production

```bash
# Create optimized production build
ng build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment.

## 🔌 API Integration

This application uses propeitary API developed specifically for this frontend application. You can view this backend application [here.](https://github.com/Chantuu/ParkEasy_NestJS)

## 🤝 Credits

This project makes use of the following open-source tools and resources:

- **[Angular](https://angular.io/)** – Frontend framework powering the application.
- **[PrimeNG](https://primeng.org)** – Open-soucre UI suit for Angular Apllications.
- **[Google Fonts](https://fonts.google.com/)** – Typography used for improved UI/UX.
- **[Shields.io](https://shields.io/)** – Badges used in the README for versioning and project status.

Special thanks to **[GITA (Georgia's Innovation and Technology Agency)](https://gita.gov.ge/en)** for providing required hardware and help to make this project possible.

## 📄 License

This project is licensed under the **MIT License** - See the [LICENSE](https://github.com/Chantuu/Angular_Weather_Forecast?tab=MIT-1-ov-file) file for details.

## 👨‍💻 Author

Thank you for exploring this project! Check out my other work on [GitHub](https://github.com/Chantuu).
