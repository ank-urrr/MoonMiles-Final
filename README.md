# MoonMiles Travel Agency

Welcome to the **MoonMiles Travel Agency** repository! This is a modern, full-stack web application built with Next.js, showcasing a premium, animated, and interactive landing page for a fictional travel agency. It features a sleek user interface, dynamic animations, and an integrated AI Chatbot.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js (App Router), React 19, and TypeScript.
- **Beautiful UI Components**: Utilizes Radix UI primitives and Tailwind CSS for accessible, highly customizable, and responsive design.
- **Smooth Animations**: Incorporates Framer Motion and Tailwind Animate for engaging page transitions and micro-interactions (e.g., floating background dots).
- **Interactive Carousel**: Uses Embla Carousel to neatly display travel destinations and features.
- **AI Chatbot**: Features an integrated intelligent assistant powered by the Vercel AI SDK and Google's Generative AI.
- **Robust Forms**: Form handling and validation powered by React Hook Form and Zod.
- **Theming**: Dark and light mode support via `next-themes`.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Architecture**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/) (implied)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) (`@ai-sdk/google`)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js and a package manager (npm, yarn, or pnpm) installed on your system.

### Installation

1. Clone this repository (or navigate to the project directory):
   ```bash
   cd moon-miles-travel-agency-final
   ```

2. Install the required dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your Google AI API key (needed for the Chatbot functionality):
     ```env
     GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
     ```

### Running the Development Server

Start the development server by running:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/` - Next.js App Router pages and main layouts (e.g., `page.tsx` for the landing page).
- `components/` - Reusable UI components (Hero Section, Destinations, Features, Chatbot, Navbar, Footer, etc.).
- `hooks/` - Custom React hooks.
- `lib/` - Utility functions, configurations, and helper files.
- `public/` - Static assets like images and fonts.
- `styles/` - Global stylesheets.

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.

## 📄 License

This project is open-source and available for educational and portfolio purposes.
