import { Link, useLocation } from "react-router-dom";

const Thanks = () => {
  const location = useLocation();
  const { orderData, totalPrice } = location.state || {};

  const formatPhone = (phone) => {
    if (!phone) return "";
    const match = phone.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return phone;
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 flex flex-col">
      {/* Header */}
      <header className="py-4 px-5">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-700 font-bold text-base">B</span>
            </div>
            <span className="text-white font-bold text-base">Bearista</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="bg-white rounded-2xl p-8 w-full text-center shadow-2xl">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Teşekkürler! 🎉
          </h1>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed px-2">
            Siparişiniz başarıyla alındı. En kısa sürede sizinle iletişime
            geçeceğiz.
          </p>

          {orderData && (
            <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left">
              <h3 className="font-bold text-gray-800 mb-4 text-sm">
                Sipariş Özeti
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ad Soyad:</span>
                  <span className="font-medium text-gray-800">
                    {orderData.firstName} {orderData.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Telefon:</span>
                  <span className="font-medium text-gray-800">
                    +90 {formatPhone(orderData.phone)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ödeme:</span>
                  <span className="font-medium text-gray-800">
                    {orderData.paymentMethod === "cash"
                      ? "Kapıda Nakit"
                      : "Kapıda Kart"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Konum:</span>
                  <span className="font-medium text-gray-800">
                    {orderData.district}, {orderData.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Adet:</span>
                  <span className="font-medium text-gray-800">
                    {orderData.quantity} adet
                  </span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Toplam:</span>
                  <span className="font-bold text-green-600">
                    ₺{totalPrice?.toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              📦 Siparişiniz <strong>2-4 iş günü</strong> içinde kargoya
              verilecektir.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              Sorularınız için bizimle iletişime geçebilirsiniz.
            </p>
            <Link
              to="/"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-green-700 transition-all"
            >
              Ana Sayfaya Dön
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center gap-4 text-3xl">
            <span>🐻</span>
            <span>☕</span>
            <span>💚</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-5">
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

export default Thanks;
