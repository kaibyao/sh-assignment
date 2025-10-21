## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install dependencies

```bash
npm i
```

### Database set up

The app is configured to read the `DATABASE_URL` from `.env.local`. You’ll need to `cp .env .env.local` and uncomment the url in `.env.local` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.
    ```bash
    docker compose up -d
    ```

2. Create a `solaceassignment` database.

3. Push migration to the database
    ```bash
    npx drizzle-kit push
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Seed the database
    ```bash
    curl -X POST http://localhost:3000/api/seed
    ```
