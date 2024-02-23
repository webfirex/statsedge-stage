import { PlayerInfoTest } from "~/lib/sport-api/player/combine-test";

const main = async () => {
  await PlayerInfoTest({ id: 1 });
};

void main().then(() => {
  console.log("Done ...");

  process.exit(0);
});
