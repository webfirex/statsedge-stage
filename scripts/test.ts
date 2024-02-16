import { SportApi } from "~/lib/sport-api";

const main = async () => {
  const match = await SportApi.PickBan.Maps.Call({ id: 732486 });

  console.log(JSON.stringify(match, null, 2));
};

void main().then(() => {
  console.log("Done ...");

  process.exit(0);
});
