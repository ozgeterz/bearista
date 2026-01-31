-- Bearista Sipariş Tablosu
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(20) NOT NULL DEFAULT 'cash',
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Güncelleme zamanını otomatik ayarlamak için trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) aktifleştir
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Herkesin sipariş ekleyebilmesi için policy (anon kullanıcılar dahil)
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Sadece authenticated kullanıcıların okuyabilmesi için policy (admin panel için)
CREATE POLICY "Allow authenticated select" ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Index'ler performans için
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
