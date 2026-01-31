import { supabase } from '../lib/supabase';

export const orderService = {
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
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
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Sipariş oluşturma hatası:', error);
      throw error;
    }

    return data;
  },

  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Siparişleri getirme hatası:', error);
      throw error;
    }

    return data;
  },

  async getOrderById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Sipariş getirme hatası:', error);
      throw error;
    }

    return data;
  },

  async updateOrderStatus(id, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Sipariş güncelleme hatası:', error);
      throw error;
    }

    return data;
  },

  async deleteOrder(id) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Sipariş silme hatası:', error);
      throw error;
    }

    return true;
  }
};
