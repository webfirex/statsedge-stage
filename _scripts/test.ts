import { SportApi } from "~/lib/sport-api";

const main = async () => {
  const match = await SportApi.Team.Form.Call({
    id: 742839,
  });

  console.log(JSON.stringify(match, null, 2));
};

void main().then(() => {
  console.log("Done ...");

  process.exit(0);
});
