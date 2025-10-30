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

### 2. Deployment to GitHub Pages

This repository is configured with a GitHub Actions workflow that automatically deploys the application to GitHub Pages.

**To enable GitHub Pages and see your live site:**

1.  **Go to your repository on GitHub.**
2.  Click on the **"Settings"** tab.
3.  In the left sidebar, click on **"Pages"**.
4.  Under "Build and deployment", in the "Source" section, select **"GitHub Actions"**.

Once you have enabled GitHub Pages, every time you push a change to your `main` branch, the workflow will automatically run and deploy your website. You will be able to see your live AnuuVT-Core application at the URL provided in the "Pages" settings (it will look something like `https://<your-username>.github.io/<your-repository-name>/`).

### 3. Running Locally (Optional)

If you want to run the application locally for testing, you can use a simple web server.

1.  Make sure you have Python installed on your system.
2.  Open a terminal or command prompt in the root directory of the project (the same directory where `index.html` is located).
3.  Run the following command:

    ```bash
    python3 -m http.server
    ```

4.  Open your web browser and navigate to:

    [http://localhost:8000](http://localhost:8000)
