# SocialXpress

SocialXpress is a social media platform with additional features designed to enhance your social experience. With functionalities inspired by popular platforms like Facebook, SocialXpress goes the extra mile to provide a unique and streamlined user experience.

## Features

### 1. Add and Delete Posts
Easily create and manage your posts. SocialXpress allows users to add new posts and delete existing ones, giving you full control over your content.

### 2. Image Compression
SocialXpress automatically compresses images attached to your posts, ensuring faster load times and efficient use of storage.

### 3. Google Authentication
Enjoy the convenience of logging in with your Google account. SocialXpress integrates Google authentication for a seamless and secure login experience.

### 4. Storage Management
Optimize your storage space with SocialXpress. The platform intelligently manages storage, ensuring efficient use and preventing unnecessary clutter.

### 5. Progress Bar
Keep track of your upload progress with the built-in progress bar. Easily monitor the status of your post uploads for a smoother user experience.

### 6. Logo Image Resizing
Customize your platform's appearance by resizing the logo image. SocialXpress makes it easy to tailor the visual elements to your liking.

### 7. Custom Banner
Personalize your profile or page with a custom banner. Add a unique touch to your SocialXpress presence with the ability to set a custom banner image.

### 8. User Info Page
Get a comprehensive overview of your user information. The User Info page provides insights into your SocialXpress activity, making it easy to manage your profile.

**Key Features:**

* **Post Management:**
    * Create and share text, image, and video posts.
    * Edit and delete existing posts.
    * Compress post images for faster loading and bandwidth optimization.
* **Authentication:**
    * Seamless Google authentication for secure login and account management.
* **Storage:**
    * Utilize cloud storage for efficient data handling and scalability.
* **Progress Bar:**
    * Implement a progress bar to track upload and download processes.
* **Logo and Banner Customization:**
    * Resize and personalize the platform logo for a unique identity.
    * Allow users to add custom banners to their profiles.
* **User Info Page:**
    * Dedicated page showcasing user profile details, posts, and connections.

**Technical Stack (Proposed):**

* Frontend: ReactJS
* Backend: Firebase
* Authentication: Google Firebase
* Storage: Firebase Storage
* Image Compression: React-Image-Resizer


*  **Project Structure:**

socialxpress/
├── src/
│   ├── components/
│   │   ├── Post.js
│   │   ├── Profile.js
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js
│   │   └── UserPage.js
│   ├── services/
│   │   ├── AuthService.js
│   │   └── StorageService.js
│   └── ...
├── public/
│   ├── logo.png
│   └── styles.css
├── package.json
└── README.md
