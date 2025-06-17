# 📁 Next.js ファイルアップローダー

🎯 **ドラッグ&ドロップ対応のモダンなファイルアップロードアプリケーション**

Next.js + TypeScript + TailwindCSS + Docker + Nginxで構築された、直感的で使いやすいファイルアップロードシステムです。

![Demo](https://img.shields.io/badge/Demo-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-14.2.30-000000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-06B6D4?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)

## ✨ 主な機能

- 🖱️ **ドラッグ&ドロップアップロード** - ファイルを直接ドロップするだけ
- 📱 **レスポンシブデザイン** - PC・タブレット・スマホ対応
- 🖼️ **画像プレビュー** - アップロード済み画像の一覧表示
- 📋 **URLコピー機能** - ワンクリックでURLをクリップボードにコピー
- 🔒 **ファイル検証** - サイズ・形式の自動チェック
- ⚡ **リアルタイム更新** - アップロード状況をリアルタイム表示
- 🎨 **ダークテーマ** - モダンで美しいUI

## 🎬 デモ

```
📁 画像をドラッグ&ドロップ
    ↓
🔄 自動アップロード
    ↓
🖼️ プレビュー表示
    ↓
📋 URLコピー可能
```

## 🛠️ 技術スタック

### フロントエンド
- **Framework**: Next.js 14.2.30 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 3.4.1
- **UI Components**: Custom React Components

### バックエンド・インフラ
- **API**: Next.js API Routes
- **File Storage**: Local filesystem
- **Web Server**: Nginx (静的ファイル配信)
- **Container**: Docker & Docker Compose

### 対応ファイル形式
- 🖼️ **画像**: JPEG, PNG, GIF, WebP
- 📏 **最大サイズ**: 10MB

## 🚀 クイックスタート

### 📋 前提条件

以下がインストールされていることを確認してください：

- [Docker](https://www.docker.com/) 20.0+
- [Docker Compose](https://docs.docker.com/compose/) 2.0+

### 🔧 セットアップ手順

1. **リポジトリをクローン**
   ```bash
   git clone <repository-url>
   cd nextjs-file-upload
   ```

2. **Docker Composeで起動**
   ```bash
   docker-compose up -d
   ```

3. **アプリケーションにアクセス**
   ```
   🌐 Frontend: http://localhost:3000
   📁 Uploaded Files: http://localhost:8080/uploads/
   ```

### 🎯 使い方

1. **ファイルアップロード**
   - ドラッグ&ドロップエリアにファイルをドロップ
   - または「ファイルを選択」ボタンをクリック

2. **アップロード済みファイルの確認**
   - 画面下部にサムネイル表示
   - 「拡大表示」で新しいタブで開く
   - 「URLコピー」でリンクをコピー

## 📁 プロジェクト構成

```
nextjs-file-upload/
├── 📁 frontend/           # Next.jsアプリケーション
│   ├── 📁 app/
│   │   ├── 📁 api/upload/ # アップロードAPI
│   │   ├── 📁 components/ # Reactコンポーネント
│   │   ├── layout.tsx     # レイアウトコンポーネント
│   │   └── page.tsx       # メインページ
│   ├── 📄 Dockerfile      # フロントエンド用Docker設定
│   ├── 📄 next.config.mjs # Next.js設定
│   └── 📄 package.json    # 依存関係
├── 📁 nginx/              # Nginx設定
│   ├── 📄 Dockerfile      # Nginx用Docker設定
│   └── 📄 nginx.conf      # Nginx設定ファイル
├── 📁 shared-uploads/     # アップロードファイル保存先
└── 📄 compose.yml         # Docker Compose設定
```

## ⚙️ 設定

### 🔧 アップロード設定

[`frontend/app/api/upload/route.ts`](frontend/app/api/upload/route.ts) で設定を変更できます：

- **最大ファイルサイズ**: `MAX_FILE_SIZE = 10MB`
- **保存パス**: `/app/uploads/images/YYYY/MM/DD/`
- **対応形式**: `image/*`

### 🌐 Nginx設定

[`nginx/nginx.conf`](nginx/nginx.conf) でWebサーバー設定を調整できます：

- **ポート**: 80
- **静的ファイル配信**: `/uploads/*`
- **CORS設定**: あり

## 🔍 開発

### 📖 開発環境での起動

```bash
# フロントエンドのみ開発モードで起動
cd frontend
npm install
npm run dev
```

### 🧪 利用可能なコマンド

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# Linting
npm run lint
```

### 🎨 カスタマイズ

1. **UIのカスタマイズ**
   - [`frontend/app/components/ImageUploader.tsx`](frontend/app/components/ImageUploader.tsx)
   - TailwindCSSクラスを編集

2. **API機能の拡張**
   - [`frontend/app/api/upload/route.ts`](frontend/app/api/upload/route.ts)
   - ファイル処理ロジックを追加

## 🐳 Docker詳細

### サービス構成

| サービス | ポート | 役割 |
|---------|-------|------|
| `nextjs-app` | 3000 | Next.jsアプリケーション |
| `nginx` | 8080 | 静的ファイル配信 |

### ボリューム

- `shared-uploads/` → 両サービス間でファイル共有

## 📝 API仕様

### POST `/api/upload`

**リクエスト**
```typescript
Content-Type: multipart/form-data
Body: FormData with file
```

**レスポンス**
```json
{
  "success": true,
  "imageUrl": "/uploads/images/2025/01/16/1736998765432_image.jpg",
  "filename": "image.jpg",
  "size": 1234567
}
```

## 🛡️ セキュリティ

- ✅ ファイル形式の検証
- ✅ ファイルサイズの制限
- ✅ ファイル名のサニタイズ
- ✅ CORS設定

## 🚨 トラブルシューティング

### よくある問題

1. **ポート競合エラー**
   ```bash
   # ポート使用状況確認
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :8080
   ```

2. **アップロードディレクトリの権限エラー**
   ```bash
   # 権限設定
   chmod 755 shared-uploads/
   ```

3. **Docker関連のエラー**
   ```bash
   # コンテナ再構築
   docker-compose down
   docker-compose up --build
   ```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

```
MIT License - 自由に使用、複製、変更、配布可能です
```

詳細は [LICENSE](LICENSE) ファイルをご確認ください。

## 🙋‍♂️ サポート

質問や問題がある場合は、Issueを作成してください。

---

⭐ このプロジェクトが役に立った場合は、スターを付けていただけると嬉しいです！
