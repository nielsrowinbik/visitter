# Visitter

An open source application for managing vacation homes built using Remix.

> **Warning**
> This app is a work in progress. I'm building this in public.

## About this project

My parents own a vacation home that they rent out but not just to anyone. I wanted to create a simple and easy to use tool with which they can manage and share their vacation home's availability. Since my parents expect renters to also take care of the house, the name "visitter" seemed fitting.

## Features

- Authentication using **remix-auth**
- ORM using **Prisma**
- Database on **PlanetScale**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

3. Start the development server:

```sh
pnpm dev
```
