FROM nginx:alpine

# 設定ファイルをコピー
COPY nginx.conf /etc/nginx/nginx.conf

# アップロードディレクトリを作成
RUN mkdir -p /usr/share/nginx/html/uploads

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]