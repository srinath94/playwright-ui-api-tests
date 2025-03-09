import { test as base } from "@playwright/test";
import { ApiUtils } from "../page/ApiUtils";
import { ChargePointInstallationPage } from "../page/ChargePointInstallationPage";

export const test = base.extend<{
  chargePointInstallationPage: ChargePointInstallationPage;
  apiUtils: ApiUtils;
  randomSerialNumber: string;
}>({
  // Fixture for ChargePoint UI page
  chargePointInstallationPage: async ({ page }, use) => {
    const chargePointInstallationPage = new ChargePointInstallationPage(page);
    await use(chargePointInstallationPage);
  },

  // Fixture for chargePoint Api
  apiUtils: async ({ request }, use) => {
    const apiUtils = new ApiUtils(request);
    await use(apiUtils);
  },

  // Fixture for random serial number
  randomSerialNumber: async ({}, use) => {
    const randomSerialNumber = Math.floor(Math.random() * 100000);
    await use(randomSerialNumber.toString());
  },
});
export { expect } from "@playwright/test";
