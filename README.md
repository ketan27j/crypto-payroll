# SOLANA RADAR HACKATHON

## Crypto Payroll solution
### Core Functionalities

1. **User Authentication and Onboarding**
    - **User Registration**: Allow businesses and freelancers to create accounts.
    - **KYC/AML Compliance**: Integrate identity verification to comply with regulations.-Reclaim integration
    - **Two-Factor Authentication (2FA)**: Enhance security for user accounts.
2. **Dashboard**
    - **Overview**: Display a summary of account balances, recent transactions, and pending tasks.
    - **User Roles**: Different views for administrators, employees, and freelancers.
3. **Payroll Management**
    - **Employee Management**: Add, edit, and remove employees or freelancers.
    - **Salary Configuration**: Set up salary details, payment frequency, and preferred cryptocurrency.
    - **Automated Payroll**: Schedule and automate payroll processing.
4. **Invoicing**
    - **Invoice Creation**: Generate and send invoices in cryptocurrency.
    - **Invoice Tracking**: Track the status of sent and received invoices.
    - **Payment Reminders**: Send automated reminders for unpaid invoices.
5. **Payments**
    - **Multi-Currency Support**: Support payments in various cryptocurrencies (e.g., SOL, USDC).
    - **Instant Payments**: Enable instant cross-border payments.
    - **Transaction History**: Maintain a detailed history of all transactions.
6. **Tax and Compliance**
    - **Tax Calculation**: Automatically calculate taxes based on jurisdiction.
    - **Compliance Reports**: Generate reports for regulatory compliance.
7. **Notifications**
    - **Email and SMS Alerts**: Notify users about important events (e.g., payment received, invoice due).
    - **In-App Notifications**: Provide real-time updates within the app.
8. **Security**
    - **Encryption**: Ensure all data is encrypted.
    - **Secure Wallet Integration**: Integrate with secure crypto wallets for storing and managing funds.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```
