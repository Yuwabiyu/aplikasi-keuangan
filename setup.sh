#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Aplikasi Keuangan - Setup Script ===${NC}\n"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm tidak ditemukan. Silakan install Node.js terlebih dahulu.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm ditemukan${NC}"

# Install dependencies
echo -e "\n${YELLOW}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Gagal menginstall dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Dependencies berhasil diinstall${NC}"

# Check if MySQL is installed
echo -e "\n${YELLOW}🗄️  Checking MySQL...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠️  mysql CLI tidak ditemukan${NC}"
    echo -e "Silakan setup database secara manual:"
    echo -e "1. Buka MySQL client Anda"
    echo -e "2. Copy-paste isi file setup.sql"
    echo -e "3. Jalankan query tersebut"
else
    echo -e "${GREEN}✓ MySQL CLI ditemukan${NC}"
    echo -e "\nSetup database dengan menjalankan setup.sql..."
    mysql -u root -p < setup.sql
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database berhasil dibuat${NC}"
    fi
fi

echo -e "\n${GREEN}=== Setup Selesai ===${NC}"
echo -e "\n${YELLOW}Untuk menjalankan server:${NC}"
echo -e "${GREEN}npm start${NC} atau ${GREEN}node app.js${NC}"
echo -e "\nServer akan berjalan di http://localhost:3000"
