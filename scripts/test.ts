import { SportApi } from "~/lib/sport-api";

const main = async () => {
  const match = await SportApi.Custom.Match.Call({
    id: 732265,
  });

  console.log(match);
};

void main().then(() => {
  console.log("Done ...");

  process.exit(0);
});
