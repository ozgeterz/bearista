import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cities, getDistricts } from "../data/turkeyLocations";
import { saveOrder } from "../services/orderService";
import bear1 from "../assets/bear1.jpg";
import bear2 from "../assets/bear2.jpg";
import bear3 from "../assets/bear3.jpg";

const Product = () => {
  const navigate = useNavigate();
  const images = [bear1, bear2, bear3];
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    quantity: "1",
    paymentMethod: "cash",
  });
  const [districts, setDistricts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const prices = {
    1: 1200,
    2: 2200,
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData({ ...formData, city: selectedCity, district: "" });
    setDistricts(getDistricts(selectedCity));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return phone;

    let formatted = "";
    if (match[1]) formatted += match[1];
    if (match[2]) formatted += " " + match[2];
    if (match[3]) formatted += " " + match[3];
    if (match[4]) formatted += " " + match[4];
    return formatted.trim();
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    // Otomatik düzeltmeler
    // +90 ile başlıyorsa kaldır (90 kısmını)
    if (value.startsWith("90") && value.length > 10) {
      value = value.slice(2);
    }
    // 0 ile başlıyorsa kaldır
    if (value.startsWith("0")) {
      value = value.slice(1);
    }

    value = value.slice(0, 10);
    setFormData({ ...formData, phone: value });

    if (value.length === 0) {
      setPhoneError("");
    } else if (!value.startsWith("5")) {
      setPhoneError("Telefon numarası 5 ile başlamalıdır");
    } else if (value.length < 10) {
      setPhoneError("Telefon numarası 10 haneli olmalıdır");
    } else {
      setPhoneError("");
    }
  };

  const isPhoneValid =
    formData.phone.length === 10 && formData.phone.startsWith("5");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totalAmount = prices[formData.quantity];

    try {
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        city: formData.city,
        district: formData.district,
        address: formData.address,
        quantity: formData.quantity,
        totalAmount: totalAmount,
        paymentMethod: formData.paymentMethod,
      };

      const result = await saveOrder(orderData);

      if (result.success) {
        console.log("Sipariş kaydedildi:", result.data);
        navigate("/thanks", {
          state: {
            orderData: formData,
            totalPrice: totalAmount,
            orderId: result.data[0]?.id,
          },
        });
      } else {
        console.error("Sipariş kaydetme hatası:", result.error);
        alert("Sipariş kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Sipariş kaydetme hatası:", error);
      alert("Sipariş kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviews = [
    {
      name: "Ayşe K.",
      rating: 5,
      comment:
        "Harika bir ürün! Kalitesi çok iyi, tam beklediğim gibi geldi. Koleksiyonuma mükemmel bir ekleme oldu.",
      date: "15 Ocak 2026",
    },
    {
      name: "Mehmet Y.",
      rating: 5,
      comment:
        "Eşime hediye aldım, çok beğendi. Paketleme de çok özenli yapılmış. Teşekkürler!",
      date: "12 Ocak 2026",
    },
    {
      name: "Zeynep A.",
      rating: 4,
      comment:
        "Çok tatlı bir bardak. Ofiste herkes soruyor nereden aldığımı. Kargo biraz geç geldi ama ürün mükemmel.",
      date: "10 Ocak 2026",
    },
    {
      name: "Can B.",
      rating: 5,
      comment:
        "Starbucks koleksiyonumu tamamladım sonunda! Bearista gerçekten çok şirin, kalitesi de üst düzey.",
      date: "8 Ocak 2026",
    },
    {
      name: "Elif S.",
      rating: 5,
      comment:
        "2 tane aldım, biri kendime biri arkadaşıma. İkimiz de çok memnunuz. Fiyat/performans oranı harika.",
      date: "5 Ocak 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-5 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-700 font-bold text-base">B</span>
            </div>
            <span className="font-bold text-base">Bearista</span>
          </Link>
          <Link
            to="/"
            className="text-sm hover:text-green-200 transition-colors"
          >
            ← Ana Sayfa
          </Link>
        </div>
      </header>

      <main className="px-5 py-10">
        {/* Product Section */}
        <div className="mb-10">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-10">
            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt="Bearista Bardağı"
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            <div className="flex gap-3 mt-5 justify-center">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 bg-green-100 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImage === index ? "ring-2 ring-green-500" : "hover:ring-2 hover:ring-green-300"}`}
                >
                  <img
                    src={img}
                    alt={`Bearista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
              Sınırlı Stok
            </span>
            <h1 className="text-2xl font-bold text-gray-800">
              Starbucks Bearista Koleksiyon Bardağı
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Starbucks'ın sevilen Bearista serisinden özel tasarım koleksiyon
              bardağı. Sevimli ayı figürü ile tasarlanan bu bardak, hem günlük
              kullanım hem de koleksiyonunuz için mükemmel bir seçim.
            </p>

            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4 text-sm">
                Ürün Özellikleri:
              </h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Orijinal Starbucks
                  ürünü
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Yüksek kaliteli
                  seramik
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> 350ml kapasite
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Bulaşık makinesine
                  uygun
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Özel koleksiyon
                  kutusu
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-green-700">₺1.200</div>
              <div className="text-gray-500 line-through text-base">₺1.500</div>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                %20 İndirim
              </span>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl">
              <p className="text-yellow-800 font-medium text-sm">
                🎁 2 adet alana özel fiyat: ₺2.200 (₺200 tasarruf!)
              </p>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div
          className="bg-white rounded-2xl p-6 shadow-lg mb-10"
          id="order-form"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Sipariş Formu
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Bilgilerinizi doldurun, siparişinizi kapınıza gönderelim.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  İsim *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Adınız"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Soyisim *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Soyadınız"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Telefon *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-lg bg-gray-100 text-gray-600 text-sm">
                    +90
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formatPhoneDisplay(formData.phone)}
                    onChange={handlePhoneChange}
                    required
                    className={`w-full px-3 py-2.5 border rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-sm ${phoneError ? "border-red-500" : "border-gray-300"}`}
                    placeholder="5XX XXX XX XX"
                  />
                </div>
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  İl *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white text-sm"
                >
                  <option value="">İl Seçiniz</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  İlçe *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  disabled={!formData.city}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                >
                  <option value="">İlçe Seçiniz</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                Adres *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="2"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none text-sm"
                placeholder="Mahalle, sokak, bina no, daire no..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3 text-sm">
                Adet *
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.quantity === "1" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
                >
                  <input
                    type="radio"
                    name="quantity"
                    value="1"
                    checked={formData.quantity === "1"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      1 Adet
                    </div>
                    <div className="text-green-600 font-semibold text-sm">
                      ₺1.200
                    </div>
                  </div>
                </label>
                <label
                  className={`flex-1 p-3 border-2 rounded-xl cursor-pointer transition-all relative ${formData.quantity === "2" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
                >
                  <input
                    type="radio"
                    name="quantity"
                    value="2"
                    checked={formData.quantity === "2"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    Avantajlı
                  </span>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      2 Adet
                    </div>
                    <div className="text-green-600 font-semibold text-sm">
                      ₺2.200
                    </div>
                    <div className="text-gray-500 text-xs line-through">
                      ₺2.400
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3 text-sm">
                Ödeme Yöntemi *
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === "cash" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl mb-1">💵</div>
                    <div className="text-sm font-bold text-gray-800">
                      Kapıda Nakit
                    </div>
                  </div>
                </label>
                <label
                  className={`flex-1 p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === "card" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl mb-1">💳</div>
                    <div className="text-sm font-bold text-gray-800">
                      Kapıda Kart
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Toplam Tutar:</span>
                <span className="text-2xl font-bold text-green-700">
                  ₺{prices[formData.quantity].toLocaleString("tr-TR")}
                </span>
              </div>
              <p className="text-gray-500 text-xs mt-2">Kargo ücretsiz!</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isPhoneValid}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-base hover:bg-green-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Gönderiliyor..." : "Siparişi Tamamla"}
            </button>
          </form>
        </div>

        {/* Reviews Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Müşteri Yorumları
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Ürünümüzü alan müşterilerimizin görüşleri
          </p>

          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-gray-800">
                    {review.name}
                  </span>
                  <span className="text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <span className="text-lg">⭐</span>
              <span className="font-bold">4.9 / 5</span>
              <span className="text-gray-600 text-xs">(127 değerlendirme)</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 py-8 px-5">
        <div className="text-center text-white/60 text-xs">
          <p>© 2026 Bearista. Tüm hakları saklıdır.</p>
          <p className="mt-1">
            Bu site Starbucks ile resmi bir bağlantıya sahip değildir.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Product;
