import { SportApi } from "~/lib/sport-api";

const main = async () => {
  const match = await SportApi.Fixtures.Get.Call({
    id: 742804,
  });

  console.log(match?.maps.csgo);
};

void main().then(() => {
  console.log("Done ...");

  process.exit(0);
});
