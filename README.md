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
- **`lint`**: Runs ESLint to identify and report on patterns found in ECMAScript/JavaScript code.
- **`preview`**: Serves the production build locally using Vite.
- **`format`**: Formats the code using Prettier.
- **`test`**: Runs tests using Jest.

## Dependencies

### Main Dependencies

- **`react`**: The core React library.
- **`react-dom`**: React package for working with the DOM.

### Development Dependencies

- **`@swc/core`, `@swc/jest`, `@vitejs/plugin-react-swc`**: SWC related packages for faster transpilation.
- **`@testing-library/jest-dom`, `@testing-library/react`**: Testing utilities for React.
- **`@types/react`, `@types/react-dom`**: TypeScript definitions for React.
- **`eslint`, `eslint-plugin-jest`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`**: ESLint and its plugins for linting JavaScript and React code.
- **`husky`, `lint-staged`**: Tools for enforcing code quality using git hooks.
- **`jest`, `jest-environment-jsdom`**: Jest for testing JavaScript code.
- **`postcss`, `autoprefixer`, `tailwindcss`**: CSS processing tools.
- **`prettier`**: Code formatter.
- **`vite`**: Build tool and development server.

## Linting and Formatting

The project uses ESLint for linting and Prettier for code formatting. The `lint-staged` configuration ensures that only staged files are linted and formatted, making commits cleaner and more consistent.

## Application flow
![Memory Game Application Flow](https://showme.redstarplugin.com/d/Ktfusv3u)

---

This README provides a high-level overview of the project. For more detailed information, refer to the individual package documentation and the project's source code.
