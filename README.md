<div align="center">
  <img src="src/assets/logo.svg" alt="CatLover Logo" width="45" height="45" />
</div>

<h1 align="center">CatLover App</h1>

A React application for to browse random cats, favorite, and learn about different cat breeds.

## Features

- Browse and view cat images
- Explore different cat breeds and their details
- Save your favorite cats
- Responsive design

## API Integration

This application uses The Cat API (https://thecatapi.com/) to fetch:

- Random cat images
- Cat breed information
- Favorite cats management

To run the application:

1. Sign up for a free API key at https://thecatapi.com/
2. Copy `.env.sample` to `.env`:

```bash
cp .env.sample .env
```

3. Add your API key to the `.env` file:

```
VITE_CAT_API_KEY=your_api_key_here
```

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router v7
- React Query
- TailwindCSS
- Vitest for testing
- ESLint & Prettier for code quality

## Prerequisites

- Node.js (version specified in .nvmrc)
- npm or yarn

## Getting Started

1. Clone the repository and go to project folder:

```bash
git clone [repository-url]
cd platform-react-challenge
```

2. Install dependencies:
   > [!INFO]  
   > We suggest to use [nvm](https://github.com/nvm-sh/nvm) for better compatibility and run `nvm use` before installing

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application should be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable UI components
├── constants/     # Application constants
├── contexts/      # React contexts
├── hooks/         # Custom React hooks
├── layouts/       # Page layouts
├── providers/     # Context providers
├── services/      # API services
├── testing/       # Test configuration
└── types/         # TypeScript type definitions
```

## Testing

The project uses Vitest for testing. Run tests with:

```bash
npm run test
```

For test coverage:

```bash
npm run test:coverage
```

> [INFO]
> Github actions are used to run the tests with each PR

### Adding Tests

To add new tests:

1. Create test files with the `.test.ts` or `.test.tsx` extension
2. Place test files next to the files they test or in a `__tests__` directory

For testing API calls, use the `MSW` package and mock the API responses. Feel free to check existing tests if you are not familiar with it or the package's [documentation](https://mswjs.io/docs). Please keep global endpoints mocking into the [./src/testing/mocks/handlers.ts](./src/testing/mocks/handlers.ts) file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin amazing-feature`)
5. Open a Pull Request
6. GitHub Actions workflow runs `lint`, `type-check`, and `test` on every PR
