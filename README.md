This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase MCP (Model Context Protocol) Setup

This project includes Supabase MCP server configuration for AI model integration.

### Setup Instructions

1. **Environment Variables**: Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

2. **Supabase Data Setup**: Run the following command to set up product data:
   ```bash
   npm run setup-supabase
   ```

3. **Check Supabase Data**: Verify the data setup:
   ```bash
   npm run check-supabase
   ```

2. **MCP Server**: The MCP server is configured in `mcp-server-supabase.js` and provides the following tools:
   - `query_users`: Query users from the database
   - `create_user`: Create a new user
   - `query_counsel`: Query counsel records
   - `create_counsel`: Create a new counsel record

3. **Running MCP Server**: 
   ```bash
   npm run mcp-server
   ```

4. **MCP Client Configuration**: Update `mcp-client-config.json` with your Supabase credentials.

### Available MCP Tools

- **query_users**: Retrieve users with optional filtering
- **create_user**: Create new user records
- **query_counsel**: Retrieve counsel records
- **create_counsel**: Create new counsel records

The MCP server enables AI models to interact with your Supabase database through a standardized protocol.
