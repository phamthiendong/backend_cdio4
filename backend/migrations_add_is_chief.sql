-- Áp dụng cho DB hiện tại
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS is_chief TINYINT(1) DEFAULT 0;
