import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Evontra';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        const page =
            pages[`./Pages/${name}.jsx`] ||
            pages[`./Pages/${name.toLowerCase()}.jsx`] ||
            pages[`./Pages/${name.charAt(0).toUpperCase() + name.slice(1)}.jsx`];
        if (!page) {
            console.error(`Inertia Page not found: ./Pages/${name}.jsx`);
        }
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
