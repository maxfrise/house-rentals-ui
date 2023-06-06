import { DataSource } from "../Datasource";

import type {
  House,
  HouseOverview,
  InitLeaseRequest,
  PayHouseRequest
} from "./MaxfriseApiTypes";

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

  async createHouse(house: House): Promise<void> {
    return await this.fetch("/createhouse", {
      method: "POST",
      body: house,
    });
  }

  async initlease(
    initLeaseRequest: InitLeaseRequest
  ): Promise<{ statusCode: number } | undefined> {
    return await this.fetch("/initlease", {
      method: "POST",
      body: initLeaseRequest,
    });
  }

  async payHouse(payHouse: PayHouseRequest): Promise<{ statusCode: string, message: string } | undefined> {
    return await this.fetch("/collectpayment", {
      method: "PUT",
      body: {
        pk: payHouse.pk,
        sk: payHouse.st,
        details: [
          {
            method: payHouse.method,
            amount: payHouse.amount,
            comments: payHouse.details,
          },
        ],
      },
    });
  }
}
