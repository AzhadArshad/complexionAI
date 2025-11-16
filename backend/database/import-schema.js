const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFile = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// Create connection
const connection = mysql.createConnection({
  host: 'metro.proxy.rlwy.net',
  port: 10312,
  user: 'root',
  password: 'nZwcvxymZyCbAFQzcTmeMPTtFGSCvrzJ',
  database: 'railway',
  multipleStatements: true
});

console.log('Connecting to Railway MySQL...');

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }

  console.log('Connected! Importing schema...');

  connection.query(sqlFile, (err, results) => {
    if (err) {
      console.error('Error importing schema:', err);
      connection.end();
      process.exit(1);
    }

    console.log('\n✅ Success! Database schema imported successfully.');
    console.log('\nTables created:');

    connection.query('SHOW TABLES', (err, tables) => {
      if (!err) {
        tables.forEach(table => {
          console.log('  -', Object.values(table)[0]);
        });
      }

      connection.end();
      console.log('\nDatabase is ready to use!');
    });
  });
});
