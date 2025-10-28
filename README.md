# Weather Now 🌦️ https://weather-now-wqxh.vercel.app/

**Weather Now** is a modern, responsive weather web application that provides real-time weather conditions, hourly and daily forecasts, and smart outdoor tips for any city worldwide. It is built with React, TypeScript, and Tailwind CSS, leveraging the Open-Meteo API for high-quality weather data.

## Features

*   **Real-Time Weather**: Get up-to-the-minute weather conditions for your current location or any searched city.
*   **Geolocation**: Automatically detects and displays weather for your current location on startup.
*   **City Search**: A fast, debounced search bar to find weather forecasts for any city in the world.
*   **Detailed Forecasts**:
    *   Current conditions (temperature, feels like, humidity, wind).
    *   12-hour temperature and precipitation probability charts.
    *   7-day daily forecast summary.
    *   Detailed 24-hour view for each day.
*   **Favorites System**: Save your favorite cities for quick access. Favorites are saved locally in your browser.
*   **Responsive Design**: A mobile-first design that looks great on all devices, from phones to desktops.
*   **Dark/Light Mode**: A theme toggle for comfortable viewing in any lighting condition.

## Technology Stack

*   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
*   **Routing**: [React Router](https://reactrouter.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Charting**: [Recharts](https://recharts.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Data Source**: [Open-Meteo API](https://open-meteo.com/) for weather and geocoding data.

## Project Structure

The project is organized into a clear and maintainable structure:

```
/
├── components/         # Reusable UI components
│   ├── ui/             # Generic UI elements (e.g., Card)
│   ├── CurrentWeather.tsx
│   ├── DailyForecast.tsx
│   ├── Header.tsx
│   └── ...
├── pages/              # Top-level page components for routing
│   ├── HomePage.tsx
│   ├── FavoritesPage.tsx
│   ├── AboutPage.tsx
│   └── DetailPage.tsx
├── services/           # API interaction layer
│   └── weatherService.ts
├── App.tsx             # Main application component, state management, routing
├── constants.ts        # Application-wide constants (e.g., weather codes)
├── types.ts            # TypeScript type definitions
└── index.tsx           # Entry point of the React application
```

### Core Concepts

*   **State Management**: The app uses a combination of local component state (`useState`) and global state via React Context for theme and favorites. The main `App.tsx` component acts as the provider for this global state.
*   **Service Layer**: All external API calls are handled within `services/weatherService.ts`. This separates the data fetching logic from the UI components, making the code cleaner and easier to maintain.
*   **Component-Based Architecture**: The UI is broken down into small, reusable components, each with a specific responsibility, promoting code reuse and maintainability.

## Getting Started

To run this project locally, you would typically follow these steps:

1.  **Clone the repository**:
    ```sh
    git clone <repository-url>
    ```
2.  **Install dependencies**:
    ```sh
    npm install
    ```
3.  **Run the development server**:
    ```sh
    npm run dev
    ```

The application will then be available at `http://localhost:5173` (or a similar port).
`


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
3. Run the app:
   `npm run dev`
