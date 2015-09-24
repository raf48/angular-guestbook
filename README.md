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
```
npm test
```

## Admin privileges
Use "/admin" to access guestbook administrator role. Admin can delete and/or edit a posted message.

## Note
Messages are fetched on startup from "messages.json" file and are kept in memory throughout the lifetime of the application.
If you want posted/edited messages to be saved to an external file, just uncomment appropriate commented lines in "api.js" file.
