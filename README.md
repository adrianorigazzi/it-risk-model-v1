# IT Risk Assessment Model - Demo v1

A comprehensive web-based tool for assessing and managing IT risks in your organization.

## 🌐 Live Demo

Visit the live demo at: `https://adrianorigazzi.github.io/it-risk-model-v1/`

## 📋 Features

- **Risk Assessment Form**: Comprehensive form to capture risk details including name, description, category, likelihood, and impact
- **Risk Matrix Visualization**: Interactive 5x5 risk matrix showing the relationship between likelihood and impact
- **Automated Risk Scoring**: Calculates risk scores (1-25) based on likelihood × impact
- **Risk Classification**: Categorizes risks into Low, Medium, High, and Critical levels
- **Risk Management Recommendations**: Provides actionable recommendations based on risk level
- **Persistent Storage**: Saves all assessed risks in browser localStorage
- **Risk List Dashboard**: View all assessed risks sorted by severity
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🎯 Risk Categories

- Security
- Operational
- Compliance
- Financial
- Strategic
- Reputational

## 📊 Risk Levels

| Risk Score | Level | Color | Action Required |
|------------|-------|-------|-----------------|
| 1-6 | Low | Green | Accept & Monitor |
| 7-12 | Medium | Orange | Mitigate |
| 13-19 | High | Red | Urgent Action Required |
| 20-25 | Critical | Purple | Immediate Action Required |

## 🚀 Usage

1. Open the website in your browser
2. Fill out the risk assessment form with details about the risk
3. Select the likelihood (1-5) and impact (1-5) of the risk
4. Add mitigation strategies (optional)
5. Click "Assess Risk" to calculate the risk score
6. View the results and recommendations
7. See the risk highlighted in the risk matrix
8. Review all assessed risks in the dashboard below

## 💻 Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/adrianorigazzi/it-risk-model-v1.git
   cd it-risk-model-v1
   ```

2. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. Navigate to `http://localhost:8000` (or the appropriate port)

## 📁 Project Structure

```
it-risk-model-v1/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # Risk assessment logic and interactivity
├── _config.yml         # GitHub Pages configuration
└── README.md           # Project documentation
```

## 🔧 Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **JavaScript (Vanilla)**: Risk calculations, DOM manipulation, and localStorage
- **GitHub Pages**: Free hosting and deployment

## 🌟 Key Functionality

### Risk Assessment Algorithm

```
Risk Score = Likelihood × Impact
```

Where:
- Likelihood: 1 (Very Low) to 5 (Very High)
- Impact: 1 (Very Low) to 5 (Very High)
- Risk Score: 1 to 25

### Data Persistence

All assessed risks are saved to the browser's localStorage, allowing users to:
- Return to their assessment later
- Build a comprehensive risk register over time
- Export data (future enhancement)

## 🎨 Design Principles

- **User-Friendly**: Clean, intuitive interface
- **Professional**: Corporate-ready design with gradient accents
- **Accessible**: High contrast and readable typography
- **Responsive**: Mobile-first approach

## 📝 License

This project is open source and available for educational and demonstration purposes.

## 👤 Author

Adriano Rigazzi

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For questions or support, please open an issue on GitHub.

---

**Note**: This is a demonstration version (v1.0) of an IT Risk Assessment tool. For production use, consider adding:
- User authentication
- Database backend
- Advanced reporting features
- Risk treatment tracking
- Integration with other risk management tools
