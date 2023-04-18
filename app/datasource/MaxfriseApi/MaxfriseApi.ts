import { DataSource } from "../Datasource";

import type { House } from "./MaxfriseApiTypes";

export class MaxfriseApi extends DataSource {
  constructor(apiUrl: string) {
    super(apiUrl);
  }

  async getHouses(landLord: string): Promise<House[]> {
    return (
      (await this.fetch("/gethouses", {
        method: "GET",
        params: { landLord },
      })) || []
    );
  }
}
