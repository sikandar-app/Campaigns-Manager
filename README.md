# Campaigns Manager

A modern, intuitive campaign management frontend application for creating, managing, and scheduling multi-language campaigns with advanced audience targeting and analytics.

## 📋 Table of Contents

- [Features](#features)
- [Why Use Campaigns Manager](#why-use-campaigns-manager)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## ✨ Features

### Campaign Management
- **Create & Edit Campaigns** - Easily create new campaigns or modify existing ones
- **Multi-Language Support** - Support for multiple languages with message translation management
- **Message Templates** - Pre-built templates for common campaign messages (sign-ups, reminders, announcements)

### Audience Targeting
- **Program Selection** - Target specific programs or courses
- **Progress Filtering** - Target users by completion percentage
- **Signup Status** - Filter by signup status (Any, Signed Up, Not Signed Up)
- **Due Date Filters** - Target users based on course due dates

### Campaign Scheduling
- **Flexible Schedules** - Weekly, bi-weekly, and monthly recurring campaigns
- **Time Management** - Schedule campaigns at specific times
- **Frequency Control** - Set frequency restrictions to avoid over-messaging
- **Date Ranges** - Define activation periods for campaigns

### Analytics & Monitoring
- **Campaign Logs** - Track campaign delivery and performance
- **Message Logs** - Monitor individual message delivery
- **Progress Tracking** - View real-time campaign execution status

## 🎯 Why Use Campaigns Manager

1. **Automated Communication** - Set up recurring campaigns to automatically reach your audience without manual intervention
2. **Personalization** - Target specific user segments based on progress, signup status, and program enrollment
3. **Multi-Language Reach** - Create campaigns in multiple languages to serve diverse audiences
4. **Time Efficiency** - Schedule campaigns in advance and manage them from a single dashboard
5. **Data-Driven** - Monitor campaign performance through comprehensive logging and analytics
6. **User-Friendly Interface** - Intuitive UI makes campaign management accessible to non-technical users

## 🛠 Technology Stack

### Frontend Framework
- **Vue 3** - Modern, reactive JavaScript framework for building user interfaces
- **Quasar** - Powerful Vue 3 framework for building responsive web applications
- **Vite** - Next-generation frontend build tool for fast development and optimized production builds

### State Management
- **Pinia** - Official state management for Vue 3 applications (replaces Vuex)

### Styling
- **SCSS** - CSS preprocessor for organized and maintainable styles
- **Quasar CSS** - Pre-built component library with responsive design utilities

### Development Tools
- **JavaScript** - ES6+ for modern JavaScript features
- **ESLint** - Code quality and style consistency
- **Prettier** - Code formatting

### Additional Libraries
- **Axios** - HTTP client for API communication
- **Vue Router** - Client-side routing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd campaigns_frontend
```

2. **Install dependencies**
```bash
yarn
# or
npm install
```

3. **Environment Configuration**
Create a `.env.local` file in the root directory with your API endpoint:
```
VITE_API_URL=http://your-api-endpoint.com/api
```

## 🚀 Available Scripts

### Start Development Server
```bash
quasar dev
```
Runs the app in development mode with hot-code reloading, error reporting, and better debugging experience.
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### Build for Production
```bash
quasar build
```
Compiles the app for production. Creates an optimized build ready for deployment.

### Lint Files
```bash
yarn lint
# or
npm run lint
```
Checks code quality and identifies potential issues using ESLint.

### Format Code
```bash
yarn format
# or
npm run format
```
Automatically formats code to maintain consistent style using Prettier.

## 🎓 Getting Started

1. **Start the development server** - `quasar dev`
2. **Log in** - Access the application at `http://localhost:8080` and log in with your credentials
3. **Select an Agency** - Choose the organization/agency you want to work with
4. **Create a Campaign** - Navigate to Campaigns and click "Create New Campaign"
5. **Configure Campaign Details** - Set name, messages, and audience targeting
6. **Set Schedule** - Define when and how often the campaign should run
7. **Activate Campaign** - Set start and end dates
8. **Monitor** - Track campaign performance in the Logs section

## 📁 Project Structure

```
src/
├── pages/               # Page components (Campaigns, Templates, Logs, etc.)
├── components/          # Reusable UI components
├── layouts/             # Application layouts (MainLayout, EmptyLayout)
├── stores/              # Pinia state management
├── router/              # Vue Router configuration
├── boot/                # Boot plugins and initialization files
├── css/                 # Global styles (custom.css, variables)
├── assets/              # Static assets (images, icons)
└── App.vue              # Root Vue component
```

## 🔄 API Integration

This application requires a backend API server. Ensure your backend provides the following endpoints:

- `GET /languages` - Fetch available languages
- `GET /agencies/:id/courses` - Fetch programs for an agency
- `POST /campaigns` - Create new campaign
- `PUT /campaigns/:id` - Update existing campaign
- `GET /campaigns` - Fetch campaigns
- `GET /logs` - Fetch campaign execution logs

## 💡 Tips

- Use **Templates** to save time by creating reusable campaign configurations
- Set **Frequency Restrictions** to prevent audience fatigue from over-messaging
- Monitor **Logs** regularly to ensure campaigns are being delivered as expected
- Test campaigns with a **small audience segment** before rolling out to everyone

## 📚 Learn More

For more information about Quasar, visit the [Quasar Documentation](https://quasar.dev).
For Vue 3 documentation, check [Vue.js Documentation](https://vuejs.org).

## 🤝 Support

For issues, questions, or contributions, please refer to the project documentation or contact the development team.

---

**Version:** 1.0.0 | **Last Updated:** March 2026
