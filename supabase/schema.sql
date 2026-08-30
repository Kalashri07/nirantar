-- =============================================================================
-- NIRANTAR PRODUCTION SECURITY & ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE IF EXISTS moduless ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_progress ENABLE ROW LEVEL SECURITY;

-- 2. Public Read Access for Learning Modules
-- Anyone (authenticated or anon) can read learning modules, but only admins can edit.
DROP POLICY IF EXISTS "Public modules are viewable by everyone" ON moduless;
CREATE POLICY "Public modules are viewable by everyone"
ON moduless FOR SELECT
USING (true);

-- 3. Profiles Table Security
-- Users can read and update ONLY their own profile matching auth.uid()
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. User Progress Table Security
-- Users can access, insert, and update ONLY their own learning progress
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
CREATE POLICY "Users can view own progress"
ON user_progress FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can record own progress" ON user_progress;
CREATE POLICY "Users can record own progress"
ON user_progress FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
CREATE POLICY "Users can update own progress"
ON user_progress FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
