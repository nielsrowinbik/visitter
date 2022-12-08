# Visitter

An open source application for managing vacation homes built using everything new in Next.js 13.

> **Warning**
> This app is a work in progress. I'm building this in public.

## About this project

My parents own a vacation home that they rent out but not just to anyone. I wanted to create a simple and easy to use tool with which they can manage and share their vacation home's availability. Since my parents expect renters to also take care of the house, the name "visitter" seemed fitting.

## Note on Performance

> **Warning**
> This app is using the canary releases for Next.js 13 and React 18. The new router and app directory are still in beta and not production-ready.
> NextAuth.js, which is used for authentication, is also not fully supported in Next.js 13 and RSC. Finally, I'm still learning all of these new features.
> **Performance of the app may not yet be great**.

## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Server and Client Components
- API Routes and Middlewares
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **PlanetScale**
- Subscriptions using **Stripe**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
```
