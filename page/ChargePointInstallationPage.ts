import { Locator, Page } from "@playwright/test";
import { configDotenv } from "dotenv";

configDotenv();

export class ChargePointInstallationPage {
  readonly page: Page;
  readonly title: Locator;
  readonly serialNumberField: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", {
      name: "Charge Point Installation Form",
    });
    this.serialNumberField = page.getByRole("textbox");
    this.addButton = page.getByRole("button", { name: "Add" });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async enterSerialNumber(serialNumber: string) {
    await this.serialNumberField.fill(serialNumber);
  }

  async clickOnaddButton() {
    await this.addButton.click();
  }

  async clickOnXButtontoDelete(serialNumber: string) {
    const listItem = this.page.locator("li").filter({ hasText: serialNumber });
    const deleteButton = listItem.locator("button.list-button");
    await deleteButton.click();
  }

  async verifySerialNumberExistsOnUI(serialNumber: string): Promise<boolean> {
    const listItem = this.page.locator("li").filter({ hasText: serialNumber });
    try {
      // Wait for the element to be visible
      await listItem.waitFor({ state: "visible", timeout: 5000 }); 
      return true;
    } catch (error) {
      return false; 
    }
  }
}
