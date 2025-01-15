# Tasty Bites - Restaurant App 🍽️

Tasty Bites is a modern and user-friendly restaurant application built with **Next.js**, **Tailwind CSS**, **Firebase**, and **shadcn/ui**. It provides user authentication, table-wise order management, and real-time notifications to ensure a seamless customer experience.

## Features ✨

- **🔑 Login and Signup:**

  - Users can create an account or log in to access personalized services.

- **🪑 Table Selection:**

  - Users can pick any table available in the restaurant.

- **📋 Order Management:**

  - Place orders table-wise from the menu.
  - View a detailed list of placed orders.
  - Modify items in the order, such as updating the quantity.
  - Cancel existing orders.

- **📲 Real-time Notifications:**

  - Notify customers about their order status and updates instantly.

## Tech Stack 🛠️

- **Frontend:**

  - [Next.js](https://nextjs.org/): A React framework for building performant and SEO-friendly web applications.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for designing sleek and responsive UI.
  - [shadcn](https://shadcn.dev/): A component library for modern UI development.

- **Backend:**

  - [Firebase](https://firebase.google.com/): For real-time database, user authentication, and hosting.

## Installation ⚙️

1. **Clone the repository:**

   ```bash
   git clone https://github.com/devshad7/tasty-bites.git
   cd tasty-bites
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Firestore Database.
   - Add your Firebase configuration to a `.env.local` file in the project root:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Folder Structure 📂

```
.
├── public          # Static assets like images and icons
├── app             # Next.js App Router and main logic
│   ├── components  # Reusable UI components
│   ├── styles      # Tailwind CSS configurations
│   └── utils       # Helper functions and Firebase configurations
└── .env.local      # Environment variables (not included in the repository)
```

## Usage 🚀

1. **🔒 User Authentication:**

   - Sign up or log in to access the app.

2. **🪑 Table Selection:**

   - Choose a table to start placing an order.

3. **🍔 Placing Orders:**

   - Browse the menu and add items to your order.

4. **🔄 Order Management:**

   - View all items in your order.
   - Modify item quantities or remove items.
   - Cancel the entire order if needed.

## Deployment

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the production server:**

   ```bash
   npm start
   ```

3. **Deploy to Vercel:**

   - Run the command:
     ```bash
     vercel deploy
     ```
   - Follow the instructions to deploy the application.

## Contributing 🤝

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License 📜

This project is licensed under the [MIT License](LICENSE).

---

Enjoy managing your restaurant orders efficiently with Tasty Bites! If you encounter any issues or have suggestions for improvement, feel free to reach out.

