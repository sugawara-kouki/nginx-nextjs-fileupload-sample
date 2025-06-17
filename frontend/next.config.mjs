/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像配信の設定
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        // nginx経由で画像配信
        destination: 'http://nginx/uploads/:path*'
      }
    ]
  },
  // ファイルアップロードサイズ制限
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // 10MBまでのファイルアップロードを許可
    }
  }
};

export default nextConfig;
