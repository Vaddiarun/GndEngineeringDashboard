import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ['src/**/*.{js,jsx,ts,tsx}']
    }),
    tailwindcss(),],
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react({
//       include: ['src/**/*.{js,jsx,ts,tsx}']
//     }),
//     tailwindcss(),
//   ],
//   server: {
//     proxy: {
//       // proxy /api/* to your Django dev server
//       '/api': {
//         target: 'http://192.168.29.70:8000/api',
//         changeOrigin: true,
//         secure: false,
//         // remove the /api prefix when sending to Django
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })
