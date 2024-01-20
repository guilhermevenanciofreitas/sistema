--accounts
CREATE TABLE IF NOT EXISTS "accounts"();
ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "name" VARCHAR(80);
ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "databaseId" UUID;

--accountsUsers
CREATE TABLE IF NOT EXISTS "accountsUsers"();
ALTER TABLE "accountsUsers" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "accountsUsers" ADD COLUMN IF NOT EXISTS "accountId" UUID;
ALTER TABLE "accountsUsers" ADD COLUMN IF NOT EXISTS "userId" UUID;

--databases
CREATE TABLE IF NOT EXISTS "databases"();
ALTER TABLE "databases" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "databases" ADD COLUMN IF NOT EXISTS "host" VARCHAR(50);
ALTER TABLE "databases" ADD COLUMN IF NOT EXISTS "username" VARCHAR(30);
ALTER TABLE "databases" ADD COLUMN IF NOT EXISTS "password" VARCHAR(30);
ALTER TABLE "databases" ADD COLUMN IF NOT EXISTS "database" VARCHAR(80);

--sessions
CREATE TABLE IF NOT EXISTS "sessions"();
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "userId" UUID;
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "accountId" UUID;
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "empresaId" UUID;
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "lastAcess" TIMESTAMPTZ;

--users
CREATE TABLE IF NOT EXISTS "users"();
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email" VARCHAR(100);
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "password" VARCHAR(30);