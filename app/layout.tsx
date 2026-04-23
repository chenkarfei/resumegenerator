import type {Metadata} from 'next';
import { Inter, Outfit, Playfair_Display, JetBrains_Mono, EB_Garamond, Montserrat, Space_Grotesk, Lora, Syne, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });
const garamond = EB_Garamond({ subsets: ['latin'], variable: '--font-garamond' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', weight: ['300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'AI Resume & Cover Letter Builder',
  description: 'AI-powered resume builder with tailored themes and live preview.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} ${jetbrains.variable} ${garamond.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${lora.variable} ${syne.variable} ${cormorant.variable} font-sans bg-gray-50 text-gray-900 antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
