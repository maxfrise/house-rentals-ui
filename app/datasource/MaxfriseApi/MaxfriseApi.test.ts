import { MaxfriseApi } from "./MaxfriseApi";
import nock from "nock";

describe("MaxfriseApi", () => {
  const apiUrl = "https://api.maxfrise.com";
  const api = new MaxfriseApi(apiUrl);

  function mockResponse(
    response: any,
    contentType: string,
    path: string = "/gethouses"
  ) {
    return nock(apiUrl)
      .get(path)
      .reply(200, response, { "Content-Type": contentType });
  }


  test("get houses", async () => {
    mockResponse(
      [
        {
          landlords: [
            {
              landlordPhone: "+523121186644",
              landlordName: "Sergio",
            },
          ],
          tenants: [
            {
              tenantName: "Juan",
              tenantPhone: "+5212345678",
            },
          ],
          houseId: "house#clggukphp0000zlw958vz113s",
          houseFriendlyName: "Monte cervino",
          landlord: "email#audel91@gmail.com",
          address: "Monte cervino 137",
          details: "Casa a una cuadra del jardin",
          leaseStatus: "LEASED",
        },
      ],
      "application/json",
      "/gethouses?landLord=email%2523audel91%2540gmail.com"
    );
    const houses = await api.getHouses("email#audel91@gmail.com");
    expect(houses[0].landlords[0].landlordName).toEqual("Sergio");
    expect(houses[0].landlords[0].landlordPhone).toEqual("+523121186644");
    expect(houses[0].tenants[0].tenantName).toEqual("Juan");
    expect(houses[0].tenants[0].tenantPhone).toEqual("+5212345678");
    expect(houses[0].houseId).toEqual("house#clggukphp0000zlw958vz113s");
    expect(houses[0].houseFriendlyName).toEqual("Monte cervino");
    expect(houses[0].landlord).toEqual("email#audel91@gmail.com");
    expect(houses[0].address).toEqual("Monte cervino 137");
    expect(houses[0].details).toEqual("Casa a una cuadra del jardin");
    expect(houses[0].leaseStatus).toEqual("LEASED");
  });
});
