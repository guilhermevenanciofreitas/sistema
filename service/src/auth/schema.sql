--account
CREATE TABLE IF NOT EXISTS "account"();
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "name" VARCHAR(80);
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "databaseId" UUID;

--accountUser
CREATE TABLE IF NOT EXISTS "accountUser"();
ALTER TABLE "accountUser" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "accountUser" ADD COLUMN IF NOT EXISTS "accountId" UUID;
ALTER TABLE "accountUser" ADD COLUMN IF NOT EXISTS "userId" UUID;

--database
CREATE TABLE IF NOT EXISTS "database"();
ALTER TABLE "database" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "database" ADD COLUMN IF NOT EXISTS "host" VARCHAR(50);
ALTER TABLE "database" ADD COLUMN IF NOT EXISTS "username" VARCHAR(30);
ALTER TABLE "database" ADD COLUMN IF NOT EXISTS "password" VARCHAR(30);
ALTER TABLE "database" ADD COLUMN IF NOT EXISTS "database" VARCHAR(80);

--sessions
CREATE TABLE IF NOT EXISTS "sessions"();
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "userId" UUID;
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "accountId" UUID;
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "lastAcess" TIMESTAMPTZ;

--users
CREATE TABLE IF NOT EXISTS "users"();
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email" VARCHAR(100);
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "password" VARCHAR(30);