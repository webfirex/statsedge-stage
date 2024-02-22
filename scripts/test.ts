
import { PlayerStatsTest } from "~/lib/sport-api/player/stats-test";

const main = async () => {
  const match = await PlayerStatsTest.Call({
    id: 1,
  });

  console.log(match);
};

void main().then(() => {
  console.log("Done ...");

  process.exit(0);
});
