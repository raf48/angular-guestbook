# Angular Guestbook
Simple Angular based Guestbook with administration features. Built on Express and Jade templating engine.

## Installation & Execution

Clone this repository to your favorite folder and run the following script to download project dependencies

```
npm install
```

To start the app on http://localhost:3000 run the following
```
npm start
```

To run unit tests with karma

**Note (2015-09-28):** After last code review unit tests don't work. Gonna fix that asap.
```
npm test
```

## Admin privileges
Use "Login" button in the top right corner to login with administrator role (username: admin / password: admin). Guestbook admin has the right to delete and/or edit a previous posted message. Modification date is added to each edited message.

## Note
Messages are fetched on startup from "messages.json" file and are kept in memory throughout the lifetime of the application.
If you want posted/edited messages to be saved to an external file, just uncomment appropriate commented lines in "api.js" file.

## Update (2015-09-28)
- Switched routing from "angular-route" to " angular-ui-router". Now instead of URL-routes we're using states.
- Added authentication service. You can now login as administrator to edit/delete messages.
