# Tunetastic

This is a Spotify-like music streaming web app built with **React**, **Vite**, **ShadCN**, **Tailwind CSS**, and **Firebase**. It allows users to sign up, log in, and stream music. Users can create playlists, search for songs, and enjoy a modern, responsive UI with a side navigation bar. The app supports both **dark mode** and **light mode** for an enhanced user experience.

## Features

- **User Authentication**: Google login and email/password sign-in via Firebase Auth
- **Music Streaming**: Upload and play music tracks, control playback (play, pause, next, previous)
- **Playlists**: Users can create, edit, and delete their playlists
- **Search**: Search songs, albums, or artists
- **Side Navbar**: A sleek side navigation bar to navigate through sections of the app
- **Dark Mode & Light Mode**: Toggle between dark and light modes for a customized viewing experience
- **Responsive Design**: Fully responsive for mobile and desktop devices
- **User Profile**: Customize your profile with a username and profile picture

## Tech Stack

- **Frontend**:  
  - **React**: JavaScript library for building user interfaces  
  - **Vite**: Next-generation build tool for fast development  
  - **ShadCN**: Component library to build UI elements with ease  
  - **Tailwind CSS**: Utility-first CSS framework for styling  
  - **CSS Variables**: Used for custom theming and dynamic styling  
  - **Firebase**: For authentication, Firestore database, and storage
  - **Vercel**: Deployment platform for seamless hosting

- **Backend**:  
  - **Firebase Firestore**: NoSQL database for storing user data, playlists, and music information  
  - **Firebase Storage**: For uploading and storing music files

- **Color Palette**:  
  - **#222831**: Dark background color  
  - **#393E46**: Lighter dark shade for sections  
  - **#00ADB5**: Accent color for highlights, buttons, and links  
  - **#EEEEEE**: Light color for text and background elements

## Project Structure

```
music-streaming-app/
├── .env                        # Environment variables
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── App.jsx                 # Main app component
    ├── main.jsx               # Entry point
    ├── index.css              # Global styles
    ├── lib/
    │   └── firebase.js        # Firebase configuration
    ├── components/
    │   ├── layout/
    │   │   ├── SideNav.jsx    # Side navigation
    │   │   ├── TopBar.jsx     # Top navigation bar
    │   │   └── Layout.jsx     # Main layout wrapper
    │   ├── auth/
    │   │   ├── LoginForm.jsx
    │   │   ├── SignUpForm.jsx
    │   │   └── AuthCheck.jsx  # Auth state component
    │   ├── music/
    │   │   ├── MusicPlayer.jsx
    │   │   ├── PlaylistCard.jsx
    │   │   ├── SongList.jsx
    │   │   ├── SongCard.jsx
    │   │   └── Controls.jsx   # Playback controls
    │   ├── ui/                # ShadCN components
    │   │   ├── button.jsx
    │   │   ├── card.jsx
    │   │   ├── dialog.jsx
    │   │   └── dropdown.jsx
    │   └── shared/
    │       ├── ThemeToggle.jsx
    │       └── Loading.jsx
    ├── hooks/
    │   ├── useAuth.js         # Authentication hook
    │   ├── useTheme.js        # Theme management
    │   ├── usePlayer.js       # Music player logic
    │   └── usePlaylists.js    # Playlist management
    ├── context/
    │   ├── AuthContext.jsx    # Auth state context
    │   ├── ThemeContext.jsx   # Theme context
    │   └── PlayerContext.jsx  # Music player state
    ├── pages/
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── SignUp.jsx
    │   ├── Search.jsx
    │   ├── Library.jsx
    │   ├── Playlist.jsx
    │   └── Profile.jsx
    ├── utils/
    │   ├── constants.js       # App constants
    │   ├── firebase-utils.js  # Firebase helpers
    │   └── formatters.js      # Data formatters
    └── styles/
        ├── theme.css          # Theme variables
        └── components.css     # Component styles
```

## Project Overview

This project simulates a Spotify-like music streaming app where users can log in, upload, play, and manage their favorite music. With a clean and minimal UI, users can explore the music library, create and manage playlists, and enjoy seamless music playback. The app also features a side navigation bar that makes it easy for users to navigate between different sections of the app, such as playlists, music library, and profile settings.

### Features Overview:
- **Authentication**: Users can log in with their Google account or email and password. The authentication state is managed using Firebase Auth.
- **Music Library & Player**: Users can browse the music library, play music, and control playback.
- **Playlists**: Users can create and manage their playlists, saving their favorite songs.
- **Side Navbar**: The side navigation bar includes links to all major sections of the app, like Home, Playlists, and Profile.
- **Dark Mode & Light Mode**: Users can switch between dark and light modes to customize the app's appearance.
- **Responsive UI**: The UI is fully responsive, ensuring it looks great on all devices.
- **Custom Styling**: The app is styled using **Tailwind CSS**, and the color palette is based on a dark theme with accent highlights in cyan (#00ADB5).

## Firebase Setup

### Authentication

- Set up Firebase Authentication in the Firebase console, enabling both Google and Email/Password login methods.
- Use **Firebase Auth** in the app to authenticate users and manage their session.

### Firestore Database

- Create collections in Firestore for storing:
  - User data (e.g., username, profile picture)
  - Playlists (playlist name, list of songs)
  - Songs (metadata like title, artist, genre, file URL)

### Firebase Storage

- Use Firebase Storage to store music files (MP3, WAV, etc.) uploaded by users or admins.
- Retrieve music files from Firebase Storage to stream them to the player.

## Dark Mode & Light Mode

This app supports both **dark mode** and **light mode**. Users can toggle between these modes with a smooth transition to enhance the app's usability based on their preferences.

### How to Use:
- A toggle button in the settings or navbar allows users to switch between **dark mode** and **light mode**.
- Dark mode features a darker background and lighter text, while light mode switches to a lighter background with darker text.
- The app uses **CSS variables** to dynamically change the themes and colors for a seamless experience.

## Deployment

1. Push your code to a GitHub repository.
2. Connect the repository to **Vercel** for easy deployment.
3. Set up Vercel to deploy your app and configure environment variables (like Firebase credentials).

## Future Features

- Personalized music recommendations based on user preferences
- Offline music playback for premium users
- Integration with external music services (like Spotify API) for more songs
- Social features such as commenting and sharing playlists

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next-gen build tool for fast development
- [ShadCN](https://shadcn.dev/) - A component library for building modern UI elements
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Firebase](https://firebase.google.com/) - Backend platform for web and mobile applications