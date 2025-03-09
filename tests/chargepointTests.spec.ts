import { expect, test } from "../fixtures/ChargePointFixture";

test.describe("UI Tests", () => {
  test("Add new Serial Number and verify if exists via API call", async ({
    chargePointInstallationPage,
    apiUtils,
    randomSerialNumber, 
  }) => {
    await chargePointInstallationPage.goto();
    await expect(chargePointInstallationPage.title).toBeVisible();
    await chargePointInstallationPage.enterSerialNumber(randomSerialNumber);
    await chargePointInstallationPage.clickOnaddButton();

    // Verify the serial number exists in the GET API response
    expect(
      await apiUtils.verifySerialNumberExistsInApi(randomSerialNumber)
    ).toBe(true);
  });

  test("Add new Serial Number and verify via UI", async ({
    chargePointInstallationPage,
    randomSerialNumber, // Use the random serial number fixture
  }) => {
    await chargePointInstallationPage.goto();
    await expect(chargePointInstallationPage.title).toBeVisible();
    await chargePointInstallationPage.enterSerialNumber(randomSerialNumber);
    await chargePointInstallationPage.clickOnaddButton();
    await chargePointInstallationPage.page.reload({waitUntil:"load"});

    // Verify the serial number exists on the UI
    expect(
      await chargePointInstallationPage.verifySerialNumberExistsOnUI(
        randomSerialNumber
      )
    ).toBe(true);
  });

  test("Delete a serial number and verify if via get API call", async ({
    chargePointInstallationPage,
    apiUtils,
    randomSerialNumber, // Use the random serial number fixture
  }) => {
    await chargePointInstallationPage.goto();
    await expect(chargePointInstallationPage.title).toBeVisible();
    await chargePointInstallationPage.enterSerialNumber(randomSerialNumber);
    await chargePointInstallationPage.clickOnaddButton();
    await chargePointInstallationPage.clickOnXButtontoDelete(
      randomSerialNumber
    );

    // Verify the serial number no longer exists in the GET API response
    expect(
      await apiUtils.verifySerialNumberExistsInApi(randomSerialNumber)
    ).toBe(false);
  });

  test("Delete a serial number and verify via UI", async ({
    chargePointInstallationPage,
    randomSerialNumber, // Use the random serial number fixture
  }) => {
    await chargePointInstallationPage.goto();
    await expect(chargePointInstallationPage.title).toBeVisible();
    await chargePointInstallationPage.enterSerialNumber(randomSerialNumber);
    await chargePointInstallationPage.clickOnaddButton();
    await chargePointInstallationPage.clickOnXButtontoDelete(
      randomSerialNumber
    );
    await chargePointInstallationPage.page.reload({waitUntil:"load"});

    // Verify the serial number no longer exists on the UI
    expect(
      await chargePointInstallationPage.verifySerialNumberExistsOnUI(
        randomSerialNumber
      )
    ).toBe(false);
  });
});

test.describe("API Tests", () => {
  test("Add a serial number and verify it exists in the GET API response", async ({
    apiUtils,
    randomSerialNumber, // Use the random serial number fixture
  }) => {
    const response = await apiUtils.createChargePoint(randomSerialNumber);
    expect(response.status()).toBe(201);
    expect(
      await apiUtils.verifySerialNumberExistsInApi(randomSerialNumber)
    ).toBe(true);
  });

  test("Delete serial number and verify it doesn't exist in GET API response", async ({
    apiUtils,
    randomSerialNumber, // Use the random serial number fixture
  }) => {
    const postResponse = await apiUtils.createChargePoint(randomSerialNumber);
    expect(postResponse.status()).toBe(201);
    const deleteResponse = await apiUtils.deleteChargePoint(randomSerialNumber);
    expect(deleteResponse.status()).toBe(204);
    expect(
      await apiUtils.verifySerialNumberExistsInApi(randomSerialNumber)
    ).toBe(false);
  });

  test("Verify UI after API actions", async ({
    chargePointInstallationPage,
    apiUtils,
    page,
    randomSerialNumber, // Use the random serial number fixture
  }) => {
    const postResponse = await apiUtils.createChargePoint(randomSerialNumber);
    expect(postResponse.status()).toBe(201);

    await chargePointInstallationPage.goto();
    await expect(chargePointInstallationPage.title).toBeVisible();
    expect(
      await chargePointInstallationPage.verifySerialNumberExistsOnUI(
        randomSerialNumber
      )
    ).toBe(true);

    const deleteResponse = await apiUtils.deleteChargePoint(randomSerialNumber);
    expect(deleteResponse.status()).toBe(204);
    await page.reload();
    expect(
      await chargePointInstallationPage.verifySerialNumberExistsOnUI(
        randomSerialNumber
      )
    ).toBe(false);
  });
});
