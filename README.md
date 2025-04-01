### Sample Hotel Booking App

## Technologies Used:

- MongoDB
- Cloudinary
- Render
- NodeJS / Express
- ReactJS using Vite
- React Context
- TailwindCSS
- Stripe
- Playright
- TypeScript
- React Query

## To Run

git clone the app.

- In the backend folder, add a `.env` and get the keys from cloudinary, a JWT key, mongodb, and stripe.
- In the front end folder, get the stripe token.
- Run `npm install` and `npm run dev` for both environments.

To run tests

- Create `env.e2e` file in the backend folder. This env will need the same values but will require a separate mongo db, so the mongo connection string will be different.
- Run `npm run e2e`.
- Playright tests can be ran through vscode by using the playright tool.
