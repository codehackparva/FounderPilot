# FounderPilot (Next.js)

AI workspace for small teams. C2P project, Atmiya University, Rajkot. Domain: AI in Entrepreneurship.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
```

## Optional: real AI replies
Copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`.
Without a key the app still works: chat, content and insights fall back to keyword matching on the demo data.
The key stays on the server (`app/api/ai/route.js`) and is never sent to the browser.

## Structure
- `app/` one folder per page (chat, content, insights, scheduler, inventory, knowledge, pricing, about)
- `components/Store.jsx` shared state (chat, queues, schedule, stock, FAQs, theme)
- `components/Hero3D.jsx` three.js scene (react-three-fiber) on the home page
- `lib/data.js` demo business data (Rangrez Studio). Replace this with your own.
- `lib/logic.js` keyword matching, forecast and advice
