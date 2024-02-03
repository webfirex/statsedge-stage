import {
  Image,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Space,
  Stack,
  Text,
  Title,
  Group,
  CopyButton,
  Button,
} from "@mantine/core";
import { FadeUpAni } from "~/components/animation/fade-up";
import { LayoutComp } from "~/components/layout";
import { PathDisplay } from "~/components/pathdisplay";
import { SportInfo } from "~/lib/functions";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { AdBanner } from "~/components/player-page/ad-banner";
import { useSearchParams } from "next/navigation";

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
              <AdBanner />
            </FadeUpAni>

            <FadeUpAni>
              <PathDisplay
                path={[
                  {
                    text: `Bonuses`,
                    link: `/bonuses`,
                  },
                ]}
              />
            </FadeUpAni>

            <FadeUpAni>
              <Group
                my={"md"}
                display={"flex"}
                justify="center"
                align="center"
                pos={"relative"}
              >
                <Title
                  order={BigThenMd ? 3 : 5}
                  ta={"center"}
                  display={"flex"}
                  p={"20px 70px"}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: BigThenMd ? "15px" : "15px",
                  }}
                >
                  <Text
                    span
                    inherit
                    c="yellow"
                    td="underline"
                    style={{
                      textShadow: "0px 0px 30px var(--mantine-color-yellow-9)",
                    }}
                    ta={"center"}
                  >
                    Fantasy Promo codes
                  </Text>
                  Bonuses & Offers
                </Title>
                <Image
                  src={"/coins.png"}
                  alt="coins"
                  pos={"absolute"}
                  maw={"650"}
                />
              </Group>
            </FadeUpAni>

            <Space />

            <Grid columns={10}>
              <Grid.Col span={{ base: 10, md: 5 }}>
                <FadeUpAni>
                  <Card style={{ border: "1px solid #494949" }}>
                    <Flex gap={"sm"}>
                      <Image
                        src={"./blur-bg-1.png"}
                        alt="image"
                        w={BigThenMd ? "100" : "100"}
                        h={BigThenMd ? "100" : "100"}
                        radius={"15"}
                      />
                      <Flex
                        direction={"column"}
                        gap={BigThenMd ? "10px" : "5px"}
                      >
                        <Flex
                          justify={BigThenMd ? "flex-start" : "space-between"}
                          align={"center"}
                          gap={"10px"}
                        >
                          <Title order={5}>Betr Picks</Title>
                          <Text
                            fz={"xs"}
                            bg={"#0C3D1D"}
                            style={{
                              padding: "5px 15px",
                              borderRadius: "20px",
                            }}
                          >
                            $500
                          </Text>
                        </Flex>
                        <Text fz={BigThenMd ? "sm" : "xs"} opacity={"0.7"}>
                          Get your 1st deposit matched 100% up to $500 in Bonus
                          Credits, with Promo code StatsEdge
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      justify={BigThenMd ? "space-between" : "flex-start"}
                      direction={BigThenMd ? "row" : "column"}
                      pt={"md"}
                      align={BigThenMd ? "center" : "start"}
                      gap={BigThenMd ? "0" : "5px"}
                    >
                      <Text fz={"sm"} opacity={"0.7"}>
                        Copy & Paste this code at Betr Picks
                      </Text>
                      <Flex
                        gap={"10px"}
                        justify={BigThenMd ? "center" : "space-between"}
                      >
                        <Flex
                          align={"center"}
                          style={{
                            border: "1px solid #6A8BFF",
                            borderRadius: "10px",
                          }}
                        >
                          <Text fz={"xs"} px={"10px"} fw={"bold"}>
                            StatsEdge
                          </Text>
                          <CopyButton value="StatsEdge">
                            {({ copied, copy }) => (
                              <Button
                                fz={"xs"}
                                p={"xs"}
                                color={copied ? "teal" : "#223164"}
                                onClick={copy}
                              >
                                {copied ? "Copied" : "Copy"}
                              </Button>
                            )}
                          </CopyButton>
                        </Flex>
                        <Button bg={"#223164"}>Claim $500</Button>
                      </Flex>
                    </Flex>
                  </Card>
                </FadeUpAni>
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 5 }}>
                <FadeUpAni>
                  <Card style={{ border: "1px solid #494949" }}>
                    <Flex gap={"sm"}>
                      <Image
                        src={"./blur-bg-1.png"}
                        alt="image"
                        w={BigThenMd ? "100" : "100"}
                        h={BigThenMd ? "100" : "100"}
                        radius={"15"}
                      />
                      <Flex
                        direction={"column"}
                        gap={BigThenMd ? "10px" : "5px"}
                      >
                        <Flex
                          justify={BigThenMd ? "flex-start" : "space-between"}
                          align={"center"}
                          gap={"10px"}
                        >
                          <Title order={5}>Betr Picks</Title>
                          <Text
                            fz={"xs"}
                            bg={"#0C3D1D"}
                            style={{
                              padding: "5px 15px",
                              borderRadius: "20px",
                            }}
                          >
                            $500
                          </Text>
                        </Flex>
                        <Text fz={BigThenMd ? "sm" : "xs"} opacity={"0.7"}>
                          Get your 1st deposit matched 100% up to $500 in Bonus
                          Credits, with Promo code StatsEdge
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      justify={BigThenMd ? "space-between" : "flex-start"}
                      direction={BigThenMd ? "row" : "column"}
                      pt={"md"}
                      align={BigThenMd ? "center" : "start"}
                      gap={BigThenMd ? "0" : "5px"}
                    >
                      <Text fz={"sm"} opacity={"0.7"}>
                        Copy & Paste this code at Betr Picks
                      </Text>
                      <Flex
                        gap={"10px"}
                        justify={BigThenMd ? "center" : "space-between"}
                      >
                        <Flex
                          align={"center"}
                          style={{
                            border: "1px solid #6A8BFF",
                            borderRadius: "10px",
                          }}
                        >
                          <Text fz={"xs"} px={"10px"} fw={"bold"}>
                            StatsEdge
                          </Text>
                          <CopyButton value="StatsEdge">
                            {({ copied, copy }) => (
                              <Button
                                fz={"xs"}
                                p={"xs"}
                                color={copied ? "teal" : "#223164"}
                                onClick={copy}
                              >
                                {copied ? "Copied" : "Copy"}
                              </Button>
                            )}
                          </CopyButton>
                        </Flex>
                        <Button bg={"#223164"}>Claim $500</Button>
                      </Flex>
                    </Flex>
                  </Card>
                </FadeUpAni>
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 5 }}>
                <FadeUpAni>
                  <Card style={{ border: "1px solid #494949" }}>
                    <Flex gap={"sm"}>
                      <Image
                        src={"./blur-bg-1.png"}
                        alt="image"
                        w={BigThenMd ? "100" : "100"}
                        h={BigThenMd ? "100" : "100"}
                        radius={"15"}
                      />
                      <Flex
                        direction={"column"}
                        gap={BigThenMd ? "10px" : "5px"}
                      >
                        <Flex
                          justify={BigThenMd ? "flex-start" : "space-between"}
                          align={"center"}
                          gap={"10px"}
                        >
                          <Title order={5}>Betr Picks</Title>
                          <Text
                            fz={"xs"}
                            bg={"#0C3D1D"}
                            style={{
                              padding: "5px 15px",
                              borderRadius: "20px",
                            }}
                          >
                            $500
                          </Text>
                        </Flex>
                        <Text fz={BigThenMd ? "sm" : "xs"} opacity={"0.7"}>
                          Get your 1st deposit matched 100% up to $500 in Bonus
                          Credits, with Promo code StatsEdge
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      justify={BigThenMd ? "space-between" : "flex-start"}
                      direction={BigThenMd ? "row" : "column"}
                      pt={"md"}
                      align={BigThenMd ? "center" : "start"}
                      gap={BigThenMd ? "0" : "5px"}
                    >
                      <Text fz={"sm"} opacity={"0.7"}>
                        Copy & Paste this code at Betr Picks
                      </Text>
                      <Flex
                        gap={"10px"}
                        justify={BigThenMd ? "center" : "space-between"}
                      >
                        <Flex
                          align={"center"}
                          style={{
                            border: "1px solid #6A8BFF",
                            borderRadius: "10px",
                          }}
                        >
                          <Text fz={"xs"} px={"10px"} fw={"bold"}>
                            StatsEdge
                          </Text>
                          <CopyButton value="StatsEdge">
                            {({ copied, copy }) => (
                              <Button
                                fz={"xs"}
                                p={"xs"}
                                color={copied ? "teal" : "#223164"}
                                onClick={copy}
                              >
                                {copied ? "Copied" : "Copy"}
                              </Button>
                            )}
                          </CopyButton>
                        </Flex>
                        <Button bg={"#223164"}>Claim $500</Button>
                      </Flex>
                    </Flex>
                  </Card>
                </FadeUpAni>
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 5 }}>
                <FadeUpAni>
                  <Card style={{ border: "1px solid #494949" }}>
                    <Flex gap={"sm"}>
                      <Image
                        src={"./blur-bg-1.png"}
                        alt="image"
                        w={BigThenMd ? "100" : "100"}
                        h={BigThenMd ? "100" : "100"}
                        radius={"15"}
                      />
                      <Flex
                        direction={"column"}
                        gap={BigThenMd ? "10px" : "5px"}
                      >
                        <Flex
                          justify={BigThenMd ? "flex-start" : "space-between"}
                          align={"center"}
                          gap={"10px"}
                        >
                          <Title order={5}>Betr Picks</Title>
                          <Text
                            fz={"xs"}
                            bg={"#0C3D1D"}
                            style={{
                              padding: "5px 15px",
                              borderRadius: "20px",
                            }}
                          >
                            $500
                          </Text>
                        </Flex>
                        <Text fz={BigThenMd ? "sm" : "xs"} opacity={"0.7"}>
                          Get your 1st deposit matched 100% up to $500 in Bonus
                          Credits, with Promo code StatsEdge
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      justify={BigThenMd ? "space-between" : "flex-start"}
                      direction={BigThenMd ? "row" : "column"}
                      pt={"md"}
                      align={BigThenMd ? "center" : "start"}
                      gap={BigThenMd ? "0" : "5px"}
                    >
                      <Text fz={"sm"} opacity={"0.7"}>
                        Copy & Paste this code at Betr Picks
                      </Text>
                      <Flex
                        gap={"10px"}
                        justify={BigThenMd ? "center" : "space-between"}
                      >
                        <Flex
                          align={"center"}
                          style={{
                            border: "1px solid #6A8BFF",
                            borderRadius: "10px",
                          }}
                        >
                          <Text fz={"xs"} px={"10px"} fw={"bold"}>
                            StatsEdge
                          </Text>
                          <CopyButton value="StatsEdge">
                            {({ copied, copy }) => (
                              <Button
                                fz={"xs"}
                                p={"xs"}
                                color={copied ? "teal" : "#223164"}
                                onClick={copy}
                              >
                                {copied ? "Copied" : "Copy"}
                              </Button>
                            )}
                          </CopyButton>
                        </Flex>
                        <Button bg={"#223164"}>Claim $500</Button>
                      </Flex>
                    </Flex>
                  </Card>
                </FadeUpAni>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
