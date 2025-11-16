# Database Setup Instructions

Since XAMPP MySQL is having issues, here are alternative options:

## Option 1: Free Cloud MySQL Database (Recommended)

### Using Railway.app (Free Tier)

1. **Sign up for Railway:**
   - Go to: https://railway.app/
   - Sign up with GitHub (free)

2. **Create a new MySQL database:**
   - Click "New Project"
   - Click "+ New" → "Database" → "MySQL"
   - Railway will automatically create a MySQL instance

3. **Get your credentials:**
   - Click on the MySQL service
   - Go to "Variables" tab
   - Copy these values:
     - `MYSQL_HOST`
     - `MYSQL_PORT`
     - `MYSQL_USER`
     - `MYSQL_PASSWORD`
     - `MYSQL_DATABASE`

4. **Connect and import schema:**
   - Download MySQL Workbench: https://dev.mysql.com/downloads/workbench/
   - Create new connection with your Railway credentials
   - Open `schema.sql` and execute it

### Using PlanetScale (Free Tier)

1. Go to: https://planetscale.com/
2. Sign up (free tier available)
3. Create new database
4. Get connection string
5. Use their web console to run the schema.sql

---

## Option 2: Fix XAMPP MySQL (Manual Steps)

If you want to persist with XAMPP:

### Step 1: Backup MySQL Data
```cmd
cd C:\xampp\mysql
mkdir backup_old
xcopy data\*.* backup_old\ /s /e
```

### Step 2: Delete Corrupt Files
```cmd
cd C:\xampp\mysql\data
del ibdata1
del ib_logfile0
del ib_logfile1
del aria_log_control
del aria_log.00000001
```

### Step 3: Copy Fresh Data
```cmd
cd C:\xampp\mysql
xcopy backup\*.* data\ /s /e /y
```

### Step 4: Start MySQL
- Open XAMPP Control Panel
- Click "Start" next to MySQL
- If it works, proceed to import schema.sql via phpMyAdmin

---

## Option 3: Use SQLite (Local Development)

For quick development without MySQL:

1. The backend can use SQLite instead (no server needed)
2. Just a local file-based database
3. Easy to switch to MySQL later

Would you like me to configure this?

---

## Importing the Schema

Once you have a working MySQL connection:

### Via phpMyAdmin (XAMPP):
1. Go to: http://localhost/phpmyadmin
2. Click "Import"
3. Choose file: `backend/database/schema.sql`
4. Click "Go"

### Via MySQL Workbench:
1. Connect to your database
2. File → Run SQL Script
3. Select `schema.sql`
4. Execute

### Via Command Line:
```bash
mysql -u root -p < backend/database/schema.sql
```

---

## Next Steps

After database is set up:
1. Update backend `.env` file with database credentials
2. Test connection
3. Run migrations if needed
4. Start developing!
