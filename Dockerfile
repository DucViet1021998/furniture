# 1️⃣ Sử dụng image Node.js chính thức (phiên bản mới nhất)
FROM node:18-alpine

# 2️⃣ Thiết lập thư mục làm việc trong container
WORKDIR /app

# 3️⃣ Copy file package.json và package-lock.json trước để tận dụng caching
COPY package.json package-lock.json ./

# 4️⃣ Cài đặt dependencies (chỉ cài production dependencies nếu cần)
RUN npm install --frozen-lockfile

# 5️⃣ Copy toàn bộ mã nguồn vào container
COPY . .

# 6️⃣ Build ứng dụng Next.js
RUN npm run build

# 7️⃣ Lệnh mặc định khi container chạy
CMD ["npm", "start"]

# 8️⃣ Cấu hình cổng chạy ứng dụng
EXPOSE 3000
