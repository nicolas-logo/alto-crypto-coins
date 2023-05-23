# Coins App


## Good practices and nice to have implemented
- Using a provider to save the text searched.
- Debounce to auto-search for coins when stop writing.
- Tests.
- Mapping API object to local object.
- Folder structure prepared for expantion (clientsApi, constants, components, pages, assets)
- Use of constant file for urls prepared for easily adding new ones
- Array and object desctructuring 
- Impelemtation of ES2020 syntax like '?.' for preventing from undefined related errors
- Use of dependency on Coin page's useEffect of searchText to reload coin information in case of surfing on same page with different parameters (switching between BTC and ETH pages)
- Routing to navigate to different pages
- Showing trending coins for default on Home page
- Using react-bootstrap

### What I would have liked to implement
- Pagination of search results but is limited by the API

### Integration with MongoDb
You can save comments on coins on MongoDb by running the API:
https://github.com/nicolas-logo/api-logo
![image](https://github.com/nicolas-logo/crypto-coins/assets/26005281/2d3dd5d1-d9e4-425b-964e-2b5d38522ea3)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Screenshots
![image](https://user-images.githubusercontent.com/26005281/233383185-39383985-dcb9-4a90-a15d-185ce1f75f87.png)

![image](https://user-images.githubusercontent.com/26005281/233383367-50b64381-be8f-42b4-a6ee-da6528c5654d.png)

![image](https://user-images.githubusercontent.com/26005281/233383437-7c283a3f-4030-4801-94b9-b8af21e0f6a9.png)



