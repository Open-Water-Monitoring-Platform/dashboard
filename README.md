# Open Water Monitoring Platform

## Description

This open-source project is a web application built with Next.js, TypeScript, and Tailwind CSS with Shadcn Ui. It serves as a foundation for creating modern and responsive web applications with a focus on performance and developer experience.

## Features

- **Next.js:** Utilizes the power of Next.js for server-side rendering, automatic code splitting, and a great developer experience.
  
- **TypeScript:** The project is written in TypeScript, providing static typing and improved tooling for better code quality and maintainability.

- **Tailwind CSS:** Styling is done using Tailwind CSS, a utility-first CSS framework that allows for rapid development and easy customization.

- **Shadcn Ui:** The application is using shadcn ui library to make development faster.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-project.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd your-project
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Create a `.env` file:**
    - Update the `.env` file with the following content:
      ```dotenv
      NEXT_PUBLIC_API_URL="http://localhost:4000"
      NEXT_PUBLIC_MAPBOX_API_KEY=""
      ```
      Adjust the values according to your specific configuration.

5. **Start the development server:**
    ```bash
    npm run dev
    ```

    This will start the Next.js development server, and you can view the application at [http://localhost:3000](http://localhost:3000).

### Build

To build the production-ready application, use the following command:

```bash
npm run build
  ```

### Contributing

We actively welcome pull requests. Learn how to [contribute](./Workflow/CONTRIBUTING.md) and please abide by the [Code of Conduct](./Workflow/CODE_OF_CONDUCT.md).

### License

OWMP is [Apache License 2.0](./LICENSE).
