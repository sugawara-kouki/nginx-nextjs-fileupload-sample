FROM node:22-alpine

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY . .

# アップロードディレクトリを作成
RUN mkdir -p uploads/images

EXPOSE 3000

CMD [ "npm", "run", "dev" ]