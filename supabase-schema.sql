-- PrepWise AI - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the table

-- Create study_plans table
CREATE TABLE IF NOT EXISTS study_plans (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  subject TEXT NOT NULL,
  topics TEXT NOT NULL,
  exam_date TEXT NOT NULL,
  plan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional for public app)
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

-- Allow public access (since no auth is required for this app)
CREATE POLICY "Allow public read" ON study_plans FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON study_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON study_plans FOR DELETE USING (true);