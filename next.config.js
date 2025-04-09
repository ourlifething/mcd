// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的エクスポートを有効にする
  images: {
    unoptimized: true, // 画像最適化を無効にする（GitHub Pages で必要な場合）
  },
}

module.exports = nextConfig
