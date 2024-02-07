import { DOTAItems } from "~/lib/parser";

const main = async () => {
  const match = await DOTAItems();

  console.log(match);
};

void main().then(() => {
  console.log("Done ...");

  process.exit(0);
});
