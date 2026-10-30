import { readFile } from "fs/promises";

enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Yellow = "yellow",
}

function isColor(value: string): value is Color {
  return (Object.values(Color) as string[]).includes(value);
}

class Entity {
  public id: number;
  public color: Color;
  public type: string;

  constructor(id: number, color: string, type: string) {
    this.id = id;

    if (isColor(color)) {
      this.color = color;
    } else {
      throw new Error("invalid color value");
    }

    this.type = type;
  }
}

async function getFileContents(filePath: string): Promise<Entity[]> {
  const fileStr = await readFile(filePath, "utf-8");

  const fileJson = JSON.parse(fileStr);

  if (!Array.isArray(fileJson)) {
    throw new Error("invalid file contents");
  }

  const parsedData: Entity[] = [];

  for (const row of fileJson) {
    parsedData.push(new Entity(row["id"], row["color"], row["type"]));
  }

  return parsedData;
}

function getBlueIDs(data: Entity[]): number[] {
  const answer: number[] = [];

  for (const row of data) {
    if (row.color === Color.Blue) {
      answer.push(row.id);
    }
  }

  return answer;
}

async function main() {
  const filePath = "./data.json";

  const data = await getFileContents(filePath); // return string data with whole file

  console.log(getBlueIDs(data));
}

main();
