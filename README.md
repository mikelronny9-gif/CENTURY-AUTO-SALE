# Century Auto Sales — GitHub Pages + Firebase

## Upload
Upload EVERY file in this folder to the ROOT of the GitHub Pages repository. Do not rename the files and do not put the JPGs in a subfolder.

Required files:
- index.html
- admin.html
- firebase-config.js
- firestore.rules
- style.css
- rav4.jpg
- accord.jpg
- f150.jpg
- bmw330i.jpg
- camaro.jpg
- grand-cherokee.jpg

## Firebase setup
Firebase project: centuryautosales

1. Firebase Console → Authentication → Sign-in method.
2. Enable Anonymous authentication (needed for customer Request to Chat).
3. Enable Email/Password authentication (needed for Dealer Admin).
4. Create the admin user with the email address authorized by firestore.rules.
5. Firebase Console → Firestore Database → create the database if it does not already exist.
6. Firestore Rules → paste the contents of firestore.rules → Publish.

## Admin panel
From the website footer click Dealer Admin Login. It opens admin.html.
The admin panel uses Firebase Email/Password login and then reads customer requests from Firestore.

## Important
The Firebase web configuration in firebase-config.js is intended for the web app; access is protected by Firebase Authentication and Firestore Security Rules. Never put an admin password in the website code.

## GitHub Pages
After uploading the files, commit/push them. Then open the GitHub Pages website. If GitHub Pages was already enabled, wait a minute for the new files to deploy, then hard-refresh the page.
