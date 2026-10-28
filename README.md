# Smile Learning

A responsive study interface for exploring past exam questions and answers. Built with React and TypeScript, with reusable question cards, subject views, and search and filtering controls.

## Project status

The repository includes static and mock study data. This is a study-interface project; the README does not imply a verified exam database, professional answer review, or production usage.

## Features

- Question cards and subject-focused navigation.
- Guest practice sessions use stable, shuffled subject-specific questions and honest self-assessment, rather than fabricated multiple-choice distractors or automatically verified scores.
- Practice responses exist only in the current page session; leaving or restarting clears them.
- Optional Supabase account screens handle failed account/history requests with recovery controls. Historical responses are labeled separately from current practice.
- Search and filters for finding relevant study material.
- Responsive layout for desktop and mobile screens.
- Reusable UI components built with shadcn/ui and Tailwind CSS.

## Technology

React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, and React Router.

## Run locally

Requires Node.js and npm.

```sh
git clone https://github.com/miikese/past-quest-solver.git
cd past-quest-solver
npm install
npm run dev
```

Open the local URL printed by Vite.

## Development commands

```sh
npm run build    # production build
npm run preview  # preview the build locally
npm run lint     # static code checks
npm test         # practice selection and account error-handling regressions
```

The commands above are defined in `package.json`. This documentation refresh does not certify that they pass in every environment.

## Optional accounts

Question browsing and self-assessment work without account services. To enable accounts, configure `VITE_SUPABASE_URL` and the public `VITE_SUPABASE_ANON_KEY` before building. Never place a service-role key in the frontend. The account history screen expects the existing `user_answers` table and authenticated row-level access policies; this repository does not provision a production Supabase database. Without configuration, account forms report that the service is unavailable. Practice does not write graded results or award points.

## Structure

- `src/components/`: reusable interface components, including question and search controls.
- `src/pages/`: route-level pages.
- `src/data/`: static and mock study material.
- `src/hooks/` and `src/lib/`: shared interface logic and utilities.

## Author

**Michael Ikese Emmanuel** — software engineer and programmer, project manager in training, and cybersecurity enthusiast.

[GitHub @miikese](https://github.com/miikese) · [Engineering portfolio](https://github.com/miikese/portfolio-site) · [Email](mailto:emmanlemichel2019@gmail.com)
