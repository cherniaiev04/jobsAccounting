import { createRouter, createWebHistory } from 'vue-router';

// Import Views
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

// Define Routes
const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } }
];

// Create Router Instance
const router = createRouter({
    history: createWebHistory(),
    routes
});
// Navigation Guard - Check if the user is authenticated via cookies
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            await authService.getUser(); // Check authentication via cookies
            next(); // Proceed if authenticated
        } catch (error) {
            next('/login'); // Redirect if not authenticated
        }
    } else {
        next(); // Allow all other routes
    }
});

export default router;
