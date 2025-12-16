This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Local (dev)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If port 3000 is already in use:

```bash
npm run dev -- -p 3002 # choose any free port
```

You can start editing the page by modifying `src/app/page.js`. The page auto-updates as you edit the file.

### Local (production-like)

```bash
npm run build
npm run start
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# grace-chatbot

## Survey CSV logging

- Writes 1 user = 1 row to `data/survey_responses.csv` (override with `SURVEY_CSV_PATH`).
- Download via `GET /api/survey` with Basic Auth password in `CSV_DOWNLOAD_PASSWORD`.
- UI download page: open `/download`, enter the same password, click “Download CSV”.

Local env example (`.env.local`):

```bash
CSV_DOWNLOAD_PASSWORD=local-download
SURVEY_CSV_PATH=./data/survey_responses.csv
```

## Tests

- `npm test` (includes a 300-user load test; override with `SURVEY_LOAD_USERS=1000`)
- `npm run test:e2e`
