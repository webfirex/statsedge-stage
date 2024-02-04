import { Card, Flex, Grid, Image, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { BREAKPOINTS } from "~/styles/globals";

interface TeamDetailsProps {
  sport: string;
  logo: string;
  teamid: number;
  teamName: string;
}

export function TeamDetails(props: TeamDetailsProps) {
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
          backgroundImage: "url(./team-hero.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Grid columns={10} py={"md"}>
          <Grid.Col span={{ base: 2, md: 2 }}>
            <Image
              src={`/api/team/logo?id=${props.teamid}`}
              alt="league logo"
              fit="contain"
              h={BigThenXs ? 150 : 100}
              fallbackSrc="/place.svg"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 8, md: 8 }}>
            <Title order={3} tt={"uppercase"}>
              {props.teamName}
            </Title>
            <Flex justify={"flex-start"} align={"center"} my={"lg"} gap="xs">
              <Image
                src={props.logo}
                maw={BigThenMd ? 20 : 15}
                alt={""}
                fit="contain"
              />
              <Text fz={"10"} tt={"uppercase"}>
                {props.sport}
              </Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}
