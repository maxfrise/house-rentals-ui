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
              phone: "+523121186644",
              name: "Sergio",
            },
          ],
          tenants: [
            {
              name: "Juan",
              phone: "+5212345678",
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
      "/gethouses?landlord=email%23audel91%40gmail.com"
    );
    const houses = await api.getHouses("email#audel91@gmail.com");
    expect(houses[0].landlords[0].name).toEqual("Sergio");
    expect(houses[0].landlords[0].phone).toEqual("+523121186644");
    expect(houses[0].tenants[0].name).toEqual("Juan");
    expect(houses[0].tenants[0].phone).toEqual("+5212345678");
    expect(houses[0].houseId).toEqual("house#clggukphp0000zlw958vz113s");
    expect(houses[0].houseFriendlyName).toEqual("Monte cervino");
    expect(houses[0].landlord).toEqual("email#audel91@gmail.com");
    expect(houses[0].address).toEqual("Monte cervino 137");
    expect(houses[0].details).toEqual("Casa a una cuadra del jardin");
    expect(houses[0].leaseStatus).toEqual("LEASED");
  });

  test("get houseoverview", async (params) => {
    mockResponse(
      {
        house: {
          landlords: [
            {
              name: "Sergio Audel",
              phone: "3121186644",
            },
          ],
          tenants: [
            {
              name: "Yolanda",
              phone: "+150931203388",
            },
          ],
          houseId: "house#clh9njfth00004uw9h47y1lcn",
          houseFriendlyName: "Monte cervino",
          landlord: "email#audel91@gmail.com",
          address: "Monte cervino 137",
          details: "Casa a una cuadra del jardin",
          leaseStatus: "LEASED",
        },
        payments: [
          {
            landlords: [
              {
                name: "Sergio Audel",
                phone: "3121186644",
              },
            ],
            st: "clh9njfth00004uw9h47y1lcn|2023-05-17T00:00:00.000Z|045e99c3-96ef-4e92-90d1-6496aa25fc58",
            houseid: "clh9njfth00004uw9h47y1lcn",
            status: "NOT_DUE",
            tanants: [
              {
                name: "Yolanda",
                phone: "+150931203388",
              },
            ],
            details: [
              {
                amount: "12000",
              },
            ],
            pk: "p#2023-05-17T00:00:00.000Z",
          },
        ],
      },
      "application/json",
      "/houseoverview?houseid=123&user=audel91%40gmail.com"
    );
    const houseOverview = await api.getHouseOverView(
      "123",
      "email#audel91@gmail.com"
    );
    expect(houseOverview?.house).toStrictEqual({
      landlords: [
        {
          name: "Sergio Audel",
          phone: "3121186644",
        },
      ],
      tenants: [
        {
          name: "Yolanda",
          phone: "+150931203388",
        },
      ],
      houseId: "house#clh9njfth00004uw9h47y1lcn",
      houseFriendlyName: "Monte cervino",
      landlord: "email#audel91@gmail.com",
      address: "Monte cervino 137",
      details: "Casa a una cuadra del jardin",
      leaseStatus: "LEASED",
    });
    expect(houseOverview?.payments).toStrictEqual([
      {
        landlords: [
          {
            name: "Sergio Audel",
            phone: "3121186644",
          },
        ],
        st: "clh9njfth00004uw9h47y1lcn|2023-05-17T00:00:00.000Z|045e99c3-96ef-4e92-90d1-6496aa25fc58",
        houseid: "clh9njfth00004uw9h47y1lcn",
        status: "NOT_DUE",
        tanants: [
          {
            name: "Yolanda",
            phone: "+150931203388",
          },
        ],
        details: [
          {
            amount: "12000",
          },
        ],
        pk: "p#2023-05-17T00:00:00.000Z",
      },
    ]);
  });
});
