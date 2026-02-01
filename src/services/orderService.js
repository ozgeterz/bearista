import { supabase } from "../lib/supabase";

export const saveOrder = async (orderData) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          phone: orderData.phone,
          city: orderData.city,
          district: orderData.district,
          address: orderData.address,
          quantity: parseInt(orderData.quantity),
          total_amount: orderData.totalAmount,
          payment_method: orderData.paymentMethod,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase kayıt hatası:", error);
      return { success: false, error };
    }

    console.log("Sipariş başarıyla kaydedildi:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Database kayıt hatası:", err);
    return { success: false, error: err };
  }
};
