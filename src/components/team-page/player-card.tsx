import { Card, Flex, Image, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { CircleFlag } from "react-circle-flags";
import { BREAKPOINTS } from "~/styles/globals";

interface TeamPlayerCardProps {
  player: {
    id: number;
    firstName: string;
    lastName: string;
    nickname?: string;
    country: string | null;
    countryISO: string | null;
    sport: string;
  };
}

export const TeamPlayerCard = (props: TeamPlayerCardProps) => {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Card
        bg={"#232323"}
        display={"flex"}
        style={{
          flexDirection: "column",
          gap: "5px",
          justifyContent: "center",
          alignContent: "center",
          padding: "0",
        }}
      >
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          p={BigThenMd ? "15px" : "5px"}
        >
          <Image
            src={"/playerimg.png"}
            alt="Player Img"
            style={{
              borderRadius: BigThenMd ? "50px" : "5px",
              width: BigThenMd ? "50px" : "100%",
              height: BigThenMd ? "50px" : "auto",
            }}
          />
          <Text
            fz={BigThenMd ? "xs" : "8px"}
            ta={"center"}
            tt={"uppercase"}
            mt={"10px"}
          >
            {props.player.nickname}
          </Text>
          <Text
            fz={BigThenMd ? "xs" : "7px"}
            ta={"center"}
            tt={"uppercase"}
            opacity={"0.6"}
          >
            {props.player.firstName} {props.player.lastName}
          </Text>
          <Flex
            mt={"5px"}
            justify={"center"}
            align={"center"}
            gap={"xs"}
            display={BigThenMd ? "flex" : "none"}
          >
            {props.player.country && props.player.countryISO && (
              <>
                <CircleFlag
                  countryCode={props.player.countryISO.toLowerCase()}
                  height={BigThenXs ? 15 : 10}
                />
                <Text fz={"xs"} ta={"center"}>
                  {props.player.country}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
        <Flex
          p={"15px 10px"}
          direction={"column"}
          gap={"5px"}
          bg={"#101010"}
          display={BigThenMd ? "flex" : "none"}
        >
          <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>
            K/D 1.31
          </Text>
          <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>
            Most Played Champion : AATROX
          </Text>
          <Text fz={"xs"} style={{ borderBottom: "1px solid #1f1f1f" }}>
            Role TOP
          </Text>
        </Flex>
      </Card>
    </>
  );
};
