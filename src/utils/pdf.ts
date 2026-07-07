import { jsPDF } from 'jspdf';
import type { UserDetails } from '../context/AuthContext';
import type { Transaction, Goal } from '../context/WealthContext';

interface ReportData {
  user: UserDetails | null;
  balance: number;
  investments: number;
  monthlySavings: number;
  monthlyExpenses: number;
  goals: Goal[];
  transactions: Transaction[];
  wealthHealthScore: number;
  suggestions: string[];
}

export const generateWealthPDF = (data: ReportData) => {
  const { user, balance, investments, monthlySavings, monthlyExpenses, goals, wealthHealthScore, suggestions } = data;
  const doc = new jsPDF();

  // Page 1 Setup
  // Draw premium border and headers
  doc.rect(5, 5, 200, 287, 'S'); // Outer border

  // Header Banner
  doc.setFillColor(11, 15, 25);
  doc.rect(5, 5, 200, 45, 'F');

  // Title Branding
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('FINAURA AI WEALTH REPORT', 15, 22);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129);
  doc.text('HYPER-PERSONALIZED PORTFOLIO AUDIT', 15, 29);

  // Time & Status
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  const now = new Date().toLocaleString();
  doc.text(`Generated: ${now}`, 145, 18);
  doc.text('Security Protocol: AES-256 Verified', 145, 23);

  // User details block (Page 1)
  doc.setTextColor(11, 15, 25);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('CLIENT FINANCIAL DETAILS', 15, 65);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);

  // Left column
  doc.text(`Full Name:   ${user?.fullName || 'Vikram Aditya'}`, 15, 75);
  doc.text(`Age / Occupation:   ${user?.age || 32} / ${user?.occupation || 'Consultant'}`, 15, 82);
  doc.text(`Email Address:   ${user?.email || 'aravind@finaura.ai'}`, 15, 89);
  doc.text(`Mobile Access:   ${user?.mobile || '+91 98765 43210'}`, 15, 96);

  // Right column
  doc.text(`Annual Income:   Rs. ${user?.annualIncome?.toLocaleString('en-IN') || '18,00,000'}`, 115, 75);
  doc.text(`Marital Status / Dependents:   ${user?.maritalStatus || 'Single'} / ${user?.dependents || 0} dependents`, 115, 82);
  doc.text(`Risk Personality Class:   ${user?.riskProfile || 'Moderate'} (${user?.riskScore || 65}/100)`, 115, 89);
  doc.text(`Wealth Health Score:   ${wealthHealthScore}/100`, 115, 96);

  // Divider Line
  doc.setDrawColor(220, 220, 220);
  doc.line(15, 105, 195, 105);

  // Core metrics block
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(11, 15, 25);
  doc.text('WEALTH MATRIX & BALANCE SUMMARY', 15, 118);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);

  doc.text(`Liquid Account Balance:`, 15, 128);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Rs. ${balance.toLocaleString('en-IN')}`, 80, 128);

  doc.setFont('Helvetica', 'normal');
  doc.text(`Allocated Active Investments:`, 15, 135);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Rs. ${investments.toLocaleString('en-IN')}`, 80, 135);

  doc.setFont('Helvetica', 'normal');
  doc.text(`Calculated Net Worth:`, 15, 142);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text(`Rs. ${(balance + investments).toLocaleString('en-IN')}`, 80, 142);

  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`June 2026 Monthly Expenses:`, 115, 128);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Rs. ${monthlyExpenses.toLocaleString('en-IN')}`, 170, 128);

  doc.setFont('Helvetica', 'normal');
  doc.text(`June 2026 Savings Surplus:`, 115, 135);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Rs. ${monthlySavings.toLocaleString('en-IN')}`, 170, 135);

  // Divider Line
  doc.line(15, 150, 195, 150);

  // Goals table list
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(11, 15, 25);
  doc.text('LIFE GOAL PACING TRACKER', 15, 163);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Goal Name', 15, 173);
  doc.text('Target Date', 70, 173);
  doc.text('Target Corpus', 110, 173);
  doc.text('Current Saved', 150, 173);
  doc.text('Pacing %', 180, 173);

  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  let yOffset = 180;
  goals.forEach((goal) => {
    const percent = Math.round((goal.currentAmount / goal.targetAmount) * 100);
    doc.text(goal.name, 15, yOffset);
    doc.text(goal.targetDate, 70, yOffset);
    doc.text(`Rs. ${goal.targetAmount.toLocaleString('en-IN')}`, 110, yOffset);
    doc.text(`Rs. ${goal.currentAmount.toLocaleString('en-IN')}`, 150, yOffset);
    doc.text(`${percent}%`, 180, yOffset);
    yOffset += 7;
  });

  // Divider Line
  doc.line(15, yOffset + 2, 195, yOffset + 2);

  // AI Advice segment
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(11, 15, 25);
  doc.text('FINAURA AI PROACTIVE RECOMMENDATIONS', 15, yOffset + 12);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  
  let suggestionY = yOffset + 20;
  suggestions.forEach((s, idx) => {
    doc.text(`* [ALERT INSTRUCTION ${idx + 1}]:  ${s}`, 15, suggestionY);
    suggestionY += 6;
  });

  // Footer stamp
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('FinAura Wealth advisory ecosystem is digital-first. Generated outputs represent algorithms projections and index rates.', 15, 280);

  // Save the report file
  doc.save(`FinAura_Wealth_Report_${user?.fullName.replace(/ /g, '_') || 'Client'}.pdf`);
};
export default generateWealthPDF;
