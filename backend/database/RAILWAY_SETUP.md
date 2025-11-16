# Railway MySQL Setup Guide (5 Minutes)

## Step 1: Create Railway Account

1. Go to https://railway.app/
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub

## Step 2: Create MySQL Database

1. Click "New Project"
2. Click "Add a Service" or "+ New"
3. Select "Database" → "Add MySQL"
4. Wait 30 seconds for deployment

## Step 3: Get Database Credentials

1. Click on your MySQL service card
2. Go to "Variables" tab
3. You'll see these variables:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLUSER`
   - `MYSQLDATABASE`
   - `MYSQLPASSWORD`
   - `DATABASE_URL` (this is the full connection string)

## Step 4: Connect to Database

### Option A: Use Railway's Web Console (Easiest)

1. Click on your MySQL service
2. Click "Data" tab
3. Click "Query" tab
4. Copy and paste the entire contents of `schema.sql`
5. Click "Execute"
6. Done! Your database is set up!

### Option B: Use MySQL Workbench

1. Download MySQL Workbench: https://dev.mysql.com/downloads/workbench/
2. Open MySQL Workbench
3. Click "+" to add new connection
4. Fill in:
   - **Connection Name**: ComplexionAI Railway
   - **Hostname**: (copy from MYSQLHOST)
   - **Port**: (copy from MYSQLPORT, usually 3306)
   - **Username**: (copy from MYSQLUSER)
   - **Password**: Click "Store in Keychain" and paste MYSQLPASSWORD
5. Click "Test Connection"
6. If successful, click "OK"
7. Double-click your new connection
8. Go to File → Run SQL Script
9. Select `schema.sql`
10. Click "Run"

### Option C: Use Command Line

```bash
# Use the DATABASE_URL from Railway
mysql -h your-host.railway.app -P 3306 -u root -p your-database < schema.sql
# Enter password when prompted
```

## Step 5: Update Backend Configuration

1. Copy `.env.example` to `.env` in the backend folder
2. Fill in your Railway credentials:

```env
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-password-from-railway
DB_NAME=railway
DATABASE_URL=mysql://root:password@host:port/railway
```

## Step 6: Verify Database

Run this query in Railway's Query tab to verify:

```sql
SHOW TABLES;
```

You should see:
- users
- products
- routines
- routine_steps
- product_analyses
- ai_conversations
- ai_messages
- schedules

## Important Notes

- Railway free tier includes:
  - 512 MB RAM
  - Shared CPU
  - 1 GB Disk
  - Perfect for development!

- Your database is always online
- No need to start/stop like XAMPP
- Automatic backups
- Great for team collaboration

## Troubleshooting

**Can't connect?**
- Make sure you copied the credentials exactly
- Check if Railway service is running (green status)
- Verify your internet connection

**Schema import failed?**
- Check the error message
- Make sure you selected the correct database
- Ensure you have permissions

## Next Steps

Once your database is set up:
1. Test the connection from your backend
2. Create your first user
3. Start building API endpoints!
