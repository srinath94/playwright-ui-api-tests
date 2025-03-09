import { APIRequestContext, expect } from "@playwright/test";
import { configDotenv } from "dotenv";

configDotenv();

export class ApiUtils {
  readonly requestContext: APIRequestContext;
  readonly apiUrl: string;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
    this.apiUrl = process.env.API_URL!;
  }

  async createChargePoint(serialNumber: string) {
    const response = await this.requestContext.post(
      `${this.apiUrl}/charge-point`,
      {
        data: {
          serialNumber: serialNumber,
        },
      }
    );
    if (!response.ok()) {
      throw new Error(
        `Failed to create a new charge point: ${await response.text()}`
      );
    }
    return response;
  }

  async deleteChargePoint(serialNumber: string) {
    const serialId = await this.getSerialId(serialNumber);
    const response = await this.requestContext.delete(
      `${this.apiUrl}/charge-point/${serialId}`
    );
    if (!response.ok()) {
      throw new Error(
        `Failed to delete charge point: ${await response.text()}`
      );
    }
    return response;
  }

  async getAllChargePoints() {
    const response = await this.requestContext.get(
      `${this.apiUrl}/charge-point`
    );
    if (!response.ok()) {
      throw new Error(`Failed to get charge point: ${await response.text()}`);
    }
    return response;
  }

  /**
   * Fetches the ID of a charge point based on its serial number.
   * @param serialNumber - The serial number of the charge point to search for.
   * @returns The ID of the charge point if found.
   * @throws An error if the serial number is not found in the GET response.
   **/
  async getSerialId(serialNumber: string) {
    // Fetch all charge points
    const response = await this.getAllChargePoints();
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    //Find the charge point with the matching serial number
    const chargePoint = responseData.find(
      (item: { serialNumber: string }) => item.serialNumber === serialNumber
    );
    if (chargePoint) {
      return chargePoint.id;
    } else {
      throw new Error(
        `Serial number ${serialNumber} not found in the GET response.`
      );
    }
  }

  /**
   * Verifies if a given serial number exists in the GET API response.
   * @param expectedSerialNumber - The serial number to check for in the API response.
   * @returns `true` if the serial number exists in the response, otherwise `false`.
   **/
  async verifySerialNumberExistsInApi(expectedSerialNumber: string) {
    const response = await this.getAllChargePoints();
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    // Extract serial numbers
    const serialNumbers = responseData.map(
      (item: { serialNumber: string }) => item.serialNumber
    );
    // Check if the expected serial number exists
    const exists: Boolean = serialNumbers.includes(expectedSerialNumber);
    return exists;
  }
}
