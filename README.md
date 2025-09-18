# PKWMTT Web

A modern web application for university students to manage their academic schedules, view timetables, track ECTS credits, and stay organized with their academic calendar.

## Features

- **Timetable Management**: View and manage your university schedule with support for different group configurations
- **Academic Calendar**: Track important academic dates and events
- **ECTS Calculator**: Calculate and track your ECTS credits with weighted averages
- **Student Groups**: Configure your general group and subgroups for personalized schedule views
- **Multi-language Support**: Available in English and Polish
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: Next-intl
- **API**: tRPC for type-safe API calls, TanStack Query
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode support

### Development Tools

- **Package Manager**: PNPM
- **Code Quality**: ESLint 9, Prettier
- **Containerization**: Docker with Docker Compose

### Runtime

- **Node.js**: Version 20 or newer
- **React**: Version 19

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js 20** or newer
- **PNPM** package manager
- **Docker** (optional, for containerized deployment)

## Development Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/PKTTTeam/PKWMTT-frontend-web.git
    cd PKWMTT-frontend-web
    ```

2. **Install dependencies**

    ```bash
    pnpm install
    ```

3. **Start the development server**

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm compose:up` - Start the application using Docker Compose
- `pnpm compose:down` - Stop the Docker Compose services

## Docker Deployment

For containerized deployment:

```bash
# Build and start the services
pnpm compose:up

# Stop the services
pnpm compose:down
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── schema/               # Zod validation schemas
├── server/               # Server-side code
├── trpc/                # tRPC client configuration
├── types/               # TypeScript type definitions
└── views/               # Page-level components
```

## Configuration

The application supports the following configuration:

- **Environment Variables**: Managed through `@t3-oss/env-nextjs`
- **Internationalization**: English and Polish locales
- **Theme**: Light and dark mode support
- **Docker**: Standalone build output for containerized deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!-- ## Screenshots -->

<!-- Add your screenshots here -->
