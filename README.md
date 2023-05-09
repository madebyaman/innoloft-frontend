# Frontend App

## Local installation

Step 1: Copy `.env.example` as `.env`

```bash
cp .env.example .env
```

In the `.env` you can set `VITE_APP_ID` to 1 or 2 and the app should respond based on the configuration received.

Step 2: Install dependencies

```bash
pnpm install
```

Step 3: Start local server

```bash
pnpm dev
```

Now you can open browser at `http://localhost:5173` and see the live changes.
