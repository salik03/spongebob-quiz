/*
  # Create quiz results table

  1. New Tables
    - `quiz_results`
      - `id` (uuid, primary key)
      - `name` (text)
      - `answers` (jsonb) - Stores all answer choices
      - `character` (text) - The resulting character
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quiz_results` table
    - Add policies for public access to insert and view results
*/

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  answers JSONB NOT NULL,
  character TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone
CREATE POLICY "Anyone can insert quiz results"
  ON quiz_results
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow reading all results
CREATE POLICY "Anyone can view quiz results"
  ON quiz_results
  FOR SELECT
  TO public
  USING (true);