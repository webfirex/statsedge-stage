import {
  Card,
  Center,
  Container,
  Flex,
  Space,
  Stack,
  Text,
  Title,
  Select,
  Button,
} from "@mantine/core";
import { FadeUpAni } from "~/components/animation/fade-up";
import { LayoutComp } from "~/components/layout";
import { SportSelector } from "~/components/player-page/sports";
import { PathDisplay } from "~/components/pathdisplay";
import { SportInfo } from "~/lib/functions";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import ToolsTable1 from "~/components/tools-page/1";

export default function App() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const searchParams = useSearchParams();

  let sportQ = searchParams.get("m")?.toString();

  if (sportQ === undefined) {
    sportQ = "lol";
  }

  const sport = SportInfo(sportQ);

  if (!sport) {
    return (
      <>
        <Center>
          <Text>Unknown sport</Text>
        </Center>
      </>
    );
  }

  // const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack gap="sm">
            {/* <FadeUpAni>
              <SportSelector
                sport={sport}
                disabled
                setSport={(sport) => {
                  console.log(sport);
                }}
              />
            </FadeUpAni> */}

            <FadeUpAni>
              <SportSelector
                sport={sport}
                disabled
                setSport={(sport) => {
                  console.log(sport);
                }}
              />
            </FadeUpAni>

            <FadeUpAni>
              <PathDisplay
                path={[
                  {
                    text: `Tools`,
                    link: `/tools/1`,
                  },
                ]}
              />
            </FadeUpAni>

            <FadeUpAni>
              <Card
                display={"flex"}
                style={{
                  alignItems: "center",
                  gap: "15px",
                  flexDirection: "row",
                  padding: "30px",
                }}
              >
                <Button
                  bg={"transparent"}
                  style={{
                    border: "1px solid #00acef",
                    boxShadow: "0 0 10px #00acef50",
                  }}
                >
                  <Title order={5} tt={"uppercase"}>
                    Prize Picks
                  </Title>
                </Button>
                <Button bg={"transparent"}>
                  <Title order={5} tt={"uppercase"}>
                    UnderDog
                  </Title>
                </Button>
              </Card>
            </FadeUpAni>

            <FadeUpAni>
              <Flex gap={"xs"} wrap={"wrap"}>
                <Select
                  maw={BigThenMd ? 150 : 100}
                  comboboxProps={{ withinPortal: true }}
                  data={["React", "Angular", "Svelte", "Vue"]}
                  placeholder="All Props"
                  radius={"sm"}
                  bg={"transparent"}
                  // classNames={classes}
                />
                <Select
                  maw={BigThenMd ? 150 : 100}
                  comboboxProps={{ withinPortal: true }}
                  data={["React", "Angular", "Svelte", "Vue"]}
                  placeholder="All Games"
                  radius={"sm"}
                  bg={"transparent"}
                  // classNames={classes}
                />
                <Select
                  maw={BigThenMd ? 150 : 100}
                  comboboxProps={{ withinPortal: true }}
                  data={["React", "Angular", "Svelte", "Vue"]}
                  placeholder="All Players"
                  radius={"sm"}
                  bg={"transparent"}
                  // classNames={classes}
                />
                <Select
                  maw={150}
                  comboboxProps={{ withinPortal: true }}
                  data={["React", "Under", "Svelte", "Vue"]}
                  placeholder="Over/Under"
                  radius={"sm"}
                  bg={"transparent"}
                  // classNames={classes}
                />
                <Select
                  maw={150}
                  comboboxProps={{ withinPortal: true }}
                  data={["React", "Angular", "Svelte", "Vue"]}
                  placeholder="All Maps"
                  radius={"sm"}
                  bg={"transparent"}
                  // classNames={classes}
                />
              </Flex>
            </FadeUpAni>

            <Space />

            <FadeUpAni>
              <ToolsTable1 />
            </FadeUpAni>
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
