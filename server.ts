import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const bankingKnowledgeContext = `
Official Bank Schemes, Policies & Insurances Knowledge Base:
1. Savings Account Policies:
   - Interest rate: 4.0% per annum, credited quarterly.
   - Minimum balance: Rs. 10,000 for Metro, Rs. 5,000 for Semi-Urban, Rs. 2,500 for Rural.
   - Grievance Redressal: Turnaround time (TAT) is 3 working days. Customers can escalate to the Banking Ombudsman if unresolved in 30 days.
   - DICGC Protection: All deposits are insured up to Rs. 5 Lakhs by the Deposit Insurance and Credit Guarantee Corporation.
2. Fixed Deposit (FD) & Recurring Deposit (RD) Schemes:
   - FD Interest Rates: 1 year (6.8% p.a.), 3 years (7.2% p.a.), 5 years Tax Saver (7.5% p.a.). Senior Citizens get an additional 0.5% premium.
   - Premature withdrawal penalty: 1.0% deduction on the effective interest rate.
3. Government-backed Schemes:
   - Public Provident Fund (PPF): 7.1% interest, 15-year maturity, EEE tax status, minimum deposit Rs. 500/year.
   - Sukanya Samriddhi Yojana (SSY): 8.2% interest for girl child, maturity after 21 years or marriage after 18, EEE tax status.
   - National Pension System (NPS): Tier-1 account offers extra Rs. 50,000 tax deduction under Sec 80CCD(1B). Low-cost equity/debt market indexing.
   - Senior Citizen Savings Scheme (SCSS): 8.2% interest paid quarterly, 5-year tenure.
   - Atal Pension Yojana (APY): Guaranteed pension of Rs. 1,000 to Rs. 5,000 monthly for citizens aged 18-40.
   - Pradhan Mantri Jan Dhan Yojana (PMJDY): Zero balance account, Rs. 10,000 overdraft limit, free Rupay debit card with Rs. 2 Lakh accident insurance.
4. Insurance Policies:
   - Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY): Term life insurance offering Rs. 2 Lakhs cover for Rs. 436 annual premium. Age limit 18-50.
   - Pradhan Mantri Suraksha Bima Yojana (PMSBY): Accident insurance offering Rs. 2 Lakhs cover for Rs. 20 annual premium. Age limit 18-70.
   - Health Insurance (Medishield): Coverage up to Rs. 10 Lakhs, cashless facility across 8,000+ hospitals. Deductibles range from Rs. 15,000.
   - Motor Insurance (Third-Party and Comprehensive): Zero depreciation add-ons, 24/7 roadside assistance, cashless garage network.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize Gemini AI client if GEMINI_API_KEY is available
  let ai: GoogleGenAI | null = null;
  const getAiClient = () => {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        ai = new GoogleGenAI({ 
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }
    }
    return ai;
  };

  // API Route for Gemini proxy
  app.post("/api/gemini", async (req: any, res: any) => {
    try {
      const { query, params } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const { user, transactions, goals, balance, investments, carbonScore, wealthHealthScore } = params;

      const profileContext = `
        User Profile:
        - Name: ${user?.fullName || 'Client'}
        - Age: ${user?.age || '32'}
        - Occupation: ${user?.occupation || 'Professional'}
        - Annual Income: Rs. ${user?.annualIncome?.toLocaleString('en-IN') || '15,00,000'}
        - Marital Status: ${user?.maritalStatus || 'Single'}
        - Dependents: ${user?.dependents || '0'}
        - Risk Profile: ${user?.riskProfile || 'Moderate'}
        - Risk Score: ${user?.riskScore || '60'}/100

        Current Wealth Data:
        - Account Balance: Rs. ${balance?.toLocaleString('en-IN') || '0'}
        - Investments: Rs. ${investments?.toLocaleString('en-IN') || '0'}
        - Monthly Expenses: Rs. ${transactions?.filter((t: any) => t.type === 'expense' && t.date?.startsWith('2026-06')).reduce((sum: number, t: any) => sum + t.amount, 0).toLocaleString('en-IN')}
        - Active Goals: ${goals?.map((g: any) => `${g.name} (Target: Rs. ${g.targetAmount.toLocaleString('en-IN')}, Saved: Rs. ${g.currentAmount.toLocaleString('en-IN')})`).join(', ') || 'None'}
        - Wealth Health Score: ${wealthHealthScore || '50'}/100
        - Carbon Eco-Score: ${carbonScore || '50'}/100
      `;

      const aiClient = getAiClient();
      if (!aiClient) {
        return res.status(500).json({ error: "Failed to initialize Gemini AI client." });
      }

      const targetLang = params.language || 'en';
      const langInstruction = targetLang === 'hi' 
        ? "You must reply directly in Hindi (हिंदी). Use clear, polite Devanagari script."
        : targetLang === 'te'
        ? "You must reply directly in Telugu (తెలుగు). Use clear, polite Telugu script."
        : "Reply in English.";

      const prompt = `You are FinAura AI, a futuristic digital wealth advisor. Use this context to answer the user's financial question. Keep the tone premium, polite, encouraging, and clear. Limit recommendations to specific practical financial options in India (SIP, Mutual Funds, PPF, Sovereign Gold Bonds).

      ${langInstruction}

      ${bankingKnowledgeContext}

      ${profileContext}

      User Query: "${query}"

      Response format: Keep it structured and easy to read with markdown. Max 4 paragraphs.`;

      // Call Gemini 2.5 flash
      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          maxOutputTokens: 800,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Server-side Gemini Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate content." });
    }
  });

  // API Route for real-time translation
  app.post("/api/translate", async (req: any, res: any) => {
    try {
      const { text, lang } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!text || !lang) {
        return res.status(400).json({ error: "Both text and lang are required." });
      }

      if (lang === 'en') {
        return res.json({ text });
      }

      const aiClient = getAiClient();
      if (!aiClient) {
        // Fallback if API key is not yet set
        return res.json({ text });
      }

      const targetLanguageName = lang === 'hi' ? 'Hindi (हिंदी)' : 'Telugu (తెలుగు)';
      const systemPrompt = `You are a professional, high-fidelity translator for a fintech and wealth management app. Translate the English input to ${targetLanguageName}.
Rules:
- Output ONLY the translated text in the target language. Do not include any explanations, markdown code blocks, or extra text.
- Maintain formatting, uppercase acronyms (like AI, SIP, PDF, FD, CAGR) if standard in Indian business contexts, but translate surrounding text beautifully.
- Do not translate currency notations like "Rs." or numbers like "10,000", but do translate terms like "Rupees" or "Year".
- Keep technical terms accurate (e.g. Mutual Funds can be translated or transliterated as standard in India).

Input: "${text}"`;

      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemPrompt,
        config: {
          maxOutputTokens: 400,
          temperature: 0.2,
        }
      });

      const translatedText = response.text ? response.text.trim() : text;
      res.json({ text: translatedText });
    } catch (err: any) {
      console.error("Server-side Translation Error:", err);
      res.status(500).json({ error: err.message || "Failed to translate." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
