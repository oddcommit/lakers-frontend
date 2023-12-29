# ベースイメージの指定
FROM node:18.16.0 AS build
 
# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# 環境変数の設定
ARG VITE_BASE_URL="http://localhost:8000"
ENV VITE_BASE_URL=${VITE_BASE_URL}

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# Nginxイメージをベースにする
FROM nginx:1.23.3  AS server

# ローカルの設定をnginxにコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# ビルドしたアプリケーションをNginxのWebサーバーに配置
COPY --from=build /app/build /usr/share/nginx/html

# ポートは3000を指定
EXPOSE 3000

# コンテナが起動した時に自動的にNginxを起動する
CMD envsubst '$$SERVER_NAME' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
