FROM node:18-alpine

WORKDIR /app

# package.json をコピーして依存関係インストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# 古いPrisma Clientを削除してから再生成
RUN rm -rf generated/prisma
RUN npx prisma generate

EXPOSE 3002

# 開発サーバー起動
CMD ["npm", "run", "dev"]