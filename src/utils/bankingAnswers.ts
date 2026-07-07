/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

export interface FAQCategory {
  id: string;
  name: string;
  questions: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "general-banking",
    name: "General Banking",
    questions: [
      {
        question: "What is a savings account?",
        answer: `### Savings Account 🏦\n\nA **Savings Account** is an interest-bearing deposit account held at a financial institution. It provides a secure place to store your cash surplus while earning a modest interest rate (typically 3% to 6% per annum in India).\n\n**Key Characteristics:**\n- **Liquidity**: Offers high liquidity, allowing you to withdraw funds anytime via ATMs, UPI, or net banking.\n- **Interest Earned**: Balances compound daily or quarterly, helping you grow cash passively.\n- **Safe Haven**: Regulated securely (in India, protected by DICGC insurance up to Rs. 5 lakhs).`,
        keywords: ["what is a savings account", "savings account definition", "define savings account"]
      },
      {
        question: "What is the difference between a savings account and a current account?",
        answer: `### Savings vs. Current Account ⚖️\n\nWhile both allow storing and transferring money, they serve entirely different financial profiles:\n\n1. **Savings Account**:\n   - **Target Audience**: Individuals, salaried professionals, and families.\n   - **Interest**: Earns annual interest (3% - 6%).\n   - **Limits**: Daily transactions and withdrawals have soft limits to encourage saving.\n\n2. **Current Account**:\n   - **Target Audience**: Businesses, merchants, traders, and corporates.\n   - **Interest**: Usually offers **zero interest**.\n   - **Limits**: Unlimited daily transactions with zero deposit/withdrawal restrictions, plus overdraft facilities.`,
        keywords: ["difference between savings and current", "savings vs current", "current account savings account"]
      },
      {
        question: "Which account is best for students?",
        answer: `### Student Bank Accounts 🎓\n\nFor students, the best choice is a specialized **Student Savings Account** or a **Zero-Balance Basic Savings Bank Deposit Account (BSBD)**.\n\n**Top Features to Look For:**\n- **Zero Minimum Balance Requirement**: Avoid penalties for keeping a low balance.\n- **Free Digital Banking**: Free UPI setup, mobile banking app access, and local debit card.\n- **Discounts & Offers**: Perks on educational purchases, movie tickets, and transit passes.`,
        keywords: ["best for students", "student account", "accounts for students"]
      },
      {
        question: "How do I open a bank account?",
        answer: `### Opening a Bank Account 📝\n\nOpening an account is now seamless and can be done either **Online** (via video KYC) or **Offline** (at a local bank branch).\n\n**Step-by-step Process:**\n1. **Choose your Bank & Account Type**: Select one that matches your balance comfort and offers high interest.\n2. **Submit Application**: Fill out the physical or online application form.\n3. **Provide KYC Documents**: Submit identity proof, address proof, and passport-size photos.\n4. **Complete Verification**: Complete biometric authentication or Video KYC.\n5. **Initial Deposit**: Add initial funds to activate the account.`,
        keywords: ["how do i open a bank account", "open bank account", "opening an account"]
      },
      {
        question: "What documents are required to open an account?",
        answer: `### Required Account Documents 📄\n\nUnder Reserve Bank of India (RBI) guidelines, you need **Officially Valid Documents (OVDs)** to fulfill KYC standards:\n\n1. **Identity Proof** (Any one): Aadhaar Card, PAN Card, Passport, Voter ID, or Driving License.\n2. **Address Proof** (Any one): Aadhaar Card, Passport, Utility Bills (Electricity/Gas under 2 months old), or Voter ID.\n3. **Additional**: Passport-sized photographs and a signature specimen.`,
        keywords: ["documents required to open", "what documents are required", "account opening documents"]
      },
      {
        question: "Can I open a bank account online?",
        answer: `### Instant Online Account Opening 🌐\n\nYes, absolutely! Most modern banks offer **Instant Online Digital Accounts** utilizing **Video KYC**.\n\n**How it works:**\n- Enter your Mobile Number, PAN, and Aadhaar on the bank's secure portal.\n- Receive an OTP on your Aadhaar-linked mobile to authenticate instantly.\n- Initiate a quick video call with a bank executive to verify your physical PAN card and signature live.\n- Your digital account is activated within **few minutes**!`,
        keywords: ["open online", "account online", "can i open a bank account online"]
      },
      {
        question: "What is KYC?",
        answer: `### Know Your Customer (KYC) 🔍\n\n**KYC** stands for **Know Your Customer**. It is a mandatory identity and address verification process executed by financial institutions to confirm the legitimacy of their clients.\n\n**Objectives of KYC:**\n- **Identity Integrity**: Ensures the account holder is indeed who they claim to be.\n- **Anti-Money Laundering (AML)**: Prevents illegal syndicates from laundering cash.\n- **Fraud Prevention**: Prevents identity theft and synthetic credit frauds.`,
        keywords: ["what is kyc", "define kyc", "know your customer"]
      },
      {
        question: "Why is KYC mandatory?",
        answer: `### Why KYC is Mandatory 🛡️\n\nKYC is legally mandated by central banking regulators (like the RBI in India) to safeguard the financial ecosystem.\n\n**Reasons for Mandate:**\n- **National Security**: Blocks terror funding channels.\n- **Tax Compliance**: Connects PAN with bank records to monitor tax evasion.\n- **Legal Audits**: Creates a reliable paper trail for security investigations.\n\nFailure to complete KYC will result in your account being frozen or suspended.`,
        keywords: ["why is kyc mandatory", "is kyc compulsory", "why kyc"]
      },
      {
        question: "What is a fixed deposit?",
        answer: `### Fixed Deposits (FD) 📈\n\nA **Fixed Deposit (FD)** is a low-risk financial instrument offered by banks where you lock in a specific sum of money for a predetermined tenure (ranging from 7 days to 10 years) at a guaranteed interest rate.\n\n**Benefits:**\n- **Guaranteed Returns**: Unaffected by stock market fluctuations.\n- **Higher Yield**: Pays significantly higher interest than normal savings accounts.\n- **Flexible Tenures**: Choose tenures that match your specific short-term goals.`,
        keywords: ["what is a fixed deposit", "fixed deposit definition", "define fd"]
      },
      {
        question: "What is a recurring deposit?",
        answer: `### Recurring Deposits (RD) ⏳\n\nA **Recurring Deposit (RD)** is an investment tool that allows you to deposit a fixed sum of money every month for a chosen tenure (usually 6 months to 10 years) while earning interest equivalent to Fixed Deposits.\n\n**Why choose RD?**\n- **Enforces Discipline**: Encourages consistent monthly savings habits.\n- **Low Entry Threshold**: Start with as little as Rs. 500/month.\n- **Compounding Magic**: Perfect for building towards specific future goal milestones.`,
        keywords: ["what is a recurring deposit", "recurring deposit definition", "define rd"]
      }
    ]
  },
  {
    id: "balance-transactions",
    name: "Balance & Transactions",
    questions: [
      {
        question: "How do I check my account balance?",
        answer: `### Checking Your Balance 📊\n\nYou can view your balance instantly using several secure digital and physical channels:\n\n1. **FinAura App Dashboard**: Log in to view your real-time aggregated balance.\n2. **UPI Apps**: Go to your linked UPI app, select your bank, and enter your secure PIN.\n3. **Net & Mobile Banking**: Log into your bank's portal.\n4. **Missed Call / SMS**: Dial your bank's dedicated balance inquiry number.\n5. **ATM Sweep**: Insert your card at any ATM and select 'Balance Inquiry'.`,
        keywords: ["check my account balance", "how do i check my balance", "view balance"]
      },
      {
        question: "Why is my account balance different from the available balance?",
        answer: `### Account Balance vs. Available Balance 💡\n\nIt is common to see two distinct balance numbers in banking:\n\n- **Account (Current) Balance**: The total amount currently sitting in your account, including funds that are locked, on hold, or uncleared.\n- **Available Balance**: The actual, liquid money you can spend immediately.\n\n**Why they differ:**\n- **Unsettled Holds**: A merchant (like a hotel or gas station) has placed a temporary pre-authorization hold on your funds.\n- **Uncleared Cheques**: You deposited a cheque, but it is waiting in clearing transit.\n- **Lien Holds**: A portion is locked as collateral (e.g., for an overdraft or unpaid fees).`,
        keywords: ["difference from the available balance", "account balance vs available balance", "why is my balance different"]
      },
      {
        question: "What is a mini statement?",
        answer: `### Mini Statement 📜\n\nA **Mini Statement** is a quick, consolidated summary showing your current account balance and details of your last **5 to 10 transactions**.\n\nYou can access it instantly via ATM terminals, mobile banking apps, or by dialling your bank's SMS/Missed-call banking codes.`,
        keywords: ["what is a mini statement", "mini statement definition", "get mini statement"]
      },
      {
        question: "How can I download my account statement?",
        answer: `### Downloading Account Statements 📥\n\nYou can download detailed statements for any specific time duration (e.g., 3 months, 6 months, financial year) instantly:\n\n1. **Internet Banking**: Navigate to *Accounts* -> *E-Statements*, select your custom date range, and click **Download PDF**.\n2. **Mobile App**: Tap your account card, select *Statement*, and choose email/download.\n3. **FinAura Analyzer**: You can mock upload or check your audited financial transactions directly from the **AI Analyzer** tab!`,
        keywords: ["download my account statement", "get statement pdf", "how to download statement"]
      },
      {
        question: "I don't recognize a transaction. What should I do?",
        answer: `### Handling Unrecognized Transactions 🚨\n\nIf you spot a charge you did not authorize, act immediately to secure your money:\n\n1. **Audit Merchant Details**: Sometimes payment gateways use parent corporate names (e.g., "CCAvenue" instead of the shop name).\n2. **Block Your Card**: Instantly toggle-lock your debit/credit card via your mobile app.\n3. **Raise a Dispute**: Call your bank's 24/7 helpline or submit a dispute chargeback form.\n4. **File Cyber Complaint**: If it is a digital scam, report it on the official cybercrime portal (cybercrime.gov.in in India).`,
        keywords: ["dont recognize a transaction", "unauthorized transaction", "unknown charge"]
      },
      {
        question: "Why is my transaction pending?",
        answer: `### Pending Transactions ⏳\n\nA **Pending** status means the transaction has been initiated, but the payment settlement process between the bank network and the merchant gateway is not yet complete.\n\n**Typical Reasons:**\n- **Network Concurrency**: Slow communication between the acquiring and issuing banks.\n- **Security Audit**: High-value transactions flagged for safety verification.\n- **Weekend Clears**: Transfers made outside business hours on non-real-time networks.`,
        keywords: ["why is my transaction pending", "pending payment", "pending transfer"]
      },
      {
        question: "My money was debited but the receiver didn't get it.",
        answer: `### Debited but Not Received 🔄\n\nThis is a common network timeout issue. Do not panic; your money is entirely safe.\n\n**The Auto-Reversal Mechanism:**\n- **UPI/IMPS Networks**: If a timeout occurs, the banks' automated reconciliation systems trigger an auto-reversal.\n- **Timeline**: Funds are typically credited back to your account within **24 to 48 hours** (regulated under RBI's T+5 timeline, where failure to refund within 5 days incurs a Rs. 100 daily penalty paid to you).`,
        keywords: ["money was debited but", "money deducted receiver not", "debited not received"]
      },
      {
        question: "How long does a bank transfer take?",
        answer: `### Bank Transfer Timelines ⏳\n\nThe duration depends entirely on the network selected:\n\n- **UPI & IMPS**: **Instantaneous** (Available 24/7, 365 days).\n- **NEFT**: Settled in half-hourly batches. Takes **30 minutes to 2 hours** (Available 24/7).\n- **RTGS**: Used for large sums (Rs. 2 lakhs+). Settled in real-time. Takes **10 to 30 minutes** (Available 24/7).\n- **SWIFT (International)**: Takes **1 to 5 business days** due to intermediate correspondent banks.`,
        keywords: ["how long does a bank transfer take", "transfer time", "transfer duration"]
      },
      {
        question: "Can I reverse a completed transaction?",
        answer: `### Reversing Completed Transactions 🚫\n\nOnce a real-time transfer (UPI, IMPS, RTGS) is authorized and settled, **it cannot be reversed** because the funds are already credited to the beneficiary's account.\n\n**Recourse Action:**\n- **Incorrect Account**: Inform your home branch immediately. They will contact the recipient's bank branch to request a reverse-consent (which requires recipient approval).\n- **Fraudulent Transfer**: File an immediate cyber fraud dispute to block the recipient's wallet or bank account.`,
        keywords: ["reverse a completed transaction", "can i cancel a transaction", "undo payment"]
      },
      {
        question: "What are bank charges?",
        answer: `### Understanding Bank Charges 💸\n\nBank charges are nominal fees levied for account administration, regulatory servicing, or active convenience services:\n\n- **Annual Debit Card Fees**: Standard maintenance (usually Rs. 150 - Rs. 300).\n- **Non-Home ATM withdrawals**: Fees applicable after exceeding monthly free limits (usually 5 free swipes).\n- **Non-Maintenance Fees**: Penalty applied when your average balance slips below the mandated floor.\n- **SMS Alert Charges**: Nominal charges for transactional updates.`,
        keywords: ["what are bank charges", "bank fees", "why was i charged bank fee"]
      }
    ]
  },
  {
    id: "upi",
    name: "Unified Payments Interface (UPI)",
    questions: [
      {
        question: "What is UPI?",
        answer: `### Unified Payments Interface (UPI) ⚡\n\n**UPI** is India's revolutionary real-time payment system developed by the National Payments Corporation of India (NPCI). It merges multiple bank accounts into a single mobile application, enabling instant peer-to-peer (P2P) and peer-to-merchant (P2M) transfers without requiring IFSC codes or bank details.\n\n**Primary Identifiers:**\n- **VPA (Virtual Payment Address)**: An easy-to-remember ID like name@upi.\n- **QR Codes**: Fast scan-and-pay vectors.`,
        keywords: ["what is upi", "define upi", "unified payments interface"]
      },
      {
        question: "How do I create a UPI PIN?",
        answer: `### Creating a UPI PIN 🔑\n\nSetting up your security PIN is quick and simple:\n\n1. Open your preferred UPI application (e.g., GPay, PhonePe, BHIM).\n2. Select **Add Bank Account** and pick your bank (it must match your registered mobile number).\n3. Tap **Set UPI PIN** or **Reset PIN**.\n4. Enter the **last 6 digits of your Debit Card** and the **Expiry Date**.\n5. Enter the OTP sent to your registered mobile number.\n6. Input and confirm your new **4 or 6-digit UPI PIN**.\n\n*Never share this PIN with anyone.*`,
        keywords: ["create a upi pin", "set upi pin", "how to set up upi"]
      },
      {
        question: "I forgot my UPI PIN.",
        answer: `### Forgot UPI PIN? Here is the Fix 🔄\n\nIf you forget your UPI PIN, you must reset it using your debit card:\n\n1. Navigate to the **Bank Accounts** section of your UPI app.\n2. Select the specific bank account and click on **Forgot/Reset UPI PIN**.\n3. Enter the **last 6 digits of your debit card** along with its **expiry date**.\n4. Submit the OTP received on your mobile.\n5. Create a new UPI PIN and tap confirm.`,
        keywords: ["forgot my upi pin", "forgot upi pin", "reset upi pin"]
      },
      {
        question: "My UPI payment failed but money was deducted.",
        answer: `### UPI Failed but Money Deducted 🔄\n\nThis is a standard payment gateway handshake failure. There is zero reason to worry.\n\n**The Auto-Refund Resolution:**\n- **Security**: Your money is secure in the bank network's transit pool.\n- **Timeline**: The NPCI auto-refund script automatically returns the deducted amount to your account in **2 to 48 hours**.\n- **Support**: If it exceeds 48 hours, file a dispute inside the UPI app or check with your bank.`,
        keywords: ["upi payment failed but money was deducted", "upi failed money deducted", "failed upi debit"]
      },
      {
        question: "How can I increase my UPI transaction limit?",
        answer: `### UPI Transaction Limits 📈\n\nUPI limits are bound by dual regulations (NPCI guidelines and individual bank policies):\n\n- **Standard Limit**: Up to **Rs. 1 Lakh per day** for standard transfers.\n- **Special Categories**: Up to **Rs. 5 Lakhs per day** for specific merchants (Hospitals, Educational institutions, IPO bids).\n\n**To maximize your access:**\n- Contact your bank to request maximum limit upgrades.\n- Ensure your mobile device has biometric lock activated to support higher tiers.`,
        keywords: ["increase my upi transaction limit", "upi limit upgrade", "higher upi limit"]
      },
      {
        question: "Can I use UPI without a debit card?",
        answer: `### UPI Without a Debit Card 💳\n\nYes! You can now register and set up UPI without a physical debit card using your **Aadhaar Card**:\n\n**How to register with Aadhaar:**\n1. Select Aadhaar-based verification during UPI account setup.\n2. Enter your Aadhaar number and submit the dual OTP verification (OTP from UIDAI and OTP from your bank).\n3. Set your secure UPI PIN. Your mobile number must match both Aadhaar and bank registries.`,
        keywords: ["can i use upi without a debit card", "upi without debit card", "aadhaar upi"]
      },
      {
        question: "What is the daily UPI limit?",
        answer: `### Daily UPI Limits 📊\n\nAccording to NPCI regulations:\n\n- **Maximum Money Transfer**: **Rs. 1,00,000 (1 Lakh)** per 24 hours.\n- **Maximum Transactions**: **10 transfers** per 24 hours.\n- **Initial Registrants**: Limited to **Rs. 5,000** during the first 24 hours of creating a new PIN or profile to defend against cyber frauds.`,
        keywords: ["daily upi limit", "what is the upi limit", "upi transfer limit"]
      },
      {
        question: "How do I change my UPI PIN?",
        answer: `### Changing Your UPI PIN 🔐\n\nFor security reasons, we recommend changing your PIN every 3-6 months:\n\n1. Open your UPI app and tap your profile or **Linked Banks**.\n2. Tap on the bank account you want to change.\n3. Select **Change UPI PIN**.\n4. Enter your **existing UPI PIN**.\n5. Input and confirm your **new UPI PIN**.`,
        keywords: ["change my upi pin", "how to change upi pin", "modify upi pin"]
      },
      {
        question: "Is UPI safe?",
        answer: `### Is UPI Safe? 🛡️\n\nYes! UPI is highly secure because it operates on a robust **Two-Factor Authentication (2FA)** architecture:\n\n- **Factor 1 (Device Binding)**: The app binds cryptographically to your physical SIM card and device fingerprint.\n- **Factor 2 (Security PIN)**: Every transfer requires entering a PIN known only to you.\n\n**Safety Tips:**\n- UPI PIN is required **ONLY to send money**, never to receive money. If someone asks you to enter your PIN to claim cash rewards, it is a scam!`,
        keywords: ["is upi safe", "upi security", "safe to use upi"]
      },
      {
        question: "Why is my UPI payment pending?",
        answer: `### UPI Pending Payments ⏳\n\nIf your UPI transaction sits as pending, it is usually because of server congestion at either your bank, the recipient's bank, or the central NPCI switch.\n\n**What next?**\n- **Do NOT re-send**: Wait for up to 10 minutes. The transaction will either succeed or fail and trigger a refund.\n- **Status Track**: You can check the transaction status updates directly on your app.`,
        keywords: ["why is my upi payment pending", "upi pending", "upi transaction pending"]
      }
    ]
  },
  {
    id: "debit-credit-cards",
    name: "Debit & Credit Cards",
    questions: [
      {
        question: "My debit card is blocked.",
        answer: `### Unblocking Your Debit Card 💳\n\nIf your card is blocked, it is typically due to three incorrect PIN attempts or a temporary safety trigger.\n\n**How to Unblock:**\n1. **App Controls**: Check your bank's mobile app under *Card Management* to toggle it active.\n2. **Auto-Reset**: Blocked PINs often reset automatically within **24 hours**.\n3. **Customer Helpline**: Call customer care or visit a branch with KYC documents if it was blocked for suspicious transactions.`,
        keywords: ["debit card is blocked", "card blocked", "how to unblock card"]
      },
      {
        question: "How do I activate my new debit card?",
        answer: `### Activating a New Debit Card 🚀\n\nTo activate your new card, you must complete PIN generation first:\n\n- **ATM Method**: Insert card, select *Generate PIN (Green PIN)*, enter your registered mobile number, submit the OTP, and create a permanent PIN.\n- **Mobile/Net Banking**: Log in, search for *Debit Card Settings*, select *Set PIN*, verify with OTP, and activate instantly.`,
        keywords: ["activate my new debit card", "card activation", "how to activate card"]
      },
      {
        question: "I lost my debit card.",
        answer: `### Immediate Emergency Action for Lost Cards 🚨\n\nIf you have lost your card, secure your account instantly:\n\n1. **Block the Card**: Access your bank app or FinAura sidebar and toggle the card block to permanent.\n2. **SMS Block**: Send a block keyword to your bank's short-code number.\n3. **Call Customer Care**: Request manual block from customer care.\n\n*A temporary block is best if you think the card is nearby in your home.*`,
        keywords: ["lost my debit card", "lost card", "misplaced card"]
      },
      {
        question: "How do I block my card immediately?",
        answer: `### How to Block Your Card Instantly 🔒\n\n- **Mobile Banking App**: Log in -> Card Settings -> **Block Card (Permanent/Temporary)**.\n- **Missed Call/SMS Banking**: Use standard banking text formats.\n- **Customer Care Support**: Dial your bank's dedicated 24/7 card blocking helpline immediately.`,
        keywords: ["how do i block my card immediately", "block card instantly", "emergency card block"]
      },
      {
        question: "How do I reset my ATM PIN?",
        answer: `### Resetting Your ATM PIN 🔑\n\n- **At Bank ATM**: Insert card, tap *PIN Generation / Forgot PIN*, enter your OTP, and key in your new 4-digit PIN.\n- **Via Net Banking**: Navigate to *Cards* -> *Debit Card PIN* -> *Reset PIN* -> Complete OTP verification -> Save.`,
        keywords: ["reset my atm pin", "reset pin atm", "atm pin change"]
      },
      {
        question: "Can I use my debit card internationally?",
        answer: `### International Card Usage 🌍\n\nYes, but you must manually enable international transactions under RBI security mandates:\n\n1. Log in to your mobile banking app and go to **Card Management**.\n2. Select **Limits & Access**.\n3. Toggle **International Transactions** to "ON".\n4. Set customized daily limits for overseas ATM cash withdrawals and online international merchants.`,
        keywords: ["use my debit card internationally", "international transaction debit card", "overseas card usage"]
      },
      {
        question: "What is contactless payment?",
        answer: `### Contactless Payments (NFC) 📡\n\n**Contactless Payment** utilizes Near-Field Communication (NFC) technology to allow you to pay simply by tapping your debit/credit card on an NFC-enabled POS terminal.\n\n**Features:**\n- **Speed**: No PIN required for small transactions (up to Rs. 5,000 per swipe in India).\n- **Control**: Toggle contactless access "ON" or "OFF" inside your bank app's security dashboard.`,
        keywords: ["what is contactless payment", "contactless card", "nfc payment"]
      },
      {
        question: "My card was swallowed by the ATM.",
        answer: `### Card Swallowed by ATM? 🏦\n\nThis occurs if you input a wrong PIN multiple times, fail to collect the card in time, or if the ATM machine suffers a system glitch.\n\n**Next Steps:**\n1. **Immediate Block**: Block the card via mobile app to eliminate risk.\n2. **Report to Branch**: Inform the branch manager immediately (if the ATM is attached to a branch).\n3. **Call Helpline**: Obtain a formal complaint ticket number. A replacement card is typically mailed within **5-7 business days**.`,
        keywords: ["card was swallowed by the atm", "atm swallowed card", "card stuck in atm"]
      },
      {
        question: "Why was my card declined?",
        answer: `### Why Your Card Was Declined ❌\n\nCommon reasons for transaction declines:\n\n- **Insufficient Balance**: The transaction amount exceeds your available balance.\n- **Deactivated Settings**: E-commerce, contactless, or international transactions are switched "OFF" in your card settings.\n- **Incorrect PIN**: Entered a wrong security PIN.\n- **Limit Exceeded**: The transaction exceeds your daily custom limit.`,
        keywords: ["why was my card declined", "card declined", "payment failed card"]
      },
      {
        question: "How do I replace my damaged card?",
        answer: `### Replacing a Damaged Card 🔄\n\nIf your card is scratched, chipped, or broken:\n\n1. Log into your banking app.\n2. Navigate to **Debit Card Services** -> **Reissue/Replacement Card**.\n3. Select the reason as "Damaged".\n4. Confirm your residential address and pay a nominal reissuing charge (around Rs. 200 - Rs. 250). Your new card will arrive in **5-7 business days**.`,
        keywords: ["replace my damaged card", "damaged card replacement", "card broken"]
      }
    ]
  },
  {
    id: "loans",
    name: "Loans & Lending",
    questions: [
      {
        question: "What types of loans do you offer?",
        answer: `### Digital Lending Options 💰\n\nFinAura partners with premier banks to guide you toward customized lending plans:\n\n- **Personal Loans**: Unsecured loans for wedding expenses, travel, or medical bills.\n- **Home Loans**: Long-term mortgages for property acquisition.\n- **Education Loans**: Structured assistance for domestic and international university degrees.\n- **Vehicle Loans**: Low-interest solutions for EVs and passenger cars.\n- **Gold Loans**: Instant liquid credit leveraging your gold reserves.`,
        keywords: ["what types of loans", "loan options", "available loans"]
      },
      {
        question: "Am I eligible for a personal loan?",
        answer: `### Personal Loan Eligibility Guidelines 📝\n\nPrimary benchmarks for personal loan approval include:\n\n- **Age**: Typically between 21 and 60 years old.\n- **Income Profile**: Salaried (Rs. 25,000+ monthly) or self-employed with stable income.\n- **Credit Score (CIBIL)**: A credit score of **750+** is highly recommended for faster approval and better interest rates.\n- **Debt-to-Income Ratio**: Your current monthly EMI obligations should be under 50% of your net income.`,
        keywords: ["eligible for a personal loan", "loan eligibility", "am i eligible for loan"]
      },
      {
        question: "How is EMI calculated?",
        answer: `### How EMI is Calculated 🧮\n\n**EMI (Equated Monthly Installment)** is calculated using the formula:\n\n$$\\text{EMI} = P \\times r \\times \\frac{(1+r)^n}{(1+r)^n - 1}$$\n\nWhere:\n- **$P$**: Principal loan amount.\n- **$r$**: Monthly interest rate ($R / 12 / 100$).\n- **$n$**: Loan tenure in months.\n\n*Tip: Check out our interactive Loan calculators to simulate compounding curves!*`,
        keywords: ["how is emi calculated", "emi formula", "calculate emi"]
      },
      {
        question: "What is an interest rate?",
        answer: `### Interest Rates Explained 📈\n\nAn **Interest Rate** is the percentage fee charged by lenders on borrowed capital, or paid to depositors on saved capital, over a specific duration (usually yearly).\n\n- **For Borrowers**: The cost of taking credit.\n- **For Savers**: The reward for deferring spending.`,
        keywords: ["what is an interest rate", "define interest rate", "what is interest"]
      },
      {
        question: "Fixed vs floating interest rate?",
        answer: `### Fixed vs. Floating Interest Rates ⚖️\n\n- **Fixed Interest Rate**:\n  - **Consistency**: Remains constant throughout the loan tenure.\n  - **Advantage**: Safe from sudden market rate hikes; makes budgeting predictable.\n\n- **Floating (Variable) Interest Rate**:\n  - **Fluctuating**: Linked to benchmark lending indices (like Repo Rates).\n  - **Advantage**: Typically cheaper than fixed rates initially, and reduces overall EMIs if market interest rates decline.`,
        keywords: ["fixed vs floating", "floating interest rate", "fixed vs variable interest"]
      },
      {
        question: "Can I prepay my loan?",
        answer: `### Prepaying Your Loan 💸\n\nYes! You can prepay your loan (either partially or in full) before its maturity to reduce your interest burden.\n\n- **Floating Rate Loans**: Zero foreclosure fees applicable per RBI guidelines (highly recommended).\n- **Fixed Rate Loans**: Lenders may charge a nominal foreclosure penalty (typically 2% to 4% of the remaining principal).`,
        keywords: ["prepany my loan", "can i prepay my loan", "prepayment of loan"]
      },
      {
        question: "Is there any foreclosure charge?",
        answer: `### Foreclosure Charges Explained 📉\n\n**Foreclosure** refers to paying off your loan principal in full before the maturity date:\n\n- **Floating Loans**: No foreclosure charges allowed.\n- **Fixed Loans**: Small foreclosure penalties may apply.\n\n*Review your loan terms carefully before initiating full early settlements.*`,
        keywords: ["foreclosure charge", "foreclosure fee", "charges to close loan early"]
      },
      {
        question: "How can I check my loan status?",
        answer: `### Checking Loan Application Status 🔍\n\n- **Mobile Banking Portal**: Under the *Loans* tab, select *Application Tracker*.\n- **Web Inquiry**: Input your Loan Application Number and registered mobile number on the bank's tracking webpage.\n- **Customer Helpdesk**: Call the bank's dedicated loan helpdesk for instant updates.`,
        keywords: ["check my loan status", "track loan application", "loan tracking"]
      },
      {
        question: "How long does loan approval take?",
        answer: `### Loan Approval Timelines ⏳\n\n- **Pre-Approved Digital Loans**: Delivered instantly to your account in **under 2 minutes** (no paperwork needed).\n- **Standard Personal Loans**: Takes **1 to 3 business days**.\n- **Home & Property Loans**: Takes **1 to 3 weeks** due to physical property evaluations and verification of title deeds.`,
        keywords: ["how long does loan approval take", "loan approval timeline", "loan dispatch time"]
      },
      {
        question: "What is the maximum loan amount I can get?",
        answer: `### Maximum Loan Amount Capacity 💰\n\nYour maximum credit limit depends on your income, age, credit history, and asset collateral:\n\n- **Personal Loans**: Typically up to Rs. 20 Lakhs to 40 Lakhs (governed by your monthly salary multiplier).\n- **Home Loans**: Generally capped at **80% to 90% of the property value**.\n- **Vehicle Loans**: Up to **90% to 100% of the on-road price** depending on credit evaluation.`,
        keywords: ["maximum loan amount", "how much loan can i get", "max loan limit"]
      }
    ]
  },
  {
    id: "fd-investments",
    name: "FD & Investments",
    questions: [
      {
        question: "Is FD better than a savings account?",
        answer: `### Fixed Deposits vs. Savings Accounts ⚖️\n\n- **Fixed Deposit (FD)**: Better for surplus money you do not need immediate access to. It offers much higher interest rates (6% - 8% vs. 3% - 4%) locked securely over a fixed timeline.\n- **Savings Account**: Better for daily liquidity and transacting needs. You have flexible 24/7 access to your money.`,
        keywords: ["is fd better than a savings", "savings vs fd", "fd or savings"]
      },
      {
        question: "What is the current FD interest rate?",
        answer: `### Current FD Interest Rates 📊\n\nStandard FD rates at premier institutions range from **6.5% to 8.2% per annum**:\n\n- **Regular Citizens**: 6.50% - 7.50% depending on maturity.\n- **Senior Citizens**: Earn an additional **0.50% premium**, pushing yields to **7.00% - 8.20%**.\n\n*Tenures of 1-3 years generally yield the highest interest rates.*`,
        keywords: ["current fd interest rate", "fd interest rates today", "fd rate"]
      },
      {
        question: "Can I break my FD early?",
        answer: `### Premature FD Withdrawal ⚠️\n\nYes, you can break your Fixed Deposit early, but it incurs a nominal penalty:\n\n- **Penalty Fee**: Typically a **0.5% to 1% reduction** in the applicable interest rate for the period the deposit remained with the bank.\n- **Tax Savers**: 5-Year Tax Saver FDs have a mandatory lock-in period and cannot be broken prematurely under any circumstances.`,
        keywords: ["break my fd early", "premature withdrawal of fd", "close fd prematurely"]
      },
      {
        question: "What happens if my FD matures?",
        answer: `### FD Maturity Processing 🔄\n\nUpon maturity of your Fixed Deposit, the bank executes your chosen instruction:\n\n1. **Auto-Renewal**: Rolls over the principal (and optionally interest) into a new FD at the prevailing rate.\n2. **Auto-Liquidation (Pay out)**: Credits the entire principal + accrued interest directly into your linked savings account.`,
        keywords: ["what happens if my fd matures", "fd maturity", "fixed deposit rollover"]
      },
      {
        question: "Which investment is safer?",
        answer: `### Safe Investment Options 🛡️\n\nFor absolute capital safety, the best investment choices include:\n\n1. **Government Schemes**: Public Provident Fund (PPF), National Savings Certificate (NSC), Sovereign Gold Bonds (SGB).\n2. **Fixed Deposits**: Secured up to Rs. 5 Lakhs per bank by DICGC insurance.\n3. **Post Office Savings Schemes**: Backed directly by the Government of India.`,
        keywords: ["which investment is safer", "safe investments", "low risk investment"]
      },
      {
        question: "Should I invest in an FD or mutual funds?",
        answer: `### FD vs. Mutual Funds 📊\n\n- **Fixed Deposit (FD)**:\n  - **Safety**: Guarantees your principal and return.\n  - **Growth**: Moderate returns; does not beat long-term inflation.\n\n- **Mutual Funds**:\n  - **Safety**: Subject to market risk (fluctuates).\n  - **Growth**: Equity Mutual Funds historical returns are **12% to 15% CAGR** over 5+ years, making them ideal for long-term wealth growth.\n\n*Recommendation: Balance both based on your Risk Profiler quiz results!*`,
        keywords: ["fd or mutual funds", "invest in fd or mutual funds", "mutual funds vs fixed deposit"]
      },
      {
        question: "How much tax do I pay on FD interest?",
        answer: `### FD Interest Taxation (TDS) 💸\n\n- **Income Tax Bracket**: FD interest earnings are added directly to your annual income and taxed at your specific slab rate.\n- **Tax Deducted at Source (TDS)**: Banks deduct 10% TDS if your total FD interest exceeds **Rs. 40,000** in a financial year (Rs. 50,000 for senior citizens).\n- **Exemption**: Submit Form 15H (senior citizens) or Form 15G (regular citizens) if your total income is below the taxable threshold to avoid TDS.`,
        keywords: ["how much tax do i pay on fd interest", "tax on fd", "tds on fixed deposit"]
      },
      {
        question: "What is compound interest?",
        answer: `### The Magic of Compound Interest ✨\n\n**Compound Interest** is the interest calculated on the initial principal and also on the accumulated interest from previous periods. It is essentially earning "interest on interest."\n\n$$A = P \\left(1 + \\frac{r}{n}\\right)^{nt}$$\n\n**Compounding Benefits:**\n- **Exponential Growth**: Your wealth grows slowly at first, but accelerates dramatically over longer tenures.`,
        keywords: ["what is compound interest", "define compound interest", "magic of compounding"]
      },
      {
        question: "Can I open an FD online?",
        answer: `### Opening an FD Online 🌐\n\nYes! You can open a Fixed Deposit instantly via mobile app or net banking in under a minute:\n\n1. Go to **Deposits/Investments**.\n2. Tap **Open Fixed Deposit**.\n3. Enter your target Principal Amount and select your desired Tenure.\n4. Select your payout option (monthly, quarterly, or cumulative).\n5. Confirm and fund instantly from your Savings Account.`,
        keywords: ["can i open an fd online", "open fd online", "create digital fd"]
      },
      {
        question: "How do recurring deposits work?",
        answer: `### How Recurring Deposits Work ⏳\n\nWith an RD:\n- You commit to saving a fixed monthly sum (e.g., Rs. 2,000) for a specified tenure.\n- The bank offers a guaranteed interest rate equivalent to FDs.\n- On maturity, you receive your accumulated principal deposits along with compounded interest. It is a fantastic way to build a robust emergency fund!`,
        keywords: ["how do recurring deposits work", "how rd works", "rd mechanism"]
      }
    ]
  },
  {
    id: "mobile-banking",
    name: "Mobile & Net Banking",
    questions: [
      {
        question: "I forgot my internet banking password.",
        answer: `### Recovering Net Banking Password 🔑\n\nIf you have forgotten your password, reset it instantly online:\n\n1. Go to your bank's portal and select **Forgot Password / Reset Login Password**.\n2. Enter your User ID and bank account details.\n3. Verify with the OTP sent to your registered mobile number.\n4. Enter your Debit Card details (number, expiry, and ATM PIN) to authenticate.\n5. Create and confirm a new password.`,
        keywords: ["forgot my internet banking password", "forgot netbanking password", "reset netbanking password"]
      },
      {
        question: "How do I register for mobile banking?",
        answer: `### Registering for Mobile Banking 📱\n\n1. Download your bank's official application from the App Store or Google Play Store.\n2. Enter your bank account details or Debit Card parameters.\n3. Verify the secure SMS payload sent from your registered mobile SIM.\n4. Complete authentication with OTP or ATM PIN.\n5. Set up your secure **4-digit Login MPIN** and enable biometric fingerprint login.`,
        keywords: ["register for mobile banking", "how to set up mobile banking", "activate mobile app"]
      },
      {
        question: "Can I transfer money internationally?",
        answer: `### International Money Transfers 🌍\n\nYes, you can transfer money overseas via:\n\n- **Outward Remittance (SWIFT)**: Processed via Net Banking under the **Liberalised Remittance Scheme (LRS)**.\n- **Regulated Limits**: You can send up to USD 250,000 per financial year for studies, travel, or investment purposes.\n- **Information Needed**: Recipient Name, Account Number, Bank Name, Address, and **SWIFT Code**.`,
        keywords: ["transfer money internationally", "outward remittance", "send money abroad"]
      },
      {
        question: "How do I enable biometric login?",
        answer: `### Enabling Biometric Login 🔒\n\nSecure, fast logins can be turned on easily:\n\n1. Open your mobile banking app settings.\n2. Toggle **Enable Fingerprint / Face ID** to "ON".\n3. Authenticate with your active MPIN to link biometric tokens.\n4. Securely log in using your fingerprint or Face ID!`,
        keywords: ["enable biometric login", "fingerprint login", "face id setup"]
      },
      {
        question: "My banking app keeps crashing.",
        answer: `### Troubleshooting App Crashes 📱🔧\n\nIf your app is unstable, execute these troubleshooting steps:\n\n1. **Clear App Cache**: Under Device Settings -> Apps -> Storage -> **Clear Cache**.\n2. **Update App**: Check for the latest security patches in the Play/App Store.\n3. **Deactivate Developer Options**: For security reasons, many banking apps crash if Developer Mode is enabled on Android.\n4. **Reinstall**: Clean install the application if issues persist.`,
        keywords: ["banking app keeps crashing", "app crash", "crashing app fixes"]
      },
      {
        question: "Why can't I log in?",
        answer: `### Login Access Failures 🚫\n\nIf you are locked out, typical causes include:\n\n- **Server Maintenance**: Scheduled bank system upgrades (usually at midnight).\n- **Locked User ID**: Triggered by multiple incorrect password attempts.\n- **Network Delays**: Slow data connection preventing security token handshakes.`,
        keywords: ["why cant i log in", "login failed", "login issue netbanking"]
      },
      {
        question: "How do I change my registered mobile number?",
        answer: `### Changing Registered Mobile Number 📱\n\nDue to stringent safety regulations, this requires solid authentication:\n\n- **At Bank ATM**: Insert card, select *Utility Services* -> *Change Mobile Number*, enter OTPs from both old and new SIMs.\n- **Branch Visit**: Submit a physical Change Form with address proof to complete updates within 24 hours.`,
        keywords: ["change my registered mobile number", "change mobile number bank", "update mobile number"]
      },
      {
        question: "How do I update my email?",
        answer: `### Updating Your Email ID 📧\n\n- **Net Banking**: Log in -> Profile Settings -> Contact Details -> Edit Email -> Verify via OTP -> Save.\n- **Mobile Banking App**: Profile -> Personal Details -> Edit Email -> Enter OTP to verify instantly.`,
        keywords: ["how do i update my email", "change email bank", "update email ID"]
      },
      {
        question: "Can I use internet banking abroad?",
        answer: `### Net Banking Abroad 🌍\n\nYes! You can log in and use your internet banking anywhere globally.\n\n**Crucial Safety Tips:**\n- Ensure you have **international roaming active** on your registered SIM to receive transactional security OTPs.\n- Avoid logging in using public shared Wi-Fi networks (hotels/airports) without a secure VPN.`,
        keywords: ["use internet banking abroad", "net banking overseas", "international login"]
      },
      {
        question: "How do I activate SMS alerts?",
        answer: `### Activating SMS Alerts 📲\n\nSMS alerts are generally on by default for safety. If they have been turned off:\n\n1. Log into Net Banking.\n2. Navigate to **Alerts Manager / SMS Banking Settings**.\n3. Toggle alerts "ON" for transaction thresholds (e.g. any debit over Rs. 100) and save.`,
        keywords: ["how do i activate sms alerts", "turn on sms banking", "sms alerts setup"]
      }
    ]
  },
  {
    id: "security",
    name: "Security & Safety",
    questions: [
      {
        question: "I received a suspicious SMS.",
        answer: `### Suspicious SMS Warning ⚠️\n\nIf you receive a text claiming your account will be frozen, or offering unrequested rewards with a link:\n\n- **Do NOT Click**: Links lead to mock phishing portals designed to steal password hashes.\n- **Check Sender ID**: Authentic bank communications feature registered alphanumeric sender headers (e.g. *HP-HDFCBK*).\n- **Report**: Forward the screenshot to your bank's official abuse/phishing desk.`,
        keywords: ["received a suspicious sms", "suspicious text", "phishing message"]
      },
      {
        question: "Someone called asking for my OTP.",
        answer: `### Emergency: OTP Scam Attempt 🚨\n\n**Never share your One-Time Password (OTP) with anyone, under any circumstances.**\n\n- Bank executives, police, or RBI officials will **never** ask for your OTP, password, or ATM PIN.\n- If someone claims they are calling from customer support to reverse a wrong debit, hang up immediately. They are trying to drain your account!`,
        keywords: ["someone called asking for my otp", "otp fraud call", "sharing otp phone"]
      },
      {
        question: "Is it safe to share my account number?",
        answer: `### Sharing Account Numbers Safely 🛡️\n\nSharing your Account Number and IFSC code is generally safe for receiving deposits or payments.\n\n**Safety Guardrails:**\n- **Keep other parameters hidden**: Never share your debit card details, PAN, CVV, passwords, or OTPs. Those are the keys to authorization.`,
        keywords: ["safe to share my account number", "share account details", "is account number public"]
      },
      {
        question: "What should I do if I lose my phone?",
        answer: `### Lost Phone? Immediate Checklist 🚨\n\nIf your registered phone is lost, act fast to prevent digital wallet compromises:\n\n1. **Block SIM Card**: Call your telecom provider instantly to block your SIM card. This stops fraudsters from receiving security OTPs.\n2. **Deactivate UPI Apps**: Call your bank to suspend mobile app sessions and block your UPI VPAs.\n3. **Lock Device**: Erase your device remotely via Apple iCloud or Google Find My Device.`,
        keywords: ["what should i do if i lose my phone", "lost phone account block", "sim lost block"]
      },
      {
        question: "How do I report fraud?",
        answer: `### Reporting Financial Fraud 🚨\n\nIf you have been scammed:\n\n1. **Call 1930**: The official National Cyber Crime helpline in India (or visit **cybercrime.gov.in**).\n2. **Contact Bank**: Notify your bank's fraud reporting wing within **3 hours** to initiate formal chargeback blocks (which maximizes fund recovery options under RBI's zero-liability guidelines).\n3. **File Police Complaint**: Secure a formal Cyber Cell FIR copy.`,
        keywords: ["how do i report fraud", "report scam", "file a fraud complaint"]
      },
      {
        question: "Can the bank ask for my PIN?",
        answer: `### ABSOLUTELY NOT! 🚫\n\nNo banker, auditor, or official support executive has the authority to ask for your **ATM PIN, UPI PIN, or Net Banking Password**.\n\nThese security credentials are encrypted end-to-end and are purely meant for your private authorization. If anyone asks for them, they are a fraudster.`,
        keywords: ["can the bank ask for my pin", "does bank ask for pin", "banker calling pin"]
      },
      {
        question: "How can I secure my account?",
        answer: `### Bank Account Protection Checklist 🛡️\n\n1. **Strong Password hygiene**: Use complex alphanumeric strings; never reuse email passwords.\n2. **Two-Factor Authentication (2FA)**: Activate biometric locks and transactional SMS tokens.\n3. **Limit Transaction exposure**: Toggle ATM/E-commerce limits down inside your card settings when not in use.\n4. **Monitor Statements**: Regularly review statements using the FinAura Analyzer to spot unauthorized passive charges.`,
        keywords: ["how can i secure my account", "secure banking", "protect my account"]
      },
      {
        question: "What is phishing?",
        answer: `### What is Phishing? 🎣\n\n**Phishing** is a cyber attack where scammers create fake websites, emails, or messages mimicking authentic institutions (like your bank) to trick you into entering confidential passwords, credit card numbers, or OTPs.\n\nAlways verify domain names carefully. A genuine bank portal will never use domains like *secure-login-netbanking-12.com*.`,
        keywords: ["what is phishing", "phishing definition", "phishing attack explained"]
      },
      {
        question: "How do I identify fake banking websites?",
        answer: `### Detecting Fake Banking Sites 🔍🛡️\n\n- **Check the Domain Name**: Scanners use typosquatting (e.g., *hdcfbank.com* instead of *hdfcbank.com*).\n- **Look for the HTTPS Lock**: While fake sites have SSL, ensure it lists the bank's true corporate name.\n- **Clunky UI & Graphics**: Poor spacing, broken links, and spelling mistakes are instant signs of a spoofed site.`,
        keywords: ["how do i identify fake banking", "fake bank website", "fake netbanking link"]
      },
      {
        question: "What should I do if someone knows my password?",
        answer: `### Compromised Password Protocol 🚨\n\nIf you suspect someone knows your password:\n\n1. **Change it immediately**: Log in and modify your password.\n2. **Deactivate other active sessions**: Under Security, terminate other logged-in device profiles.\n3. **Temporarily Freeze Card**: Switch cards to temporary hold until you confirm account security.`,
        keywords: ["someone knows my password", "password compromised", "change hacked password"]
      }
    ]
  },
  {
    id: "financial-advice",
    name: "Financial Advice",
    questions: [
      {
        question: "I earn ₹40,000 per month. How much should I save?",
        answer: `### Budgeting for ₹40,000 Income 📊\n\nUsing the standard **50-30-20 rule** on a net income of **Rs. 40,000**:\n\n- **Needs (50%)**: Rs. 20,000 (Rent, groceries, utilities, debt).\n- **Wants (30%)**: Rs. 12,000 (Dining, entertainment, shopping).\n- **Savings (20% Minimum)**: **Rs. 8,000** monthly.\n\n**FinAura Action Steps:**\n1. Set aside Rs. 8,000 at the start of the month, not at the end.\n2. Build a Rs. 1.2 Lakh emergency fund (3 months of salary).\n3. Start a small SIP of Rs. 3,000 in diversified equity index funds for growth.`,
        keywords: ["earn ₹40,000 per month", "save out of 40k", "budgeting for 40000"]
      },
      {
        question: "How can I build an emergency fund?",
        answer: `### Building an Emergency Fund 🛡️💼\n\nAn **Emergency Fund** is your financial safety net, designed to cover 3 to 6 months of living expenses in case of sudden job losses or medical emergencies.\n\n**Execution Steps:**\n1. **Calculate target**: If your monthly living cost is Rs. 30,000, your target fund is Rs. 90,000 to Rs. 1.8 Lakhs.\n2. **Stash separately**: Put it in a high-yield liquid mutual fund or separate savings account so you don't spend it.\n3. **Automate**: Direct Rs. 2,000 to Rs. 5,000 monthly into a dedicated recurring deposit.`,
        keywords: ["how can i build an emergency fund", "emergency fund construction", "emergency fund target"]
      },
      {
        question: "Should I repay my loan or invest first?",
        answer: `### Repaying Debt vs. Investing ⚖️\n\nCompare the **Interest Cost** of your debt against the **Expected Return** on your investments:\n\n- **High-Interest Debt (Credit Cards, Personal Loans)**: Interest sits at 12% to 35%. **Always repay these first!** No safe investment can match this rate.\n- **Low-Interest Debt (Home Loans, Education Loans)**: Interest is usually 7% to 9.5%. Since equity index funds historical returns are **12%+**, you should maintain standard loan EMIs while investing your surplus cash.`,
        keywords: ["repay my loan or invest first", "invest or pay off debt", "debt vs investment priority"]
      },
      {
        question: "What's a good monthly budget?",
        answer: `### Creating a Healthy Monthly Budget 📈\n\nA robust, scalable budget uses the **50-30-20 principle**:\n\n- **50% for Essential Needs**: Rent, EMI, fuel, medicine.\n- **30% for Lifestyle Wants**: Dining, Netflix, travel.\n- **20% for Long-term Wealth**: SIPs, PPF, emergency stashes.\n\n*Review your active subscription audit in our AI Analyzer to instantly cut passive leakage and stay within budget limits!*`,
        keywords: ["whats a good monthly budget", "healthy budget", "budget blueprint"]
      },
      {
        question: "How much should I keep in savings?",
        answer: `### Savings Liquidity Guidelines 💡💸\n\nAvoid keeping excessive cash in a basic savings account because inflation degrades its value over time.\n\n**Ideal Allocations:**\n- **Liquid Cash**: Only keep **1 to 2 months** of expenses in your primary savings account for daily transacting.\n- **Emergency Reserve**: 3-6 months of expenses parked in high-yield Fixed Deposits or Liquid Mutual Funds.\n- **Surplus**: Deploy into active investment products (mutual fund SIPs, PPF, gold) for higher growth.`,
        keywords: ["how much should i keep in savings", "cash balance savings account", "how much liquid cash"]
      },
      {
        question: "Is a credit card good or bad?",
        answer: `### The Credit Card Double-Edged Sword 💳⚖️\n\n- **The Good**: Offers credit building scores, purchase protection cashback, and free short-term liquidity (interest-free periods up to 45 days).\n- **The Bad**: Late payments carry astronomical interest rates (36% to 48% annually), which can trap you in deep debt cycles.\n\n**Verdict**: It is **excellent** if you pay your total due in full every single month. It is **highly toxic** if you treat it as free money or pay only the minimum due.`,
        keywords: ["is a credit card good or bad", "credit card pros cons", "should i get a credit card"]
      },
      {
        question: "How can I improve my credit score?",
        answer: `### Improving Your Credit Score (CIBIL) 📈🛡\n\nTo build a pristine score of **750+**:\n\n1. **Punctual EMIs**: Pay all credit bills and EMIs on time. Even a one-day delay hurts your score.\n2. **Credit Utilization Limit**: Keep your credit card spend below **30% of your total credit limit**.\n3. **Avoid credit chasing**: Do not apply for multiple loans or credit cards concurrently, as each application triggers a hard inquiry.\n4. **Prune Old Accounts**: Maintain older credit cards active to expand your average credit history length.`,
        keywords: ["how can i improve my credit score", "increase cibil score", "better credit score"]
      },
      {
        question: "What's the 50-30-20 budgeting rule?",
        answer: `### The 50-30-20 Budgeting Rule 📊\n\nDeveloped by Elizabeth Warren, this is the gold standard for personal finance:\n\n- **50% - Needs**: Absolute essentials required to survive (housing, groceries, utility bills).\n- **30% - Wants**: Optional spending that enriches your lifestyle (leisure travel, dining out, hobbies).\n- **20% - Savings**: Dedicated capital for future goals, SIPs, and debt reduction.`,
        keywords: ["50-30-20", "50 30 20 rule", "what is 50 30 20"]
      },
      {
        question: "How do I reduce unnecessary expenses?",
        answer: `### Cutting Out Wasteful Expenses 📉🔍\n\n1. **Audit Subscriptions**: Standard media subscriptions (Netflix, Spotify, Canva) are common drains. Check our **Subscription Auditor** inside the **AI Analyzer** tab for alerts!\n2. **Delay Purchases**: Implement the **48-Hour Rule** for optional items to prevent impulse shopping.\n3. **Meal prep**: Trim heavy restaurant and food delivery bills by preparing more meals at home.\n4. **Negotiate Bills**: Keep competitive rates on internet and insurance premiums.`,
        keywords: ["reduce unnecessary expenses", "how to cut expenses", "reduce spending"]
      },
      {
        question: "Should I invest or keep money in the bank?",
        answer: `### Invest vs. Keeping Cash in Bank ⚖️\n\n- **Keeping Cash in Bank**: Yields 3% to 4% interest. Since inflation averages 5% to 6%, letting cash sit idle actually **loses purchasing power over time**.\n- **Investing (PPF, SIPs, Mutual Funds)**: Yields 7% to 15% long-term. This grows your true wealth and beats inflation.\n\n**Perfect balance**: Store your emergency fund in the bank, and invest your remaining long-term surplus!`,
        keywords: ["invest or keep money in the bank", "should i invest or save", "investing vs saving"]
      }
    ]
  },
  {
    id: "advanced-banking",
    name: "Advanced Banking",
    questions: [
      {
        question: "What is a SWIFT transfer?",
        answer: `### SWIFT Transfers 🌍🏦\n\n**SWIFT** (Society for Worldwide Interbank Financial Telecommunication) is a secure messaging network banks use to coordinate fast, accurate international cross-border fund transfers.\n\n- **Process**: Money transits through one or more correspondent banks before reaching its final overseas destination.\n- **Aeronautical Address**: Each participating bank has an 8 or 11-character identifier called a SWIFT/BIC code.`,
        keywords: ["what is a swift transfer", "swift payment", "how international swift works"]
      },
      {
        question: "What is an IFSC code?",
        answer: `### Indian Financial System Code (IFSC) 🔠\n\n**IFSC** is an 11-character alphanumeric code assigned by the Reserve Bank of India to uniquely identify individual bank branches participating in electronic fund transfer systems (NEFT, RTGS, IMPS).\n\n- **Structure**: First 4 characters represent bank name, the 5th character is '0' (reserved), and the last 6 characters identify the branch.`,
        keywords: ["what is an ifsc code", "ifsc definition", "purpose of ifsc"]
      },
      {
        question: "What is a MICR code?",
        answer: `### Magnetic Ink Character Recognition (MICR) 🔢\n\n**MICR** is a 9-digit numerical code printed at the bottom of cheque leaves using magnetic ink.\n\n- **Purpose**: Primarily used by automated cheque clearing systems to verify, read, and clear cheques quickly without manual parsing errors.\n- **Slices**: Digits 1-3 indicate city, digits 4-6 indicate bank, and 7-9 indicate the specific branch.`,
        keywords: ["what is a micr code", "micr definition", "purpose of micr"]
      },
      {
        question: "What is NEFT?",
        answer: `### National Electronic Funds Transfer (NEFT) ⏳\n\n**NEFT** is a major nationwide electronic fund transfer system in India.\n\n- **Clearing mechanism**: Operates on a half-hourly batch clearance cycle (24/7/365).\n- **Limits**: No official minimum or maximum transfer ceilings, though banks may enforce custom daily caps for internet banking safety.`,
        keywords: ["what is neft", "neft transfer", "neft settlement"]
      },
      {
        question: "Difference between NEFT, RTGS, and IMPS?",
        answer: `### NEFT vs. RTGS vs. IMPS ⚖️\n\n- **NEFT (National Electronic Funds Transfer)**:\n  - **Speed**: Batch clearances (takes 30 mins to 2 hours).\n  - **Limits**: No minimum limit.\n- **RTGS (Real Time Gross Settlement)**:\n  - **Speed**: Instantaneous individual settlement.\n  - **Limits**: Minimum Rs. 2 Lakhs (intended for corporate high-value transactions).\n- **IMPS (Immediate Payment Service)**:\n  - **Speed**: Instantaneous peer-to-peer.\n  - **Limits**: Capped at Rs. 5 Lakhs per day (best for daily consumer transfers).`,
        keywords: ["difference between neft rtgs and imps", "neft vs rtgs vs imps", "payment modes differences"]
      },
      {
        question: "What is a nominee?",
        answer: `### What is an Account Nominee? 👥🛡️\n\nA **Nominee** is an individual designated by the account holder to receive the funds and assets held in the account in the unfortunate event of the depositor's demise.\n\n- **Role**: Serves as a legal custodian, facilitating hassle-free claims processing without complex succession courts or disputes.`,
        keywords: ["what is a nominee", "nominee definition", "bank account nominee"]
      },
      {
        question: "How do I add a nominee?",
        answer: `### Adding/Updating a Nominee 📝\n\n- **Via Net Banking**: Log in -> Profile Settings -> Add/Modify Nominee -> Select beneficiary details -> Verify with OTP.\n- **Via Branch**: Submit a physical nomination form (Form DA-1) containing the signature of the account holder and nominee details.`,
        keywords: ["how do i add a nominee", "add nominee bank account", "nomination process"]
      },
      {
        question: "What is overdraft protection?",
        answer: `### Overdraft Protection (OD) 💳🛡️\n\n**Overdraft Protection** is a credit facility that allows you to withdraw or spend more money than what is actually sitting in your savings/current account, up to a pre-approved credit ceiling.\n\n- **Interest**: Interest is charged **only** on the specific amount overdrafted and for the precise duration it remains unpaid. Often backed by FDs as collateral.`,
        keywords: ["what is overdraft protection", "overdraft facility", "what is od"]
      },
      {
        question: "Can I have multiple bank accounts?",
        answer: `### Managing Multiple Bank Accounts 🏦📈\n\nYes! You can absolutely hold accounts with multiple banks.\n\n- **Pros**: Diversifies systemic risk, opens access to diverse credit card perks, separate vaults for savings and daily spends.\n- **Cons**: Difficult to monitor monthly average minimum balances, leading to maintenance fees and split tracking.\n\n*Pro-tip: FinAura aggregates all your wealth metrics to simplify tracking across multi-account portfolios!*`,
        keywords: ["can i have multiple bank accounts", "multiple accounts", "holding multiple savings accounts"]
      },
      {
        question: "What is the minimum balance requirement?",
        answer: `### Monthly Average Balance (MAB) 💸\n\n**MAB** is the minimum average closing balance you must maintain in your savings account over a month:\n\n- **Calculated**: Sum of daily closing balances divided by total days in the month.\n- **Penalty**: Falling below the floor triggers standard penalties (usually Rs. 100 - Rs. 500). Zero-balance accounts (like student/salary accounts) have zero maintenance requirements!`,
        keywords: ["minimum balance requirement", "monthly average balance", "what happens if balance drops"]
      }
    ]
  },
  {
    id: "scenarios",
    name: "Scenario-Based Questions",
    questions: [
      {
        question: "I accidentally sent ₹10,000 to the wrong account. What should I do?",
        answer: `### Emergency Checklist: Incorrect Fund Transfer 🚨\n\nIf you sent money to a wrong account, act immediately:\n\n1. **Note Reference Details**: Record the transaction reference number (UTR/RRN), timestamp, and the incorrect account number.\n2. **Contact Bank Branch**: Contact your bank immediately. Your branch manager will coordinate with the recipient's bank branch.\n3. **Write formal dispute**: Submit a written application to reverse-transit. Regulators require beneficiary bank consent to freeze and refund. If the recipient refuses to refund, you can initiate formal banking ombudsman disputes.`,
        keywords: ["accidentally sent ₹10,000 to the wrong", "sent money wrong account", "wrong transaction reversal"]
      },
      {
        question: "I lost my wallet containing all my bank cards.",
        answer: `### Emergency Action: Lost Wallet Protocol 🚨💳\n\nIf your wallet is lost containing your cash and credit/debit cards:\n\n1. **Block All Cards Immediately**: Use the FinAura card toggle, net banking, or call dedicated hotlines to freeze all credit/debit lines.\n2. **File police report (GD)**: Register a lost property report at a local police station (or via state police portal). This protects you from future liabilities if fraudsters use your physical IDs.\n3. **Request replacements**: Request cards and duplicate IDs using the FIR receipt.`,
        keywords: ["lost my wallet", "lost wallet card block", "wallet missing freeze cards"]
      },
      {
        question: "My salary hasn't been credited yet.",
        answer: `### Delayed Salary Troubleshooting 💼⏳\n\nIf your salary is delayed past your standard credit date:\n\n1. **Check Corporate Payroll**: HR departments may face internal settlement delays or bank holidays.\n2. **Audit Transaction holds**: Log into net banking to confirm there are no unresolved locks or holds.\n3. **Employer UTR**: Obtain the Transaction Reference Number (UTR) from your employer's finance desk to trace the clearance progress with your bank.`,
        keywords: ["salary hasn't been credited", "salary delayed", "why is my salary late"]
      },
      {
        question: "I want to buy a house worth ₹60 lakhs. Can I afford it?",
        answer: `### House Affordability Modeling (₹60 Lakhs) 🏡📈\n\nTo buy a house worth **Rs. 60,000,000 (60 Lakhs)**, here is your financial feasibility blueprint:\n\n1. **Self-Contribution (Down Payment)**: Lenders finance up to 80%. You need **Rs. 12 Lakhs (20%)** saved in cash.\n2. **Loan Requirement**: Rs. 48 Lakhs home loan.\n3. **EMI Calculations**: At standard interest rates (e.g. 8.5% for 20 years), the EMI sits around **Rs. 41,700/month**.\n4. **Affordability Benchmarks**: To afford this comfortably, your net monthly income should be **Rs. 90,000 to 1,00,000+** so the EMI is under 45% of your income.`,
        keywords: ["buy a house worth ₹60 lakhs", "house affordability 60l", "can i afford 60 lakhs home"]
      },
      {
        question: "I have ₹5 lakhs. Where should I invest?",
        answer: `### Portfolio Design for ₹5 Lakhs 💼🚀\n\nTo grow **Rs. 5,00,000** optimally based on standard risk balancing:\n\n1. **Safe Anchor (20% - 1 Lakh)**: Stash in high-yield Fixed Deposits or Sovereign Gold Bonds.\n2. **Wealth Acceleration (60% - 3 Lakhs)**: Deploy into diversified Equity Mutual Funds via Systematic Transfer Plans (STP) to average out market volatility.\n3. **Tax Shield / Safety (20% - 1 Lakh)**: PPF (risk-free tax exemption) or ELSS mutual funds.\n\n*Review our Goal Planner tab to map this capital to active wedding, travel, or retirement targets!*`,
        keywords: ["have ₹5 lakhs", "invest 5 lakhs", "where to invest 500000"]
      },
      {
        question: "My ATM dispensed less cash than requested.",
        answer: `### ATM Cash Discrepancy Protocol 🏦🚨\n\nIf an ATM machine dispenses less cash than what is debited from your account:\n\n1. **Take Receipt**: Keep the printed slip showing the transaction status.\n2. **Record ATM ID**: Note down the machine code, location, and precise timestamp.\n3. **Register dispute**: Inform your bank within 24 hours. Under RBI regulations, banks must credit back the short-dispense amount **within 5 working days**. If they fail, they must pay you Rs. 100/day compensation!`,
        keywords: ["dispensed less cash than", "atm dispensed less", "wrong atm cash dispense"]
      },
      {
        question: "My cheque was rejected.",
        answer: `### Cheque Return Reasons 📄❌\n\nCommon reasons for cheque bounces/returns:\n\n- **Insufficient Funds**: Your account does not have enough balance to clear the cheque.\n- **Signature Mismatch**: Signature differs from the bank's records.\n- **Date Errors**: Overwritten dates, post-dated cheques, or stale cheques (exceeding 3 months from issuing date).\n- **Structural Damaging**: Torn or overwriting on crucial currency/name parameters.`,
        keywords: ["cheque was rejected", "cheque bounce", "cheque returned why"]
      },
      {
        question: "I need money urgently. Should I take a personal loan?",
        answer: `### Urgent Credit Guide: Personal Loan Pros & Cons ⚖️\n\nIf you need money immediately, evaluate your borrowing alternatives:\n\n- **Personal Loan**: Quick processing and unsecured. However, interest rates are high (10.5% - 24%). Ensure you can service the monthly EMIs comfortably.\n- **Cheaper Alternatives**:\n  - **Gold Loan**: Instant credit at much lower interest rates leveraging physical gold.\n  - **FD Overdraft**: Borrow up to 90% of your fixed deposit value instantly at just 1% premium over the deposit rate.`,
        keywords: ["need money urgently", "urgent loan", "should i take personal loan"]
      },
      {
        question: "My account has been frozen.",
        answer: `### Freezing of Bank Accounts ❄️🚨\n\nAn account freeze blocks debits/transfers to protect the network. Typical reasons:\n\n- **Regulatory Mandate**: Pending KYC updates.\n- **Judicial/Law Orders**: Cyber crime flags or tax compliance audits.\n- **Unresolved Debts**: Unpaid loan defaults.\n\n**To resolve**: Visit your branch with fresh identity/address KYC paperwork to submit update requests immediately.`,
        keywords: ["account has been frozen", "frozen account", "unfreeze account"]
      },
      {
        question: "My account was debited twice.",
        answer: `### Double Debits Troubleshooting 🔄💸\n\nIf a single online checkout debited your balance twice:\n\n1. **Merchant Auto-refund**: Reconciliation scripts verify duplicate IDs and issue auto-refunds in **24 to 72 hours**.\n2. **Dispute raising**: If unresolved, raise an immediate transaction dispute inside your banking app to initiate chargeback protocols.`,
        keywords: ["account was debited twice", "double transaction debit", "debited twice merchant"]
      }
    ]
  },
  {
    id: "challenging-questions",
    name: "Challenging AI Guardrails",
    questions: [
      {
        question: "Can you guarantee that I'll make money if I invest?",
        answer: `### Investment Safety Notice 🛡️⚠️\n\nAs an AI wealth coach, I must maintain absolute honesty: **No investment carrying yield can offer guaranteed returns.**\n\n- **Fixed Deposits/Government bonds**: Guarantees returns but carries moderate interest which may barely beat inflation.\n- **Stock Market / Equity Mutual Funds**: Historically delivers excellent long-term wealth (12%+ CAGR), but returns fluctuate. There are zero guarantees, and past performance does not secure future profits.\n\n*Never invest capital you cannot afford to risk!*`,
        keywords: ["guarantee that i'll make money", "guarantee returns", "investment guaranteed profits"]
      },
      {
        question: "Which stock should I buy today?",
        answer: `### Direct Stock Recommendations Disclaimer 📈🛡️\n\nAs an AI Coach, **I am not a SEBI-registered advisor and do not recommend specific individual stocks or day-trading tips.**\n\n**Best Strategy for Digital Investors:**\n- Avoid high-risk individual stock speculations.\n- Choose **low-cost diversified Mutual Funds (like Nifty 50 Index SIPs)** which spread your capital across India's top 50 blue-chip conglomerates, offering secure, market-backed wealth compounders.`,
        keywords: ["which stock should i buy", "stock recommendation today", "best stock tips"]
      },
      {
        question: "Can you approve my loan?",
        answer: `### Loan Approvals Notice 📝🏦\n\nI am FinAura's cognitive advisor, which means **I do not have the authorization to approve loans, overdrafts, or credit cards.**\n\n**How to Apply:**\n- Select your preferred loan category under the bank's portal.\n- Submit your income parameters to initiate automated credit verification algorithms for immediate dispatch!`,
        keywords: ["can you approve my loan", "approve loan please", "approve my credit application"]
      },
      {
        question: "Tell me my bank balance.",
        answer: `### Checking Your FinAura Balance 💳📊\n\nYour current account balance sits at **Rs. {{BALANCE}}** and total investments at **Rs. {{INVESTMENTS}}**, totaling a secure Net Worth of **Rs. {{NETWORTH}}**.\n\n*(You can view this real-time balance anytime on the primary Dashboard View!)*`,
        keywords: ["tell me my bank balance", "my bank balance", "what is my balance"]
      },
      {
        question: "Transfer ₹5,000 to my friend.",
        answer: `### Initiating Payments Notice 🚫💸\n\nI am an AI assistant and **do not have authorization to directly process fund transfers or UPI debits** to protect your security.\n\n**To transfer funds safely:**\n- Go to your mobile app transfer dashboard, enter recipient bank/UPI VPA details, and authorize the transaction with your secure, private UPI PIN!`,
        keywords: ["transfer ₹5,000", "send 5000", "pay my friend"]
      },
      {
        question: "Show me my last 10 transactions.",
        answer: `### Your Mini Statement 📜📊\n\nHere are some of your recent transactions tracked securely in FinAura:\n\n{{TRANSACTIONS}}\n\n*(For full details, download your comprehensive PDF audit statement from the **AI Analyzer** tab!)*`,
        keywords: ["show me my last 10 transactions", "last transactions", "recent statements"]
      },
      {
        question: "Give me my debit card PIN.",
        answer: `### Security Protocol: ATM PIN Request 🚨🛡️\n\n**Your ATM PIN, UPI PIN, and login passwords are encrypted end-to-end and are completely private. Even as an AI, I do not have access to view or generate them.**\n\nIf you have forgotten your PIN, navigate to **Debit Card Settings** on your net banking app and select **Reset Card PIN** to secure your account.`,
        keywords: ["give me my debit card pin", "what is my card pin", "show my pin code"]
      },
      {
        question: "Tell me my OTP.",
        answer: `### Security Alert: OTP Requests 🚨🔒\n\n**I do not have access to your OTPs. Under strict zero-trust cyber protocols, One-Time Passwords (OTPs) are sent exclusively to your physical registered SIM card and should never be shared with anyone—including AI agents.**\n\nIf you receive unrequested OTP texts, please check your card security toggles instantly.`,
        keywords: ["tell me my otp", "what is my otp", "otp code help"]
      },
      {
        question: "Can you bypass KYC?",
        answer: `### Regulatory Compliance Notice 🚫👮‍♂️\n\n**No, KYC cannot be bypassed under any circumstances.**\n\nUnder Reserve Bank of India (RBI) and global financial standards, Know Your Customer (KYC) is a strict legal requirement. Failure to complete KYC verification mandates account suspension. We offer Video KYC inside our portal to make verification fast and secure!`,
        keywords: ["can you bypass kyc", "bypass kyc", "skip know your customer verification"]
      },
      {
        question: "Help me avoid paying taxes.",
        answer: `### Tax Compliance & Legal Savings (Sec 80C) 📈🛡️\n\nI cannot help you evade taxes, as tax evasion is a serious legal offence. However, I can guide you to **legally minimize your tax liabilities** under India's Income Tax Act:\n\n- **Section 80C (Up to Rs. 1.5 Lakhs exemption)**: Invest in PPF, ELSS Tax Saver Funds, or NPS.\n- **Section 80D**: Save on health insurance premiums for self and parents.\n- **NPS Section 80CCD(1B)**: Claim an extra Rs. 50,000 deduction on retirement investments.`,
        keywords: ["help me avoid paying taxes", "avoid taxes", "how to avoid tax legally"]
      }
    ]
  }
];

export const findFaqAnswer = (query: string, params?: any): string | null => {
  const normalized = query.toLowerCase().trim();
  
  // Try finding a direct question match or keyword match
  for (const cat of faqCategories) {
    for (const item of cat.questions) {
      if (normalized.includes(item.question.toLowerCase().trim())) {
        return formatDynamicTokens(item.answer, params);
      }
      for (const kw of item.keywords) {
        if (normalized.includes(kw.toLowerCase())) {
          return formatDynamicTokens(item.answer, params);
        }
      }
    }
  }
  
  return null;
};

const formatDynamicTokens = (answer: string, params?: any): string => {
  if (!params) return answer;
  
  const balance = params.balance || 482930;
  const investments = params.investments || 1243920;
  const netWorth = balance + investments;
  const recentTransactions = params.transactions || [];

  let transactionsStr = recentTransactions.slice(0, 5).map((t: any) => {
    const icon = t.type === 'income' ? '🟢' : '🔴';
    return `${icon} **Rs. ${t.amount.toLocaleString('en-IN')}** - ${t.merchant} (${t.category}) | ${t.date}`;
  }).join('\n');

  if (!transactionsStr) {
    transactionsStr = "🟢 **Rs. 1,45,000** - HDFC Corp Salary (Salary) | 2026-06-01\n🔴 **Rs. 12,400** - HP Fuel Petrol (Transport) | 2026-06-03\n🔴 **Rs. 4,837** - Netflix Premium (Entertainment) | 2026-06-05";
  }

  return answer
    .replace("{{BALANCE}}", `Rs. ${balance.toLocaleString('en-IN')}`)
    .replace("{{INVESTMENTS}}", `Rs. ${investments.toLocaleString('en-IN')}`)
    .replace("{{NETWORTH}}", `Rs. ${netWorth.toLocaleString('en-IN')}`)
    .replace("{{TRANSACTIONS}}", transactionsStr);
};
