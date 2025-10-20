# NoteCode - Code Sharing App

A modern, responsive web application for creating and sharing code snippets. Built with React and styled-components.

## Features

- **Code Editor**: Interactive code editor with syntax highlighting
- **Language Support**: HTML, JavaScript, CSS, Python, Java
- **Theme Selection**: Light and dark themes
- **Share Functionality**: Generate shareable links for code snippets
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, modern interface with decorative background elements

## Technologies Used

- **React 18** - Frontend framework
- **Styled Components** - CSS-in-JS styling
- **React Hooks** - State management (useState, useEffect)
- **Google Fonts** - Outfit font family
- **SVG Icons** - Custom iconography

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── BackgroundElements.js  # Decorative background elements
│   ├── CodeEditor.js          # Main code editor component
│   └── Header.js              # App header with logo and title
├── assets/                    # SVG icons and images
├── App.js                     # Main application component
├── index.js                   # React entry point
└── index.css                  # Global styles
```

## Features Implementation

### Code Editor
- Click-to-edit functionality
- Syntax highlighting for HTML
- Line numbers
- Tab support for indentation
- Language and theme selection dropdowns

### Share Functionality
- Generate unique IDs for code snippets
- Disable share button after sharing
- Re-enable when code is edited
- Display share link

### Responsive Design
- Mobile-first approach
- Flexible layout using CSS Grid and Flexbox
- Responsive typography and spacing
- Touch-friendly interface

## Design

The application follows the provided design specifications with:
- Outfit font family for typography
- Purple gradient background
- Clean white code editor with subtle shadows
- Decorative background elements (stars, plus signs, chat bubbles)
- Modern button and dropdown styling

## Future Enhancements

- Backend integration for persistent storage
- Additional language support
- Code execution capabilities
- User authentication
- Code snippet management
- Export functionality

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Available scripts:
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## License

This project is part of the devChallenges.io coding challenges.