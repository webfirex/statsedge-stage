import { SportApi } from "~/lib/sport-api";

const main = async () => {
  const match = await SportApi.Custom.Match.Call({
    id: 732238,
  });

  console.log(JSON.stringify(match, null, 2));
};

void main().then(() => {
  console.log("Done ...");

  process.exit(0);
});
