# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Cloudinary image uploads

1. Create a Cloudinary **unsigned upload preset**. Restrict it to the image formats you use, set a reasonable file-size limit, and assign a gallery folder.
2. Copy `.env.example` to `.env.local` and set `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`.
3. Restart the Vite dev server, then manage images and review details from `/admin`.

Do not put a Cloudinary API secret in frontend environment variables. Uploads use the restricted unsigned preset; image URLs, review details, and other admin edits are currently saved in this browser's local storage. They won't automatically sync to other devices or visitors. Shared live updates on Cloudflare will require a Cloudflare Function with private Cloudinary credentials and persistent storage such as KV or D1.
