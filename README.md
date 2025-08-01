# FounderHubAi 🚀

A comprehensive AI-powered platform for entrepreneurs and founders to build, validate, and grow their business ideas.

## 🌟 Features

- **AI-Powered Business Validation**: Get instant feedback on your business ideas
- **Interactive Pitch Deck Builder**: Create professional presentations with AI assistance
- **Market Analysis Tools**: Understand your target market and competition
- **User Dashboard**: Track your progress and manage multiple projects
- **Real-time Collaboration**: Work with team members on your business plans

## 🏗️ Architecture

This project uses a modern full-stack architecture:

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Python FastAPI with AI integration
- **Database**: JSON-based storage (easily extensible to PostgreSQL/MongoDB)
- **AI Services**: OpenAI GPT integration for business analysis

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** - [Download here](https://python.org)
- **Node.js 16+** - [Download here](https://nodejs.org)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

### 🎯 One-Click Setup (Recommended)

**Windows:**
```bash
# Double-click setup.bat or run:
setup.bat
```

**Mac/Linux:**
```bash
# Make script executable and run:
chmod +x setup.sh
./setup.sh
```

### 📝 Manual Setup

If you prefer to set up manually:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ethan-SparqCapital/FounderHubAi.git
   cd FounderHubAi
   ```

2. **Set up the backend**
   ```bash
   cd apps/backend
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Set up the frontend**
   ```bash
   cd apps/frontend
   npm install
   ```

4. **Run the application**

   **Backend (Terminal 1):**
   ```bash
   cd apps/backend
   python main.py
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd apps/frontend
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000` to access the application.

## 🔑 Environment Setup

### Required Environment Variables

Create a `.env` file in `apps/backend/` with:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration  
PORT=8000
HOST=0.0.0.0

# Development Settings
DEBUG=True
ENVIRONMENT=development
```

### Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key and paste it in your `.env` file

## 📁 Project Structure

```
FounderHubAi/
├── apps/
│   ├── backend/           # Python FastAPI backend
│   │   ├── main.py       # Main application entry point
│   │   ├── requirements.txt
│   │   ├── .env.example  # Environment template
│   │   └── user_data.json
│   └── frontend/         # Next.js frontend
│       ├── app/          # App router pages
│       ├── components/   # Reusable UI components
│       └── types/        # TypeScript type definitions
├── setup.bat            # Windows setup script
├── setup.sh             # Unix/Linux/Mac setup script
├── infra/               # Infrastructure configuration
└── services/           # Additional microservices
```

## 🎯 Usage

### For Entrepreneurs
1. **Create an Account**: Sign up to start building your business
2. **Validate Your Idea**: Use AI to get feedback on your business concept
3. **Build Your Pitch Deck**: Create professional presentations
4. **Track Progress**: Monitor your business development journey

### For Developers
1. **Fork the Repository**: Create your own copy
2. **Run Setup Script**: Use `setup.bat` (Windows) or `setup.sh` (Mac/Linux)
3. **Make Changes**: Add features or fix bugs
4. **Submit Pull Request**: Contribute back to the community

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for AI features | Yes |
| `PORT` | Backend server port (default: 8000) | No |
| `HOST` | Backend server host (default: 0.0.0.0) | No |
| `DEBUG` | Enable debug mode (default: True) | No |

### API Endpoints

- `POST /api/validate-idea` - Validate business ideas with AI
- `GET /api/user/{user_id}` - Get user profile and projects
- `POST /api/pitch-deck` - Generate pitch deck content
- `GET /api/market-analysis` - Get market insights

## 🐛 Troubleshooting

### Common Issues

**"Python not found"**
- Install Python 3.8+ from [python.org](https://python.org)
- Make sure Python is added to your system PATH

**"Node.js not found"**
- Install Node.js 16+ from [nodejs.org](https://nodejs.org)
- Restart your terminal after installation

**"OpenAI API Error"**
- Check that your API key is correct in `.env`
- Ensure you have credits in your OpenAI account
- Verify the API key has the necessary permissions

**"Port already in use"**
- Change the port in `.env` file
- Or kill the process using the port

### Getting Help

If you encounter issues:
1. Check the [troubleshooting section](#-troubleshooting)
2. Create an issue on GitHub with error details
3. Include your operating system and versions

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Next.js team for the amazing framework
- FastAPI for the robust backend framework
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Join our community discussions
- Email us at support@founderhubai.com

---

**Built with ❤️ for the entrepreneurial community** 