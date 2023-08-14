# Memory Game

## Overview

The `memory-game` is a modern web application built using React and Vite. This README provides an overview of the main scripts and technologies used in the project.

## Main Technologies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.

## Scripts

Here's a breakdown of the yarn scripts available in the project:

- **`dev`**: Starts the Vite development server.
- **`build`**: Builds the application for production using Vite.
- **`lint`**: Runs ESLint on `.js` and `.jsx` files, ensuring quality code.
- **`preview`**: Serves the production build locally using Vite.
- **`format`**: Formats the code using Prettier across JS, JSX, and CSS files.
- **`test`**: Runs tests using Jest.

## localhosts

- **`http://localhost:5173/`**: The main application.

## Dependencies

### Main Dependencies

- **`react`**: The core React library.
- **`react-dom`**: React package for working with the DOM.
- **`axios`**: Promise-based HTTP client for the browser and Node.js.
  
### Development Dependencies

- **`@swc/cli`, `@swc/core`, `@swc/jest`, `@vitejs/plugin-react-swc`**: SWC related packages for faster transpilation.
- **`@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/react-hooks`, `@testing-library/user-event`**: Testing utilities for React.
- **`@types/react`, `@types/react-dom`**: TypeScript definitions for React.
- **`eslint`, `eslint-plugin-jest`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`**: ESLint and its plugins for linting JavaScript and React code.
- **`husky`, `lint-staged`**: Tools for enforcing code quality using git hooks.
- **`jest`, `jest-environment-jsdom`**: Jest for testing JavaScript code.
- **`postcss`, `autoprefixer`, `tailwindcss`**: CSS processing tools.
- **`prettier`**: Code formatter.
- **`vite`**: Build tool and development server.
- **`msw`**: Helps you mock web APIs for testing and development.
- **`prop-types`**: Runtime type checking for React props.

## Linting and Formatting

The project uses ESLint for linting and Prettier for code formatting. The `lint-staged` configuration ensures that linting and formatting are applied to staged `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.scss`, and `.html` files, making commits cleaner and more consistent.

## Memory Game Application Flow

![Updated Memory Game Application Flow](https://showme.redstarplugin.com/d/HS0ICiN4)

### Components Explanation:

- **CardsProvider**: The main provider that wraps all other components.
  - **GameProvider**: A child of CardsProvider responsible for game-related functionalities.
  - **Board**: The main component and the entry point of the game.
    - **CardList**: A child of Board that lists all the cards.
      - **Card**: Represents an individual card in the game.
        - **Empty Card**: A placeholder or default state of a card.
        - **Content Card**: Represents the actual content or image of a card.
  - **Panel**: A component at the same level as Board for displaying game controls or information.
  - **Winner Popup**: A popup that appears when a player wins the game.
  - **Settings Popup**: A popup for adjusting game settings.

---

This README provides a high-level overview of the project. For more detailed information, refer to the individual package documentation and the project's source code.
