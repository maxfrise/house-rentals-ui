import { DataSource } from "./Datasource";
import nock from "nock";

describe("Datasource", () => {
  const apiUrl = "https://api.maxfrise.com";

  function mockResponse(
    response: any,
    contentType: string,
    path: string = "/gethouses"
  ) {
    return nock(apiUrl)
      .get(path)
      .reply(200, response, { "Content-Type": contentType });
  }

  test("fetches json", async () => {
    mockResponse({ houses: 4 }, "application/json");
    const dataSource = new DataSource(apiUrl);
    const result = await dataSource.fetch("/gethouses", { method: "GET" });
    expect(result).toEqual({ houses: 4 });
  });

  test("fetches text", async () => {
    mockResponse("test", "text/plain", "/getText");
    const dataSource = new DataSource(apiUrl);
    const result = await dataSource.fetch("/getText", { method: "GET" });
    expect(result).toEqual("test");
  });

  test("interpolates query params", async () => {
    mockResponse(
      { landlord: "sergio" },
      "application/json",
      "/path?houseid=123"
    );
    const dataSource = new DataSource(apiUrl);
    const result = await dataSource.fetch(`/path`, {
      method: "GET",
      params: { houseid: "123" },
    });
    expect(result).toEqual({ landlord: "sergio" });
  });

  test("interpolates path variables", async () => {
    mockResponse(
      { landlord: "sergio" },
      "application/json",
      "/path/montecervino"
    );
    const dataSource = new DataSource(apiUrl);
    const result = await dataSource.fetch(`/path/:houseid`, {
      method: "GET",
      params: { houseid: "montecervino" },
    });
    expect(result).toEqual({ landlord: "sergio" });
  });

  test("rejects promise on errors", async () => {
    nock(apiUrl).get("/endpoint-with-error").reply(500);
    const dataSource = new DataSource(apiUrl);
    await expect(
      dataSource.fetch("endpoint-with-error", { method: "GET" })
    ).rejects.toEqual("HTTP Error Response: 500");
  });
});
