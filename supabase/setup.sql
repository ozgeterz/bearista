-- Bearista Sipariş Tablosu - Temiz Kurulum
-- Önce varsa eski yapıları temizle, sonra yeniden oluştur

-- Eski policy'leri sil
DROP POLICY IF EXISTS "Allow insert for all" ON orders;
DROP POLICY IF EXISTS "Allow select for authenticated" ON orders;
DROP POLICY IF EXISTS "Allow public insert" ON orders;
DROP POLICY IF EXISTS "Allow authenticated select" ON orders;

-- Eski trigger'ı sil
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

-- Eski function'ı sil
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Eski tabloyu sil (DİKKAT: Mevcut verileri siler!)
DROP TABLE IF EXISTS orders;

-- Tabloyu oluştur
CREATE TABLE orders (
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

-- Güncelleme zamanını otomatik ayarlamak için function
CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger oluştur
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) aktifleştir
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Herkesin sipariş ekleyebilmesi için policy
CREATE POLICY "Allow insert for all" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Authenticated kullanıcıların okuyabilmesi için policy
CREATE POLICY "Allow select for authenticated" ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Index'ler performans için
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_phone ON orders(phone);
