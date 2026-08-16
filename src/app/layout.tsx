import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { FontPreload } from '@/components/font-preload';
import './globals.css';

export const metadata: Metadata = {
  title: '郑一鸣 | 个人作品集',
  description:
    '郑一鸣的个人求职展示页 — 项目统筹、运营管理、AI工具应用，用成果证明能力。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <FontPreload />
        {children}
        <Inspector keys={['shift', 'd']} />
      </body>
    </html>
  );
}
