import { Member, JourneyStats } from './types';

async function toDataUrl(publicPath: string): Promise<string> {
  const res = await fetch(publicPath);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Generates a simple branded PDF summary of a member's passport.
 * For a pixel-perfect export of the on-screen passport, swap this for
 * html2canvas(passportRef.current).then(canvas => ...) and drop the
 * resulting image into the jsPDF page instead of drawn text.
 */
export async function downloadPassportPdf(member: Member, stats: JourneyStats) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: [400, 620] });

  const navy = '#041E42';
  const gold = '#C9A961';
  const ivory = '#F7F3E9';

  doc.setFillColor(navy);
  doc.rect(0, 0, 400, 620, 'F');

  doc.setDrawColor(gold);
  doc.setLineWidth(1);
  doc.rect(20, 20, 360, 580);

  // Official YPO Bolivia mark, embedded from /public/brand
  try {
    const logoDataUrl = await toDataUrl('/brand/ypo-horizontal-white.png');
    const logoWidth = 160;
    const logoHeight = logoWidth * (400 / 1374);
    doc.addImage(logoDataUrl, 'PNG', (400 - logoWidth) / 2, 46, logoWidth, logoHeight);
  } catch {
    // Falls back gracefully if the asset can't be fetched (e.g. offline export)
  }

  doc.setTextColor(ivory);
  doc.setFont('times', 'italic');
  doc.setFontSize(30);
  doc.text('Infinite Passport', 200, 180, { align: 'center' });

  doc.setFontSize(16);
  doc.text(member.fullName, 200, 230, { align: 'center' });

  doc.setTextColor(gold);
  doc.setFontSize(10);
  doc.text(`MEMBER SINCE ${new Date(member.memberSince).getFullYear()}`, 200, 250, { align: 'center' });

  doc.setTextColor(ivory);
  doc.setFontSize(42);
  doc.text(`${stats.completionPct}%`, 200, 360, { align: 'center' });
  doc.setTextColor(gold);
  doc.setFontSize(10);
  doc.text('JOURNEY COMPLETE', 200, 380, { align: 'center' });

  doc.setTextColor(ivory);
  doc.setFontSize(12);
  doc.text(`${stats.totalExperiences} experiences collected`, 200, 420, { align: 'center' });

  doc.save(`infinite-passport-${member.fullName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
}
