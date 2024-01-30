import { Box, Card, Grid, Image, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";
import { CircleFlag } from "react-circle-flags";

interface PlayerDetailsProps {
  nickname: string;
  name: string;
  sport: string;
  logo: string;
  country?: string;
}

export function PlayerDetails(props: PlayerDetailsProps) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Card
        p={"md"}
        radius={"md"}
        miw={"300px"}
        maw={"100%"}
        style={{
          backgroundColor: "transparent",
          border: "1px solid #fff",
        }}
      >
        <Grid columns={10}>
          <Grid.Col span={{ base: 7, md: 7 }}>
            <Title order={3} tt={"uppercase"}>
              {props.nickname}
            </Title>
            <Text fz={"xs"} w={"100%"} opacity={"0.5"}>
              {props.name}
            </Text>
            <Box
              display={"flex"}
              mt={"xs"}
              style={{ gap: "8px", alignItems: "center" }}
            >
              <CircleFlag
                countryCode={props.country ?? ""}
                height={BigThenXs ? 25 : 15}
              />
              <Box
                p={"5"}
                bg={"black"}
                display={"flex"}
                style={{ borderRadius: "10px" }}
              >
                <Image
                  src={
                    "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                  }
                  alt="league logo"
                  fit="contain"
                  h={BigThenXs ? 20 : 15}
                />
                <Text fz={"xs"}>Team Name</Text>
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 3, md: 3 }}>
            <Card
              display={"flex"}
              p={"5"}
              pl={"10"}
              style={{
                flexDirection: "row",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text fz={"10"} tt={"uppercase"}>
                {props.sport}
              </Text>
              <Image
                src={props.logo}
                maw={BigThenMd ? 20 : 15}
                alt={""}
                fit="contain"
              />
            </Card>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}
