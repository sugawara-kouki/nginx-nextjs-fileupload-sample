# 🎨 Next.js Frontend - File Upload System

> ⚛️ **フロントエンド開発者向けドキュメント**

このディレクトリには、Next.js 14 + TypeScript + TailwindCSSで構築されたファイルアップロードシステムのフロントエンド部分が含まれています。

[![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)

## 🎯 このディレクトリについて

フロントエンドアプリケーションの**単体開発・デバッグ・カスタマイズ**に必要な情報をまとめています。
システム全体の情報は[ルートREADME](../README.md)をご確認ください。

## ✨ フロントエンド機能

### 🎨 UIコンポーネント
- **📤 ImageUploader** - メインのアップロードコンポーネント
- **🖱️ ドラッグ&ドロップゾーン** - 直感的なファイル操作
- **🖼️ 画像プレビューカード** - レスポンシブなグリッドレイアウト
- **📋 URLコピーボタン** - クリップボード連携

### ⚡ ユーザーエクスペリエンス
- **リアルタイムアップロード** - 進捗状況の即座表示
- **エラーハンドリング** - 分かりやすいエラーメッセージ
- **レスポンシブデザイン** - モバイルファーストアプローチ
- **ダークテーマ** - TailwindCSS Dark Mode対応

## 🏗️ フロントエンド構成

### 📁 ディレクトリ構造

```
frontend/
├── 📂 app/                        # Next.js App Router
│   ├── 📂 api/upload/             # サーバーサイドAPI
│   │   └── route.ts               # ファイルアップロードエンドポイント
│   ├── 📂 components/             # Reactコンポーネント
│   │   └── ImageUploader.tsx      # メインアップローダー
│   ├── 📂 types/                  # TypeScript型定義
│   │   └── index.ts               # 共通インターフェース
│   ├── layout.tsx                 # ルートレイアウト
│   ├── page.tsx                   # ホームページ
│   └── globals.css                # TailwindCSS + グローバルスタイル
├── 📂 public/                     # 静的ファイル
├── 📄 next.config.mjs             # Next.js設定
├── 📄 tailwind.config.ts          # TailwindCSS設定
├── 📄 tsconfig.json               # TypeScript設定
├── 📄 package.json                # 依存関係とスクリプト
├── 📄 Dockerfile                  # コンテナ設定
└── 📄 README.md                   # このファイル
```

### 🔧 技術スタック詳細

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Next.js** | 14.2.30 | React フレームワーク（App Router） |
| **TypeScript** | 5.0 | 型安全性・開発体験向上 |
| **TailwindCSS** | 3.4.1 | ユーティリティファーストCSS |
| **React** | 18.0 | UIライブラリ |

## 🚀 開発環境セットアップ

### 📋 前提条件

- **Node.js** 18.0 以上
- **npm** または **yarn**

### ⚡ クイックスタート

```bash
# 1. ディレクトリ移動
cd frontend

# 2. 依存関係インストール
npm install

# 3. 開発サーバー起動
npm run dev

# 4. ブラウザでアクセス
open http://localhost:3000
```

### 🧪 利用可能なスクリプト

```bash
# 🛠️ 開発
npm run dev              # 開発サーバー起動（ホットリロード）
npm run build            # 本番ビルド
npm run start            # 本番サーバー起動
npm run lint             # ESLint実行
npm run lint:fix         # ESLint自動修正

# 📦 依存関係
npm install              # パッケージインストール
npm update               # パッケージ更新
npm audit                # セキュリティチェック
```

## 🎨 UIコンポーネント詳細

### 📤 ImageUploader コンポーネント

**場所**: [`app/components/ImageUploader.tsx`](app/components/ImageUploader.tsx)

```tsx
interface ImageUploaderProps {
  // 将来的な拡張用
}

export const ImageUploader: React.FC<ImageUploaderProps>
```

**主要機能**:
- ドラッグ&ドロップ処理
- ファイル選択ダイアログ
- アップロード進捗表示
- エラーハンドリング
- レスポンシブデザイン

**カスタマイズポイント**:
```tsx
// カラーテーマ変更
const uploadZoneStyle = "border-gray-600 hover:border-gray-500 bg-gray-800/50"
// ↓
const uploadZoneStyle = "border-blue-600 hover:border-blue-500 bg-blue-800/50"

// アニメーション調整
const transitionStyle = "transition-all duration-300"
// ↓
const transitionStyle = "transition-all duration-500 ease-in-out"
```

### 🎯 レスポンシブデザイン

```tsx
// モバイル対応クラス例
<div className="
  grid 
  grid-cols-1          // モバイル: 1列
  md:grid-cols-2       // タブレット: 2列  
  lg:grid-cols-3       // デスクトップ: 3列
  gap-6
">
```

## 🔌 API クライアント

### 📡 アップロードAPI呼び出し

**場所**: [`app/components/ImageUploader.tsx`](app/components/ImageUploader.tsx) 内

```typescript
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const result: UploadResponse = await response.json();
  // ...
};
```

### 🔍 型定義

**場所**: [`app/types/index.ts`](app/types/index.ts)

```typescript
export interface UploadResponse {
  success: boolean;
  imageUrl: string;
  filename: string;
  size: number;
  error?: string;
}

export interface ImageInfo {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}
```

## 🎨 スタイリング・テーマ

### 🌈 TailwindCSS カスタマイズ

**設定ファイル**: [`tailwind.config.ts`](tailwind.config.ts)

```typescript
// カラーパレット拡張例
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### 🎭 ダークモード対応

```tsx
// ダークモード専用スタイル
<div className="
  bg-gray-100 dark:bg-gray-800
  text-gray-900 dark:text-gray-100
  border-gray-300 dark:border-gray-600
">
```

### 📱 レスポンシブブレークポイント

| ブレークポイント | 画面サイズ | 用途 |
|----------------|----------|------|
| `sm:` | 640px以上 | 小型タブレット |
| `md:` | 768px以上 | タブレット |
| `lg:` | 1024px以上 | デスクトップ |
| `xl:` | 1280px以上 | 大型デスクトップ |

## 🧪 デバッグ・テスト

### 🔍 ブラウザ開発者ツール

```bash
# Next.js デベロッパーモード
npm run dev

# ソースマップ有効化（デフォルト）
# → ブラウザでTypeScriptコードを直接デバッグ可能
```

### 📝 ログ出力

開発時のデバッグ用：

```typescript
// 開発環境でのみコンソール出力
if (process.env.NODE_ENV === 'development') {
  console.log('Upload progress:', progress);
}
```

### 🚨 エラーハンドリング

```typescript
// エラー境界の実装例
const [error, setError] = useState<string | null>(null);

try {
  // アップロード処理
} catch (err) {
  setError('アップロードに失敗しました');
  console.error('Upload error:', err);
}
```

## ⚙️ 設定・カスタマイズ

### 🔧 Next.js 設定

**場所**: [`next.config.mjs`](next.config.mjs)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像配信の設定
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://nginx/uploads/:path*'
      }
    ]
  },
  
  // ファイルアップロードサイズ制限
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  }
};
```

### 📏 ファイルサイズ・形式制限

**場所**: [`app/api/upload/route.ts`](app/api/upload/route.ts)

```typescript
// カスタマイズ可能な設定
const maxSize = 10 * 1024 * 1024; // 10MB
const allowedTypes = [
  'image/jpeg',
  'image/png', 
  'image/gif',
  'image/webp'
];
```

### 🎨 UIカスタマイズ例

```tsx
// グラデーション変更
const buttonGradient = "bg-gradient-to-r from-blue-500 to-purple-600"
// ↓ 緑系に変更
const buttonGradient = "bg-gradient-to-r from-green-500 to-teal-600"

// アップロードゾーンのスタイル変更
const uploadZoneStyle = `
  border-2 border-dashed rounded-xl p-8 text-center
  transition-all duration-300
  ${dragOver 
    ? 'border-blue-400 bg-blue-900/20' 
    : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
  }
`
```

## 🔗 システム連携

### 🌐 Nginx連携

フロントエンドから静的ファイルにアクセスする際のURL生成：

```typescript
const getImageUrl = (originalUrl: string): string => {
  if (originalUrl.startsWith('/')) {
    return `http://localhost:8080${originalUrl}`;
  }
  return originalUrl;
};
```

### 🐳 Docker連携

開発時のDockerとの連携：

```bash
# フロントエンドのみ開発モード
npm run dev

# 別ターミナルでNginx起動（静的ファイル配信用）
docker-compose up nginx
```

## 🚨 よくある問題と解決法

### 🔴 ポート3000が使用中

```bash
# ポート確認
lsof -ti:3000

# プロセス終了
kill -9 $(lsof -ti:3000)

# または別ポートで起動
PORT=3001 npm run dev
```

### 🔴 TailwindCSSが適用されない

```bash
# TailwindCSSキャッシュクリア
rm -rf .next
npm run build

# 設定ファイル確認
cat tailwind.config.ts
```

### 🔴 TypeScriptエラー

```bash
# 型チェック実行
npx tsc --noEmit

# 型定義更新
npm install @types/node @types/react @types/react-dom --save-dev
```

### 🔴 画像が表示されない（CORS）

```typescript
// Next.js設定でCORS対応
// next.config.mjs
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ]
}
```

## 📈 パフォーマンス最適化

### ⚡ 画像最適化

```tsx
// Next.js Image コンポーネント使用
import Image from 'next/image'

<Image
  src={imageUrl}
  alt={filename}
  width={300}
  height={200}
  loading="lazy"
  placeholder="blur"
/>
```

### 🔄 状態管理最適化

```tsx
// useCallback でパフォーマンス最適化
const handleFileUpload = useCallback(async (file: File) => {
  // アップロード処理
}, []);

// useMemo で重い計算をキャッシュ
const processedImages = useMemo(() => {
  return images.map(img => ({
    ...img,
    thumbnail: generateThumbnail(img.url)
  }));
}, [images]);
```

## 🔮 今後の拡張予定

### 🆕 計画中の機能

- [ ] **複数ファイル同時アップロード**
- [ ] **アップロード進捗バー詳細化**
- [ ] **画像リサイズ・圧縮**
- [ ] **ファイル管理（削除・編集）**
- [ ] **ダークモード切り替えボタン**
- [ ] **国際化（i18n）対応**

### 🛠️ 技術的改善

- [ ] **React Query導入** - サーバー状態管理
- [ ] **Storybook導入** - コンポーネント開発
- [ ] **Vitest導入** - 単体テスト
- [ ] **E2Eテスト** - Playwright導入

## 📚 参考資料

### 🔗 公式ドキュメント

- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [React Hooks Reference](https://react.dev/reference/react)

### 🎓 学習リソース

- [Next.js Learn Course](https://nextjs.org/learn)
- [TailwindCSS Components](https://tailwindui.com/)
- [React Patterns](https://reactpatterns.com/)

---

## 🤝 フロントエンド開発への貢献

このフロントエンドの改善・機能追加への貢献を歓迎します！

### 📝 開発フロー

1. **イシュー確認** - 既存の課題をチェック
2. **ブランチ作成** - `git checkout -b feature/ui-improvement`
3. **開発** - コンポーネント作成・修正
4. **テスト** - ブラウザでの動作確認
5. **PR作成** - 詳細な変更内容を記載

### 🎨 UIコントリビューション

- **デザインシステム** - 一貫性を保った色・フォント・間隔
- **アクセシビリティ** - ARIA属性・キーボード操作対応
- **レスポンシブ** - モバイルファーストアプローチ

---

<div align="center">

**🎨 Beautiful UI + ⚡ Great UX = 🚀 Amazing Product**

Made with ❤️ for developers by developers

</div>
