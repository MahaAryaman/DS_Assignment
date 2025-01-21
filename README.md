# React Native Project

This React Native project consists of three screens:

1. **Home Screen**
2. **Login Screen**
3. **Profile Screen**

## Screens Overview

### Home Screen

- The Home Screen displays a login button in the top-right corner.
- If the user is not logged in, the button displays "Login."
- Clicking the login button navigates the user to the **Login Screen.**
- Once the user is logged in, the button text changes to "Profile," allowing access to the **Profile Screen.**

### Login Screen

- The Login Screen contains two input fields:
  - **Email**: Validates using a regular expression to ensure proper email format.
  - **Password**: Requires a minimum of 3 characters and performs empty field validation.
- The entered data is:
  - Sent to an API hosted on [MockAPI.io](https://mockapi.io/) for login simulation.
  - Encrypted using **CryptoJS** before transmission.
- The encrypted data is also saved in **Async Storage**.
- Upon successful login, the user is redirected to the **Home Screen.**

### Profile Screen

- The Profile Screen retrieves and displays the user’s encrypted data from **Async Storage.**
- The user can log out from the Profile Screen, which clears the stored data and redirects back to the **Home Screen.**

## Key Features

- **API Integration**: Utilizes [MockAPI.io](https://mockapi.io/) for simulating login requests.
- **Data Encryption**: Ensures secure data transmission and storage using **CryptoJS.**
- **Async Storage**: Stores encrypted user data locally for retrieval on the Profile Screen.
- **Form Validation**:
  - Email must be in a valid format.
  - Password must be at least 3 characters long.
  - Both fields require non-empty input.

## Technologies Used

- **React Native**: Framework for building the application.
- **CryptoJS**: Library for encrypting user data.
- **Async Storage**: Local storage solution for React Native.
- **MockAPI.io**: Mock API service for backend simulation.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-folder>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```
   or
   ```bash
   npx react-native run-android
   ```
   ```bash
   npx react-native run-ios
   ```

## API Integration

- **Endpoint**: Replace `<MockAPI Endpoint>` with your MockAPI.io endpoint in the code.
- Example:
  ```js
  const API_URL = 'https://678f609d49875e5a1a919410.mockapi.io/demo/login';
  ```

## Usage

1. Launch the app.
2. On the **Home Screen**, click the login button to navigate to the **Login Screen.**
3. Enter a valid email and password, then submit the form.
4. After logging in, the **Home Screen** button will change to "Profile."
5. Navigate to the **Profile Screen** to view your details and log out.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

