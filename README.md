# install node & npm kalo belum
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# install pm2
npm install -g pm2

# edit env
nano .env

MONGO_URI=mongodb+srv://onit_db:7@cluster0.bubvqtb.mongodb.net/?appName=Cluster0
PORT=3000

# start
npm install
npm start
ctrl+c

# setup pm2
pm2 start index.js --name "e-jadwal-api"
pm2 save
pm2 startup

# cek status
pm2 status
pm2 logs e-jadwal-api