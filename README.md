# Bagbag Cemetery Application Documentation

## About

Bagbag Cemetery application is a robust PWA map navigation system built with
modern web technologies, ensuring a seamless and interactive user experience.
The combination of SvelteKit, GeoJSON, and MapTiler SDK allows for the creation
of a custom map tailored to the needs of Bagbag Cemetery. Deploying on Vercel
ensures efficient and reliable hosting with easy maintenance and updates. The
PWA features further enhance user engagement by a native app-like experience.

## Technical Requirements

1. **Development Environment:**
   - Node.js (v20 or higher)
   - SvelteKit
   - Vercel CLI (for deployment)

2. **Dependencies:**
   - SvelteKit framework
   - MapTiler SDK for JavaScript (Typescript)
   - GeoJSON data for custom map
   - Vercel for deployment
   - Shadcn for UI

3. **PWA Requirements:**
   - HTTPS support
   - Web App Manifest

4. **Browsers:**
   - Modern web browsers (latest versions of Chrome, Firefox, Safari, Edge)

## Technical Implementation

### Application Structure

- **SvelteKit Framework:** Utilized for building the frontend application with
  reactive components and a streamlined development experience.
- **MapTiler SDK for JavaScript:** Integrated to display the custom map created
  with GeoJSON. Provides various map functionalities and customization options.
- **GeoJSON:** Custom GeoJSON file containing geographical data specific to
  Bagbag Cemetery. This file is used to render the map within the application.

### PWA Features

- **Web App Manifest:** Configured to include metadata such as the app name,
  icons, and theme color to enhance the native app experience.
- **HTTPS:** Ensured for secure communication and to meet PWA requirements.

### Workflow

1. **Development:**
   - Install necessary dependencies and set up the SvelteKit project.
   - Integrate the MapTiler SDK into the SvelteKit application.
   - Load and display the custom GeoJSON map within the application.
   - Implement PWA features including the Web App Manifest.
   - Implement navigation and interaction features on the map.
   - Implement database management for deceased individual information.

2. **Deployment:**
   - Use Vercel CLI to deploy the SvelteKit application to Vercel.
   - Ensure continuous deployment for seamless updates and maintenance.

### Map Features

- **Custom Map Display:** Utilizes GeoJSON data to render a detailed and
  interactive map of Bagbag Cemetery.
- **Navigation System:** Provides navigation functionalities to help users find
  specific locations within the cemetery.
- **Responsive Design:** Ensures the application is accessible and functional
  across various devices and screen sizes.

### Integration Points

- **GeoJSON Integration:** The GeoJSON file is integrated directly into the
  MapTiler SDK to render the custom map.
- **MapTiler SDK:** Provides essential map functionalities, including zooming,
  panning, and marker placement.

### PWA Implementation

- **Web App Manifest:** Configure the manifest file with essential metadata to
  define the application's appearance and behavior when installed.
- **HTTPS:** Deploy the application on Vercel to ensure it runs over HTTPS.

### Deployment Process

1. **Prepare the SvelteKit project for deployment.**
2. **Use Vercel CLI to deploy the application:**
   - Connect the project to a Vercel account.
   - Configure project settings (e.g., environment variables, build settings).
   - Deploy the application and verify successful deployment.

### Maintenance and Updates

- **Continuous Deployment:** Ensure the application is set up for continuous
  deployment to automatically apply updates and bug fixes.
- **Monitoring and Logging:** Implement monitoring and logging to track
  application performance and user interactions for ongoing improvements.
