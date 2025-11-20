# Fluento AI - Spanish Learning Platform

A comprehensive Spanish learning platform built with Next.js 14, featuring AI-powered conversations, subscription management, and an interactive learning experience.

## 🚀 Features

- **AI-Powered Spanish Tutor**: Interactive conversations with OpenAI GPT-3.5 Turbo
- **Authentication System**: Role-based access (Student, Teacher, Admin)
- **Subscription Management**: Monthly/yearly plans with Stripe integration
- **Avatar with Lip-Sync**: Animated character with speech visualization
- **Voice Integration**: Speech-to-text and text-to-speech functionality
- **Admin Dashboard**: User management, analytics, and system overview
- **Lesson Management**: Create and manage Spanish lessons and exercises
- **Progress Tracking**: Monitor learning progress and performance
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **AI**: OpenAI API
- **Speech**: react-speech-kit
- **Animations**: Framer Motion

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/engrzani/Avtar_fluento-AI.git
   cd fluento-ai
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Database
   DATABASE_URL="file:./dev.db"

   # OpenAI API
   OPENAI_API_KEY=your-openai-api-key-here

   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
   STRIPE_MONTHLY_PRICE_ID=your-monthly-price-id
   STRIPE_YEARLY_PRICE_ID=your-yearly-price-id
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### OpenAI Setup
1. Create an account at [OpenAI](https://platform.openai.com/)
2. Generate an API key
3. Add the key to your `.env` file

### Stripe Setup
1. Create a [Stripe](https://stripe.com) account
2. Get your publishable and secret keys
3. Create products for monthly and yearly subscriptions
4. Set up webhook endpoints for subscription events
5. Add all keys to your `.env` file

### Database Schema
The application uses the following main models:
- **User**: Authentication and subscription data
- **ChatSession**: AI conversation sessions
- **ChatMessage**: Individual messages in conversations
- **Lesson**: Spanish learning lessons
- **Exercise**: Practice exercises
- **Progress**: User learning progress tracking

## 👥 User Roles

- **Student**: Can access lessons, chat with AI tutor, track progress
- **Teacher**: Can create lessons, manage exercises, view student progress
- **Admin**: Full system access, user management, analytics

## 🎯 Usage

### For Students
1. Sign up and choose a subscription plan
2. Start conversations with Sofia, your AI Spanish tutor
3. Practice speaking with voice recognition
4. Complete lessons and exercises
5. Track your learning progress

### For Teachers
1. Create and manage lessons
2. Add exercises and quizzes
3. Monitor student progress
4. Review conversation history

### For Admins
1. Manage user accounts and subscriptions
2. View platform analytics
3. Oversee lesson content
4. Monitor system usage

## 📱 API Endpoints

- `/api/auth/*` - Authentication routes (NextAuth.js)
- `/api/chat` - AI conversation endpoint
- `/api/checkout` - Stripe checkout session creation
- `/api/webhooks/stripe` - Stripe webhook handler
- `/api/tts` - Text-to-speech conversion

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based session management
- Role-based access control
- Stripe webhook signature verification
- Environment variable protection

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## 🐛 Troubleshooting

### Common Issues

**Prisma Client Errors**
```bash
npx prisma generate
npx prisma db push
```

**Speech Recognition Not Working**
- Ensure you're using HTTPS in production
- Check browser permissions for microphone access

**Stripe Webhooks Failing**
- Verify webhook endpoint URL
- Check webhook secret in environment variables

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@fluento-ai.com
- Discord: [Join our community](https://discord.gg/fluento-ai)

## 🙏 Acknowledgments

- OpenAI for GPT-3.5 Turbo API
- Stripe for payment processing
- Vercel for hosting platform
- NextAuth.js for authentication
- Prisma for database management

---

Built with ❤️ for Spanish language learners worldwide
