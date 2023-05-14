import { DataSource } from "../Datasource";

import type { House, HouseOverview } from "./MaxfriseApiTypes";

export class MaxfriseApi extends DataSource {
  async getHouses(landlord: string): Promise<House[]> {
    return (
      (await this.fetch("/gethouses", {
        method: "GET",
        params: { landlord },
      })) || []
    );
  }

  async getHouseOverView(
    houseid: string,
    user: string
  ): Promise<HouseOverview | undefined> {
    return await this.fetch("/houseoverview", {
      method: "GET",
      params: {
        houseid,
        user: user.replace(/^email#/, ""),
      },
    });
  }
}
