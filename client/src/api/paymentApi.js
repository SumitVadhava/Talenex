import api from "./axios";

const paymentApi = {
    createOrder: async (amount) => {
        const response = await api.post("/Payments/create-order", { amount });
        return response.data; // { orderId }
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
