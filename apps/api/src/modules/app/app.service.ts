import pkg from '../../../package.json' with { type: 'json' }

export class AppService {
  index() {
    return new Response(
      `<html lang="en">
        <head>
          <title>${pkg.name}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                'Segoe UI Emoji', 'Segoe UI Symbol';
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: oklch(0 0 0);
              color: oklch(1 0 0);
              text-align: center;
            }
            h1 {
              color: oklch(0.5144 0.1605 267.44);
              font-size: 3rem;
            }
            p {
              font-size: 1.2rem;
            }
            a {
              display: inline-block;
              margin-top: 25px;
              padding: 12px 24px;
              background-color: oklch(0.5144 0.1605 267.44);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              transition: background-color 0.3s ease;
              font-size: 1rem;
            }
            a:hover, a:focus {
              background-color: oklch(0.5144 0.1605 267.44 / 0.8);
              outline: none;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to ${pkg.name}!</h1>
          <p>Version: ${pkg.version}</p>
          <a href="/api/openapi">OpenAPI Documentation</a>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } },
    )
  }

  healthCheck() {
    return {
      status: 'ok',
      version: pkg.version,
      timestamp: new Date().toISOString(),
    }
  }
}
