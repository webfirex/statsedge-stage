import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Paper,
  Text,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";
import { LogoIcon, LogoIconSm } from "../logo/icon";

interface MatchBelowHeroProps {
  match: MatchType;
}

export function MatchBelowHeroComp({ match }: MatchBelowHeroProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Card p={BigThenXs ? "lg" : "sm"} py={BigThenXs ? rem(30) : "xl"}>
        <Flex
          justify="space-between"
          align="center"
          wrap="nowrap"
          w="100%"
          gap={BigThenXs ? "md" : 0}
        >
          <Box miw={BigThenXs ? 150 : 50}>
            {BigThenXs ? <LogoIcon /> : <LogoIconSm />}
          </Box>

          <Flex
            justify="center"
            align="center"
            wrap="nowrap"
            w="100%"
            gap={BigThenXs ? "md" : 0}
          >
            <Flex
              w="100%"
              justify="end"
              align="center"
              direction={BigThenXs ? "row" : "column"}
              gap={BigThenXs ? "md" : rem(5)}
            >
              <Image
                src={`/api/team/logo?id=${match.participants.one?.id}`}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 30 : 15}
                w={BigThenXs ? 30 : 15}
                fallbackSrc="/place.svg"
              />

              <Text size={BigThenXs ? "lg" : rem(10)}>
                {match.participants.one?.name}
              </Text>

              <Paper
                bg="dark.5"
                px={BigThenXs ? rem(6) : rem(5)}
                py={BigThenXs ? rem(3) : rem(5)}
              >
                <Text size={BigThenXs ? "md" : rem(10)}>4</Text>
              </Paper>
            </Flex>

            <Image
              src="/vs.svg"
              h={BigThenXs ? 40 : 20}
              w={BigThenXs ? 40 : 20}
              alt="box"
              fit="contain"
            />

            <Flex
              w="100%"
              justify="start"
              align="center"
              direction={BigThenXs ? "row" : "column"}
              gap={BigThenXs ? "md" : rem(5)}
            >
              <Paper
                bg="dark.5"
                px={BigThenXs ? rem(6) : rem(5)}
                py={BigThenXs ? rem(3) : rem(5)}
              >
                <Text size={BigThenXs ? "md" : rem(10)}>4</Text>
              </Paper>

              <Text size={BigThenXs ? "lg" : rem(10)}>
                {match.participants.two?.name}
              </Text>

              <Image
                src={`/api/team/logo?id=${match.participants.two?.id}`}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 30 : 15}
                w={BigThenXs ? 30 : 15}
                fallbackSrc="/place.svg"
              />
            </Flex>
          </Flex>

          <Group miw={BigThenXs ? 150 : 50} justify="end">
            <Button size={BigThenXs ? "sm" : "compact-xs"}>
              <Text size={BigThenXs ? "sm" : rem(9)}>Bet Now</Text>
            </Button>
          </Group>
        </Flex>
      </Card>
    </>
  );
}
