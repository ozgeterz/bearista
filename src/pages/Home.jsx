import { Link } from "react-router-dom";
import bear1 from "../assets/bear1.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-700">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <nav className="relative z-10 flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-700 font-bold text-xl">B</span>
            </div>
            <span className="text-white font-bold text-xl">Bearista</span>
          </div>
          <Link
            to="/product"
            className="bg-white text-green-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-green-100 transition-colors"
          >
            Ürünü İncele
          </Link>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-5 leading-tight">
            Starbucks Bearista
            <br />
            <span className="text-green-300">Koleksiyon Bardağı</span>
          </h1>
          <p className="text-base text-white/90 mb-8 px-2">
            Sevimli ayı tasarımlı, sınırlı sayıda üretilen özel koleksiyon
            bardağı ile kahve keyfinizi taçlandırın.
          </p>
          <div className="flex flex-col gap-4 w-full px-4">
            <Link
              to="/product"
              className="bg-white text-green-700 px-6 py-3 rounded-full font-bold text-base hover:bg-green-100 transition-all shadow-lg"
            >
              Hemen Satın Al
            </Link>
            <a
              href="#features"
              className="border-2 border-white text-white px-6 py-3 rounded-full font-bold text-base hover:bg-white/10 transition-all"
            >
              Detayları Gör
            </a>
          </div>
        </div>

        {/* Product image */}
        <div className="absolute bottom-0 right-0 w-2/5 h-2/3 opacity-30">
          <img
            src={bear1}
            alt="Bearista"
            className="w-full h-full object-cover rounded-tl-[100px]"
          />
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 px-5">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Neden Bearista?
          </h2>
          <p className="text-center text-gray-600 mb-10 text-sm px-2 leading-relaxed">
            Starbucks'ın en sevilen koleksiyon parçalarından biri olan Bearista
            bardağı, hem kullanışlı hem de koleksiyonluk değere sahip.
          </p>

          <div className="flex flex-col gap-5">
            <div className="bg-green-50 p-6 rounded-2xl text-center">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Sınırlı Üretim
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                Özel koleksiyon serisi, sınırlı sayıda üretilmiştir. Kaçırmayın!
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl text-center">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Özel Tasarım
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                Sevimli ayı figürü ile benzersiz ve şık bir tasarım.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl text-center">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Premium Kalite
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                Yüksek kaliteli malzeme ve işçilik ile uzun ömürlü kullanım.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-800 py-12 px-5">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            Koleksiyonunuza Ekleyin
          </h2>
          <p className="text-white/80 text-sm mb-7 px-2">
            Stok sınırlı! Hemen sipariş verin, kapınıza kadar gönderelim.
          </p>
          <Link
            to="/product"
            className="inline-block bg-white text-green-700 px-6 py-3 rounded-full font-bold text-sm shadow-lg"
          >
            Sipariş Ver - ₺1.200'den başlayan fiyatlarla
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 py-8 px-5">
        <div className="text-center text-white/60 text-xs">
          <p>© 2026 Bearista. Tüm hakları saklıdır.</p>
          <p className="mt-2">
            Bu site Starbucks ile resmi bir bağlantıya sahip değildir.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
