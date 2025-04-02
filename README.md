# React MSAL Authentication with Protected Routes

This project demonstrates Microsoft Authentication Library (MSAL) integration with React, featuring protected routes and secure API calls to a FastAPI backend.

## Features

- Microsoft Authentication Library (MSAL) integration
- Protected routes with authentication
- Secure API calls with access tokens
- Redirect-based authentication flow
- TypeScript support
- Vite as build tool

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Azure AD application registration
- FastAPI backend with MSAL integration

## Azure AD Setup

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory
3. Register a new application:
   - Name: Your app name
   - Supported account types: Choose based on your needs
   - Redirect URI: `http://localhost:5173` (for development)
4. Note down the following values:
   - Application (client) ID
   - Directory (tenant) ID
   - API scope (if using custom API)

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Azure AD values:
   ```
   VITE_MSAL_CLIENT_ID=your_client_id_here
   VITE_MSAL_TENANT_ID=your_tenant_id_here
   VITE_MSAL_REDIRECT_URI=http://localhost:5173
   VITE_API_SCOPE=api://your_api_scope/access_as_user
   VITE_API_ENDPOINT=http://localhost:8000
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-msal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.tsx    # Protected route wrapper component
├── pages/
│   ├── Login.tsx            # Login page component
│   └── Protected.tsx        # Protected page with API integration
├── config/
│   └── authConfig.ts        # MSAL configuration
├── App.tsx                  # Main application component
└── main.tsx                # Application entry point
```

## Authentication Flow

1. User clicks "Sign in with Microsoft"
2. Redirected to Microsoft login page
3. After successful login, redirected back to the application
4. Access token is automatically acquired and stored
5. Protected routes are accessible
6. API calls include the access token in Authorization header

## API Integration

The protected page (`Protected.tsx`) demonstrates how to:
1. Acquire an access token silently
2. Make authenticated API calls
3. Handle API responses and errors

## Security Considerations

- Access tokens are stored in session storage
- Protected routes redirect to login if not authenticated
- API calls include proper authorization headers
- Environment variables for sensitive configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
