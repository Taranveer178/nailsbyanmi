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

Do not put a Cloudinary API secret in frontend environment variables. Uploads use the restricted unsigned preset.

## Firebase admin access and live settings

1. In Firebase Authentication, enable the **Email/Password** provider and create the administrator's user account. The app has no public sign-up flow.
2. Create a Cloud Firestore database and deploy the repository rules with `npx firebase-tools deploy --project glam-by-anmi --only firestore:rules`.
3. In Firestore, create `admins/{uid}` where `{uid}` is the administrator's Firebase Authentication UID. Set a field such as `role: "admin"`. Admin records cannot be created or edited by the web app.
4. Open `/admin` and sign in with that account. The first successful admin save creates `siteSettings/admin`; its public read updates the live site, while writes are restricted by the deployed rules.

The admin page keeps a local cache for offline recovery, but changes only become live for other visitors after the Firestore save succeeds. Existing local edits on the first administrator's browser are used as the starting data for the first cloud save.

## Appointment email delivery

Booking requests are sent to `staranveer178@gmail.com` by the Cloudflare Pages Function at `functions/api/booking.js`.

1. In Cloudflare Dashboard, open the project's Pages deployment settings.
2. Add an environment variable named `RESEND_API_KEY` as a **secret** in both Preview and Production environments.
3. Set it to the Resend API key supplied for this project.
4. Deploy the site so Cloudflare includes the `functions/` directory. The browser calls `/api/booking`; the key remains server-side.

Before production delivery, verify a sending domain in Resend and change the endpoint's `from` address from `Glam by Anmi <onboarding@resend.dev>` to an address such as `Glam by Anmi <bookings@glambyanmi.in>`. Resend's test sender may be restricted to the account owner's verified address.
