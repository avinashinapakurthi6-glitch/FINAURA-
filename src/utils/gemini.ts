import type { UserDetails } from '../context/AuthContext';
import type { Transaction, Goal } from '../context/WealthContext';
import { findFaqAnswer } from './bankingAnswers';

interface AIParams {
  user: UserDetails | null;
  transactions: Transaction[];
  goals: Goal[];
  balance: number;
  investments: number;
  carbonScore: number;
  wealthHealthScore: number;
  emergencyFund: number;
}

export const getGeminiResponse = async (
  query: string,
  params: AIParams,
  apiKey: string
): Promise<string> => {
  const { user, transactions, goals, balance, investments, carbonScore, wealthHealthScore } = params;
  const netWorth = balance + investments;

  // 0. Check FAQ/Banking Answers dictionary first to ensure 100% accurate predefined answers for all requested banking/financial Qs
  const faqAnswer = findFaqAnswer(query, params);
  if (faqAnswer) {
    // Artificial slight delay for a realistic "AI thinking" chatbot feel
    await new Promise((resolve) => setTimeout(resolve, 800));
    return faqAnswer;
  }

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
    - Account Balance: Rs. ${balance.toLocaleString('en-IN')}
    - Investments: Rs. ${investments.toLocaleString('en-IN')}
    - Monthly Expenses: Rs. ${transactions.filter(t => t.type === 'expense' && t.date.startsWith('2026-06')).reduce((sum, t) => sum + t.amount, 0).toLocaleString('en-IN')}
    - Active Goals: ${goals.map(g => `${g.name} (Target: Rs. ${g.targetAmount.toLocaleString('en-IN')}, Saved: Rs. ${g.currentAmount.toLocaleString('en-IN')})`).join(', ')}
    - Wealth Health Score: ${wealthHealthScore}/100
    - Carbon Eco-Score: ${carbonScore}/100
  `;

  // Case 1: Real Gemini API Call (Try Direct if apiKey is provided, or fallback to Server-side proxy)
  let responseText: string | null = null;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are FinAura AI, a futuristic digital wealth advisor. Use this context to answer the user's financial question. Keep the tone premium, polite, encouraging, and clear. Limit recommendations to specific practical financial options in India (SIP, Mutual Funds, PPF, Sovereign Gold Bonds).

                    ${profileContext}

                    User Query: "${query}"

                    Response format: Keep it structured and easy to read. Max 4 paragraphs.`,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 800,
              temperature: 0.7,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        responseText = data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      console.error('Client-side Gemini API call failed, trying server-side:', error);
    }
  }

  // If no apiKey was provided or direct call failed, try the secure server-side proxy
  if (!responseText) {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          params
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.text) {
          responseText = data.text;
        }
      }
    } catch (error) {
      console.error('Server-side Gemini API proxy failed:', error);
    }
  }

  if (responseText) {
    return responseText;
  }

  // Case 2: NLP Mock Fallback Engine (Extremely customized to query)
  await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate thinking
  const lowercaseQuery = query.toLowerCase();

  const currentExpense = transactions
    .filter((t) => t.type === 'expense' && t.date.startsWith('2026-06'))
    .reduce((sum, t) => sum + t.amount, 0);
  const currentIncome = user ? user.annualIncome / 12 : 125000;
  const savingsRate = Math.round(((currentIncome - currentExpense) / currentIncome) * 100);

  // Can I invest Rs. X monthly?
  if (lowercaseQuery.includes('invest') || lowercaseQuery.includes('investment') || lowercaseQuery.includes('sip')) {
    const amountMatch = query.match(/\d+/g);
    const amount = amountMatch ? parseInt(amountMatch[0], 10) : 10000;
    const isFeasible = (currentIncome - currentExpense) > amount;

    if (isFeasible) {
      return `### Investment Analysis for ${user?.fullName || 'User'} 🚀

Yes, you can absolutely afford to invest **Rs. ${amount.toLocaleString('en-IN')} monthly**. 

Here is why:
- Your monthly net salary is approximately **Rs. ${(currentIncome).toLocaleString('en-IN')}**.
- Your current expenses sit at **Rs. ${currentExpense.toLocaleString('en-IN')}**, leaving a surplus of **Rs. ${(currentIncome - currentExpense).toLocaleString('en-IN')}** (${savingsRate}% surplus).
- An investment of Rs. ${amount.toLocaleString('en-IN')} represents just **${Math.round((amount / currentIncome) * 100)}%** of your monthly income.

**FinAura Recommends:**
1. **Moderate/Aggressive allocation** (since your Risk Profile is *${user?.riskProfile || 'Moderate'}*): Allocate 60% to Large Cap Equity Mutual Funds via SIP, and 40% to Balanced Advantage Funds.
2. **Automate**: Schedule the SIP for the 5th of every month, immediately after your salary credit to enforce savings discipline!`;
    } else {
      return `### Financial Advisory: Investment Capacity ⚠️

Investing **Rs. ${amount.toLocaleString('en-IN')} monthly** will currently stretch your budget thin because your monthly expense of **Rs. ${currentExpense.toLocaleString('en-IN')}** consumes a large portion of your income.

**FinAura Action Plan:**
1. Start with a smaller SIP of **Rs. 3,000 - 5,000** first.
2. We detected **3 active subscriptions** costing Rs. 4,837/mo. Canceling just two could easily fund a new SIP!
3. Build up your **Emergency Fund** (currently at Rs. ${params.emergencyFund.toLocaleString('en-IN')}) to cover 6 full months of expenses before escalating investments.`;
    }
  }

  // Am I overspending? / reduce expenses
  if (lowercaseQuery.includes('overspend') || lowercaseQuery.includes('reduce') || lowercaseQuery.includes('spend') || lowercaseQuery.includes('expense')) {
    const entertainmentSpend = transactions
      .filter((t) => t.category === 'Entertainment' && t.date.startsWith('2026-06'))
      .reduce((sum, t) => sum + t.amount, 0);

    const shoppingSpend = transactions
      .filter((t) => t.category === 'Shopping' && t.date.startsWith('2026-06'))
      .reduce((sum, t) => sum + t.amount, 0);

    return `### Spending Pattern Analysis 🔍

Based on your transaction data, your spending is **${currentExpense > currentIncome * 0.5 ? 'Moderate to High' : 'Well Disciplined'}**. You spent **Rs. ${currentExpense.toLocaleString('en-IN')}** this month, creating a **${savingsRate}%** savings rate.

**Key Spend Areas:**
- **Shopping**: Rs. ${shoppingSpend.toLocaleString('en-IN')}
- **Entertainment**: Rs. ${entertainmentSpend.toLocaleString('en-IN')} (including recurring charges like Netflix and Canva).

**FinAura Expense Reduction Tips:**
- **Subscription Waste**: We found recurring payments for Netflix, YouTube Premium, and Canva Pro. Consolidating or pausing unused tiers could save you over **Rs. 4,000/month**.
- **Green Transition**: Swapping HP Fuel Petrol charges (Rs. 4,000) for carbon-friendly transport could unlock bank cashback bonuses and help the environment!`;
  }

  // Suggest a retirement plan
  if (lowercaseQuery.includes('retirement') || lowercaseQuery.includes('retire') || lowercaseQuery.includes('old age')) {
    const targetAge = 60;
    const yearsToRetire = Math.max(5, targetAge - (user?.age || 32));
    const inflationIndexedCorpus = Math.round(currentExpense * 12 * 25 * 2.2); // simple multiplier

    return `### FinAura AI Retirement Roadmap 🌅

Hello ${user?.fullName || 'User'}, preparing at age **${user?.age || 32}** gives you a massive compounding edge. You have **${yearsToRetire} years** until your target retirement age of ${targetAge}.

**Retirement Projections:**
- **Target Retirement Corpus (Inflation-adjusted)**: ~**Rs. ${inflationIndexedCorpus.toLocaleString('en-IN')}** (to sustain Rs. 50k/month expense equivalent).
- **Current Net Worth**: Rs. ${netWorth.toLocaleString('en-IN')} (Balance: Rs. ${balance.toLocaleString('en-IN')} + Investments: Rs. ${investments.toLocaleString('en-IN')}).

**Recommended Retirement Asset Mix:**
1. **Equity SIP (60%)**: Diversified Nifty 50 Index Fund & Midcap Funds for growth.
2. **PPF / NPS (30%)**: For tax efficiency under Sec 80C and solid 7-8% risk-free compounding.
3. **Debt/Gold (10%)**: Sovereign Gold Bonds (SGB) for security and hedging.

*Suggested monthly retirement contribution*: **Rs. 25,000** starting this month.`;
  }

  // How much should I save?
  if (lowercaseQuery.includes('how much') || lowercaseQuery.includes('save') || lowercaseQuery.includes('saving')) {
    const idealSavings = Math.round(currentIncome * 0.3);
    return `### Savings Benchmark & Recommendations 📊

The golden standard of wealth management recommends the **50-30-20 rule**: 50% for Needs, 30% for Wants, and **20% minimum for Savings/Investments**.

**Your Financial Matrix:**
- **Your Monthly Income**: Rs. ${currentIncome.toLocaleString('en-IN')}
- **Recommended Savings (20-30%)**: Rs. ${idealSavings.toLocaleString('en-IN')} - Rs. ${Math.round(currentIncome * 0.4).toLocaleString('en-IN')}
- **Your Current Surplus**: Rs. ${(currentIncome - currentExpense).toLocaleString('en-IN')} (${savingsRate}% saved)

**Strategic Next Steps:**
1. Since your current surplus is Rs. ${(currentIncome - currentExpense).toLocaleString('en-IN')}, you are already exceeding the 20% benchmark!
2. Your immediate focus should be putting that surplus into tax-saver equity funds (ELSS) or high-yield fixed deposits instead of letting it sit idle.`;
  }

  // Default response
  return `### Hello! I am FinAura AI, your digital wealth coach 🌟

I am here to guide you toward financial freedom. I have analyzed your portfolio:
- **Net Worth**: Rs. ${netWorth.toLocaleString('en-IN')}
- **Wealth Health Score**: ${wealthHealthScore}/100 (${wealthHealthScore >= 70 ? 'Excellent' : 'Good'})
- **Risk Category**: ${user?.riskProfile || 'Moderate'}

You can ask me specific questions like:
- *"Am I overspending on food or entertainment?"*
- *"Can I invest Rs. 15,000 monthly for my Masters goal?"*
- *"Suggest a retirement plan for a ${user?.age || 32}-year-old."*
- *"How can I improve my Wealth Health Score?"*`;
};
