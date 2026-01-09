-- Quick fix SQL to activate superwin admin user
-- Run this SQL directly in your database

-- First, check current status
SELECT id, user_name, name, status, type FROM users WHERE user_name = 'superwin';

-- Update the user to be active (if status is 0)
UPDATE users 
SET 
    status = 1,
    type = 'super_admin',
    updated_at = NOW()
WHERE user_name = 'superwin';

-- Verify the update
SELECT id, user_name, name, status, type, created_at, updated_at 
FROM users 
WHERE user_name = 'superwin';

-- If user doesn't exist, insert it
INSERT INTO users (
    user_name, 
    name, 
    phone, 
    password, 
    status, 
    is_changed_password, 
    type, 
    created_at, 
    updated_at
) 
SELECT 
    'superwin',
    'SuperWin',
    '09123456789',
    '$2y$12$k1jtMmjC8LcNJJv2l/ymPee7cwsOFlUaFg90ID/AKryDKDri3OHg6',
    1,
    1,
    'super_admin',
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE user_name = 'superwin'
);

-- Final verification
SELECT 
    id,
    user_name,
    name,
    status,
    type,
    CASE 
        WHEN status = 1 THEN '✅ ACTIVE' 
        ELSE '❌ INACTIVE' 
    END as account_status,
    CASE 
        WHEN type = 'super_admin' THEN '✅ SUPER ADMIN' 
        ELSE '❌ NOT ADMIN' 
    END as admin_status
FROM users 
WHERE user_name = 'superwin';

