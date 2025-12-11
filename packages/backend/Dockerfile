FROM node:24-alpine
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 5000
CMD ["node","dist/index.js"]
