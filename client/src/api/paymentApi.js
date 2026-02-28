import api from "./axios";

const paymentApi = {
    createOrder: async (amount, currency) => {
        const response = await api.post("/Payments/create-order", { amount, currency });
        return response.data;
    },

    verifyPayment: async (paymentData) => {
        const response = await api.post("/Payments/verify", paymentData);
        return response.data;
    },

    getPaymentHistory: async () => {
        const response = await api.get("/Payments");
        return response.data;
    }
};

export default paymentApi;
