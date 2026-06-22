import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 では quality の許可値を明示する必要がある（デフォルトは [75]）。
    // ヒーローの精細なレンダーは 90、その他は 75 を使用。
    qualities: [75, 90],
  },
};

export default nextConfig;
