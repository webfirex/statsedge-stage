import { Box, Card, Title, Image, Flex, Text, Stack } from "@mantine/core";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { type PlayerStatsTestType } from "~/lib/type";
import { Children } from "react";

interface MatchStatsProps {
  matches: PlayerStatsTestType;
  sport: string;
}

export default function MatchStats(props: MatchStatsProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <Card
      mah={BigThenXs ? 770 : 500}
      style={{
        backgroundImage: "url(./blur-bg-1.png)",
        backgroundSize: "cover",
      }}
      p={"20px"}
    >
      <Title order={4} tt={"uppercase"} pb={"sm"}>
        Matches
      </Title>
      <Stack
        mah={props.sport == "lol" || props.sport == "dota2" ? undefined : "400"}
        mih={400}
        style={{ overflowY: "scroll" }}
        py={"md"}
      >
        {/* <Box
          mt={"sm"}
          display={"flex"}
          style={{ flexDirection: "column", gap: "10px" }}
        >
          <Flex
            bg={"#1d1d1d"}
            justify={"space-between"}
            style={{ borderRadius: "20px" }}
            p={"xs"}
          >
            <Text fz={"xs"}>10:50 17-01-2024</Text>
            <Box w={20} h={20} bg={"green"} style={{ borderRadius: "50%" }} />
          </Flex>
          <Flex gap={"xs"}>
            <Image
              src={"/icon.png"}
              alt="league logo"
              fit="contain"
              h={BigThenXs ? 30 : 20}
              m={10}
            />

            <Flex direction={"column"} gap={"xs"} w={"100%"}>
              <Flex justify={"space-between"} w={"100%"}>
                <Box display={"flex"} style={{ gap: "5px" }}>
                  <Image
                    src={"/place.svg"}
                    alt="league logo"
                    fit="contain"
                    h={BigThenXs ? 20 : 15}
                  />
                  <Text fz={"xs"}>Team Name</Text>
                </Box>
                <Text fz={"xs"}>2</Text>
              </Flex>
              <Flex justify={"space-between"} w={"100%"}>
                <Box display={"flex"} style={{ gap: "5px" }}>
                  <Image
                    src={"/place.svg"}
                    alt="league logo"
                    fit="contain"
                    h={BigThenXs ? 20 : 15}
                  />
                  <Text fz={"xs"}>Team Name</Text>
                </Box>
                <Text fz={"xs"}>0</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box> */}

        {Children.toArray(
          props.matches.last_games?.map((element) => (
            <>
              <Box
                mt={"sm"}
                display={"flex"}
                style={{ flexDirection: "column", gap: "10px" }}
              >
                <Flex
                  bg={"#1d1d1d"}
                  justify={"space-between"}
                  style={{ borderRadius: "20px" }}
                  p={"xs"}
                >
                  <Text fz={"xs"}>10:50 17-01-2024</Text>
                  <Box
                    w={20}
                    h={20}
                    bg={"green"}
                    style={{ borderRadius: "50%" }}
                  />
                </Flex>
                <Flex gap={"xs"}>
                  <Image
                    src={"/icon.png"}
                    alt="league logo"
                    fit="contain"
                    h={BigThenXs ? 30 : 20}
                    m={10}
                  />

                  <Flex direction={"column"} gap={"xs"} w={"100%"}>
                    <Flex justify={"space-between"} w={"100%"}>
                      <Box display={"flex"} style={{ gap: "5px" }}>
                        <Image
                          src={"/place.svg"}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 20 : 15}
                        />
                        <Text fz={"xs"}>{element.team.name}</Text>
                      </Box>
                      <Text fz={"xs"}>{element.creep_score}</Text>
                    </Flex>
                    <Flex justify={"space-between"} w={"100%"}>
                      <Box display={"flex"} style={{ gap: "5px" }}>
                        <Image
                          src={"/place.svg"}
                          alt="league logo"
                          fit="contain"
                          h={BigThenXs ? 20 : 15}
                        />
                        <Text fz={"xs"}>Team Name</Text>
                      </Box>
                      <Text fz={"xs"}>0</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </>
          ))
        )}
      </Stack>
    </Card>
  );
}
