# Pokelister

Pokelister is a web application that allows users to create and manage their Pokémon collection. With Pokelister, you can easily keep track of your captured Pokémon, view their details, and organize them into various categories.

## Live Demo

Check out the live demo of Pokelister at [pokelister](https://chipper-squirrel-1f4a32.netlify.app).

## Features

- User authentication: Sign up and log in using your email and password or Google account.
- Pokémon collection management: Add Pokémon to your collection, view their details, and mark them as captured.
- Search functionality: Easily search and filter through your Pokémon collection.
- Categories: Organize your Pokémon into custom categories for better organization.
- Responsive design: Enjoy a seamless experience on both desktop and mobile devices.

## Technologies Used

- React: JavaScript library for building the user interface.
- Redux: State management library for predictable application state updates.
- Firebase: Backend-as-a-Service (BaaS) platform for user authentication and data storage.
- React Router: Library for handling routing in the React application.
- React Hook Form: Library for form validation and handling form state.
- PokéAPI: External API for retrieving Pokémon data.

## Getting Started

To get started with Pokelister, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/lordvader501/pokelister.git
```

2. Install the dependencies:

```shell
cd pokelister
npm install
```

3. Set up Firebase:

- Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com).
- Enable the Authentication and Firestore services.
- Create a web app and copy the Firebase configuration.
- Paste the configuration in the `src/utilities/Auth/firebase.ts` file.

4. Start the development server:

```shell
npm start
```

5. Open your browser and navigate to [http://localhost:1234](http://localhost:1234) to see the app running.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [PokéAPI](https://pokeapi.co/): The Pokémon data used in this project is sourced from the PokéAPI.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Redux](https://redux.js.org/): A predictable state container for JavaScript applications.
- [Firebase](https://firebase.google.com/): A powerful suite of tools for building and scaling web applications.
- [React Router](https://reactrouter.com/): A library for handling routing in React applications.
- [React Hook Form](https://react-hook-form.com/): A library for form validation and state management.
