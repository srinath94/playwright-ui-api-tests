# Charge Point Installation App (CAse 1)

App to support electricians in setting up a new charge point infrastructure.

CASE 2 The app allows the electricians to inform us about all the installed charge points, using their serial numbers.

The following functionalities are available:
- Visualize list of installed charge points 
- Adding a new charge point using serial number
- Remove a charge point from the installation

The app is composed of 2 components:
- Web application
- REST API

In order to run the app, you need to have nodejs installed.

To run it, execute in the command line:

```bash
$ npm install
$ npm start
```

## Test Scenarios Covered
### UI Test Scenarios
1. Add new Serial Number and verify via UI
    * Adds a new serial number through the UI and verifies its presence on the page.
2. Delete a serial number and verify via UI
    * Deletes a serial number through the UI and verifies its absence on the page.
3. Add new Serial Number and verify if exists via API call
    * Adds a new serial number through the UI and verifies its presence using an API call.
4. Delete a serial number and verify if via get API call
    * Deletes a serial number through the UI and verifies its absence using an API call.

### API Test Scenarios
1. Add a serial number and verify it exists in the GET API response
    * Adds a new serial number via an API call and verifies its presence in the GET API response.
2. Delete serial number and verify it doesn't exist in GET API response
    * Deletes a serial number via an API call and verifies its absence in the GET API response.
3. Verify UI after API actions
    * Adds a serial number via an API call, verifies its presence in the UI, deletes it via an API call, and verifies its absence in the UI.

### Technologies Used
* Playwright
* TypeScript
* Page Object Model (POM)

### Best Practices Implemented
1. Page Object Model (POM)
    * UI interactions are encapsulated in page classes (ChargePointInstallationPage).
    * API interactions are encapsulated in utility classes (ApiUtils).
2. Fixtures
    * Custom fixtures are used to initialize page objects and API utilities, reducing code duplication.
3. Randomized Test Data
    * Random serial numbers are generated for each test to ensure independence and avoid conflicts.
4. Error Handling
    * Proper error handling is implemented for API calls and UI interactions.
5. CI/CD Process
    * Tests are scheduled to run at 8 AM CEST every morning using a YAML configuration file.
    * Test variables are managed through gitHub Actions environments variable option.

### Directory Structure
```
project-root/
├── fixtures/                   # Custom fixtures for Playwright
│   └── ChargePointFixture.ts
├── page/                       # Page objects and API utilities
│   ├── ApiUtils.ts
│   └── ChargePointInstallationPage.ts
├── tests/                      # Test cases
│   └── chargepointTests.spec.ts
├── env/                        # Environment configurations
├── playwright.config.ts        # Playwright configuration
```

### Running Tests
Run all Tests:
```
npx playwright test
```
### Test Results 
![alt text](image.png)

GitHub Actions scheduled job
![alt text](image-1.png)  
