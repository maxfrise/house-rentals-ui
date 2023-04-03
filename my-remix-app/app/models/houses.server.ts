import arc from "@architect/functions";
import cuid from "cuid";

import type { User } from "./user.server";

export type House = {
  id: ReturnType<typeof cuid>;
  userId: User["id"];
  houseKey: string;
  description: string;
};

type HouseItem = {
  pk: User["id"];
  sk: `house#${House["id"]}`;
};

const skToId = (sk: HouseItem["sk"]): House["id"] => sk.replace(/^house#/, "");
const idToSk = (id: House["id"]): HouseItem["sk"] => `house#${id}`;

export async function getHouse({
  id,
  userId,
}: Pick<House, "id" | "userId">): Promise<House | null> {
  const db = await arc.tables();

  const result = await db.house.get({ pk: userId, sk: idToSk(id) });
  
  if (result) {
    return {
      userId: result.pk,
      id: result.sk,
      houseKey: result.houseKey,
      description: result.description,
    };
  }
  return null;
}

export async function getHouseListItems({
  userId,
}: Pick<House, "userId">): Promise<Array<Pick<House, "id" | "description" | "houseKey">>> {
  const db = await arc.tables();

  const result = await db.house.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });
  
  return result.Items.map((n: any) => ({
    description: n.description,
    houseKey: n.houseKey,
    id: skToId(n.sk),
  }));
}

export async function createHouse({
  houseKey,
  description,
  userId,
}: Pick<House, "houseKey" | "description" | "userId">): Promise<House> {
  const db = await arc.tables();

  const result = await db.house.put({
    pk: userId,
    sk: idToSk(cuid()),
    houseKey: houseKey,
    description: description,
  });
  
  return {
    id: skToId(result.sk),
    userId: result.pk,
    houseKey: result.houseKey,
    description: result.description,
  };
}

// export async function deleteNote({ id, userId }: Pick<Note, "id" | "userId">) {
//   const db = await arc.tables();
//   return db.note.delete({ pk: userId, sk: idToSk(id) });
// }
