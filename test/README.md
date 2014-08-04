### Test Setup

> These steps should be completed prior to running tests

Since the SoundCloud API requires a user to authorize an application via user interaction (logging in) to get a code, please follow the steps below to get an oauth token

- Setup an SoundCloud app at https://soundcloud.com/you/apps
- Create an html page at the 'Website of your app' using code similar to that below
```
<a href="https://soundcloud.com/connect?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=non-expiring&response_type=code">click</a>
```
- Launch the page created in the browser and click the link. This should prompt you to authorize your app. 
- Upon successful authorization, you will be redirected to the REDIRECT_URI with the 'code' in the URL the authorization redirected you to
- Once you have a 'code', use the curl command below to obtain a non-expiring oauth token. 
```
curl -X POST "https://api.soundcloud.com/oauth2/token" -F 'client_id=CLIENT_ID' -F 'client_secret=CLIENT_SECRET' -F 'grant_type=authorization_code' -F 'redirect_uri=REDIRECT_URI' -F 'code=CODE_POST_AUTH'
```
- This should return an OAuth token. 
- Copy `config.sample.js` to `config.js` and update it with this OAuth token as well as the app configuration from the SoundCloud App Settings page
- Run `npm test` the main project directory
