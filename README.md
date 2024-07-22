# Spotify Wrap

Welcome to Spotify Wrap! This project is a web application built with React that utilizes the Spotify API to provide users with insights into their music preferences. Users can view their favorite artists and tracks over different time frames and explore detailed audio analysis of their music. Additionally, the application offers personalized recommendations based on the user's listening habits.

## Features

- **Favorite Artists and Tracks:** View your favorite artists and tracks over different time frames (e.g., past month, past six months, all time).
- **Audio Analysis:** Explore detailed audio analysis for each track, including metrics like danceability, energy, tempo, and more.
- **Personalized Recommendations:** Receive tailored music recommendations based on your listening habits and preferences.
- **User Playlists:** Access and manage your Spotify playlists directly within the application.

## Technologies Used

- **Front End:** Developed using React, providing a dynamic and responsive user interface.
- **Back End:** Powered by Node.js, ensuring smooth communication and handling of requests and authentication.
- **API Integration:** Utilizing the Spotify API to fetch user data, track information, and audio analysis.

## Key Functionalities

- **User Authentication:** Securely authenticate users via Spotify's OAuth, ensuring privacy and security.
- **Interactive Visualizations:** Utilize charts and graphs to visually represent music data and insights.

## Installation and Usage

To run the project locally, follow these steps:

1. Clone the repository.
2. Navigate to the client and server directories and install dependencies using `npm install`.
3. Create a `.env` file in the root of the server directory and add your Spotify API credentials (CLIENT_ID and CLIENT_SECRET).
4. Start the backend server using `npm start` in the backend directory.
5. Start the frontend server using `npm start` in the frontend directory.

## License

This project is licensed under the MIT License.

## Acknowledgements

Special thanks to Spotify for providing the API and data that made this project possible.

The UI design of this project was heavily inspired by Brittany Chiang's [Spotify Profile](https://spotify-profile.herokuapp.com/) project. While I drew design inspiration from her work, all the code was written independently without copying any of her code. Additionally, this projects analytics was also inspired by Spotify's annual 'Wrapped' feature.
