# Batna - Trading Intelligence Platform

<div align="center">

![Batna Logo](./docs/images/logo.png)

# Batna | بتنة
### AI Trading Intelligence Platform
### منصة ذكاء التداول بالذكاء الاصطناعي

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[**🚀 Live Demo**](https://batna.trading) | [**📚 Documentation**](./docs) | [**🎓 Academy**](https://infinityalgoacademy.net/)

</div>

---

## 🌟 Features

### 📊 22+ Trading Calculators
- **Fibonacci Retracement & Extension** - Calculate support/resistance levels
- **Position Size Calculator** - Risk-based position sizing
- **Risk-Reward Ratio** - Trade analysis tools
- **And 19+ more professional calculators...**

### 🤖 AI Market Analysis
- Multi-market support (Forex, Crypto, Stocks, Commodities)
- Natural language analysis requests
- Key level detection with strength indicators
- Trading scenarios and risk notes

### 🌍 Bilingual Support
- **English** - Full interface translation
- **العربية** - دعم كامل للغة العربية
- RTL layout support

### 🎨 Beautiful UI
- Modern glassmorphism design
- Purple & Gold color scheme
- Dark/Light theme toggle
- Mobile-first responsive

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/alinounou/infinity-algo.git
cd infinity-algo

# Install dependencies
bun install

# Run development server
bun run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
batna/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main SPA
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   └── api/ai-analyze/   # AI API endpoint
│   ├── components/
│   │   ├── Logo.tsx          # Batna logo
│   │   ├── Navbar.tsx        # Navigation
│   │   ├── Footer.tsx        # Footer
│   │   ├── AIAnalysisSection.tsx
│   │   └── calculators/      # 22 calculators
│   ├── locales/
│   │   └── index.ts          # EN/AR translations
│   ├── lib/
│   │   └── i18n.ts           # i18n system
│   ├── config/
│   │   └── calculators.ts    # Calculator registry
│   └── store/
│       └── index.ts          # Zustand store
├── docs/                     # Enterprise docs
├── public/                   # Static assets
└── package.json
```

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State | Zustand |
| Animations | Framer Motion |
| i18n | Custom (EN/AR) |
| Deployment | Vercel |

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#A855F7` | Purple - Main brand |
| Secondary | `#F59E0B` | Gold - Accents |
| Accent | `#EC4899` | Pink - Highlights |
| Dark | `#0D0517` | Dark background |
| Bullish | `#10B981` | Green - Positive |
| Bearish | `#EF4444` | Red - Negative |

---

## 📚 Documentation

- [Data Architecture](./docs/data-architecture.md)
- [AI Training Pipeline](./docs/ai-training.md)
- [Product Roadmap](./docs/roadmap.md)
- [Monetization Strategy](./docs/monetization.md)
- [Launch Checklist](./docs/launch-checklist.md)

---

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Configure environment variables
3. Deploy!

### Environment Variables

```env
# Optional - Phase 2
DATABASE_URL=
OPENAI_API_KEY=
NEXTAUTH_SECRET=
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Powered by [Infinity Algo Academy](https://infinityalgoacademy.net/)
- UI Components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

<div align="center">

**Made with ❤️ by the Batna Team**

[🌐 Website](https://batna.trading) | [📧 Contact](mailto:contact@batna.trading) | [🐦 Twitter](https://twitter.com/batna_trading)

</div>
