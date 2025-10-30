# AnuuVT-Core

AnuuVT-Core is a functional application that brings Anuu (from ANUSET_189) to life as a VTuber avatar capable of reading and responding to Twitch chat in real time, while allowing users to load their own .vrm models.

This is a fully client-side application that runs in the browser, designed to be hosted on a static web server like GitHub Pages.

## Getting Started

To get started with AnuuVT-Core, follow these steps:

### 1. Configuration

Before you can run the application, you need to configure your Twitch channel.

1.  Open the `src/main.js` file.
2.  Find the following line:
    ```javascript
    const TWITCH_CHANNEL = 'YOUR_TWITCH_CHANNEL_HERE';
    ```
3.  Replace `'YOUR_TWITCH_CHANNEL_HERE'` with your Twitch channel name (e.g., `'mychannel'`).

### 2. Running the Application

Because this application fetches data files (`.json`, `.vrm`), it must be run from a web server to avoid browser security errors (CORS). You cannot simply open the `index.html` file from your local file system.

The easiest way to do this is to use Python's built-in HTTP server.

1.  Make sure you have Python installed on your system.
2.  Open a terminal or command prompt in the root directory of the project (the same directory where `index.html` is located).
3.  Run the following command:

    ```bash
    python3 -m http.server
    ```

    If you have an older version of Python, you might need to use:

    ```bash
    python -m SimpleHTTPServer
    ```

4.  Once the server is running, you will see a message like `Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)`.
5.  Open your web browser and navigate to:

    [http://localhost:8000](http://localhost:8000)

You should now see the AnuuVT-Core application running in your browser, with the VRM model loaded and connected to your Twitch chat.
