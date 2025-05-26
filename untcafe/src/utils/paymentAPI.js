import axios from 'axios';
import { Alert } from 'react-native';

const BACKEND_URL = 'http://192.168.1.230:5000';

const paymentAPI = {
  fetchSetupIntentClientSecret: async () => {
    const userId = '682c202cf08ba92be50a36f5';
    try {
      const response = await axios.post(
        `${BACKEND_URL}/stripe/create-setup-intent`,
        { userId: userId }
      );
      return response.data;
    } catch (error) {
      console.error('API Error: fetchSetupIntentClientSecret', error.response?.data || error.message);
      Alert.alert('Error', 'Could not initiate payment setup. Please try again.');
      throw error;
    }
  },


  fetchPaymentMethods: async () => {
    const userId = '682c202cf08ba92be50a36f5';
    try {
      const response = await axios.post(
        `${BACKEND_URL}/stripe/get-payment-methods`,
        { userId: userId } // Pass the hardcoded userId directly
      );
      return response.data.paymentMethods;
    } catch (error) {
      console.error('API Error: fetchPaymentMethods', error.response?.data || error.message);
      Alert.alert('Error', 'Could not load payment methods. Please try again.');
      throw error;
    }
  },


  createPaymentIntent: async (amount, currency, paymentMethodId) => {

    const userId = '682c202cf08ba92be50a36f5';
    try {
      const response = await axios.post(
        `${BACKEND_URL}/stripe/create-payment-intent`,
        {
          amount,
          currency,
          userId: userId,
          paymentMethodId,
        }
      );
      return response.data.clientSecret;
    } catch (error) {
      console.error('API Error: createPaymentIntent', error.response?.data || error.message);
      Alert.alert('Payment Error', error.response?.data?.error || 'Could not process payment. Please try again.');
      throw error;
    }
  },
  detachPaymentMethod: async (paymentMethodId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/stripe/detach-payment-method`, // New backend endpoint
        { paymentMethodId: paymentMethodId }
      );
      return response.data;
    } catch (error) {
      console.error('API Error: detachPaymentMethod', error.response?.data || error.message);
      Alert.alert('Error', 'Could not remove card. Please try again.');
      throw error;
    }
  },
};

export default paymentAPI;