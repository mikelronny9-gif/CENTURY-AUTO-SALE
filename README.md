# Century Auto Sales — GitHub + Firebase + Smartsupp

Request to Chat is stored in Firebase Firestore and appears in admin.html.
Live Chat is separate and uses Smartsupp.

Before using the admin board:
1. Firebase Console -> Authentication -> Sign-in method -> enable Email/Password.
2. Create the admin user with the dealer admin email/password.
3. Firestore -> Rules -> paste firestore.rules and Publish.
4. Upload these files to GitHub Pages.

Do not put an admin password in GitHub. The Firebase web configuration is included in firebase-config.js.

The homepage also includes a mobile-friendly bottom navigation and expanded dark footer inspired by the provided reference design.


## Notifications + customer chat
- Admin board listens to Firestore in real time.
- New Request to Chat triggers an in-page badge count, sound, and optional browser notification.
- Click **Enable Notifications** in the admin board once.
- Customers get a Request Chat box after submitting and can continue messaging.
- Admin replies appear in the customer chat box in real time.

### Firebase Authentication requirement
Enable BOTH:
1. Email/Password (for the dealer admin).
2. Anonymous (for website visitors who use Request to Chat).

The included `firestore.rules` uses the anonymous user's Firebase UID to protect customer requests.
