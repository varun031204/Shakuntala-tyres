const fs = require('fs');
const path = require('path');

// Create admin-specific index.html
const adminIndexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Shakuntala Tyres - Admin Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
        // Redirect to admin route
        if (window.location.pathname === '/') {
            window.location.href = '/admin';
        }
    </script>
</head>
<body>
    <div id="root"></div>
</body>
</html>
`;

// Write admin index.html
fs.writeFileSync(path.join(__dirname, 'build', 'admin-index.html'), adminIndexHtml);
console.log('✅ Admin build configuration created');