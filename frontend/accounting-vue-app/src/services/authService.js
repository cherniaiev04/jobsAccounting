import apiClient from './api';

export default {
    async login(credentials) {
        return apiClient.post('/auth/login', credentials);
    },
    async logout() {
        return apiClient.post('/auth/logout');
    },
    async getUser() {
        return apiClient.get('/user/profile');
    }
};
