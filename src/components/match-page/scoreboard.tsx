import {
  Box,
  Card,
  Divider,
  Flex,
  Image,
  Paper,
  Progress,
  Space,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBomb,
  IconCross,
  IconCurrencyDollar,
  IconLetterA,
  IconLetterD,
  IconLetterK,
  IconShieldFilled,
} from "@tabler/icons-react";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";
import MatchStats from "../player-page/match-stats";

interface MatchScoreboardProps {
  match: MatchType;
}

export function ScoreBoardHead(props: {
  game: string;
  teamId: number;
  name: string;
  bg: string;
}) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  const iconXs = BigThenXs ? 18 : 12;

  return (
    <>
      <Flex align="center" justify="space-between">
        <Paper py="xs" px={BigThenXs ? "md" : "xs"} radius="xl" bg={props.bg}>
          <Flex align="center" gap={BigThenXs ? "xs" : rem(5)}>
            <Image
              src={`/api/team/logo?id=${props.teamId}`}
              alt="league logo"
              fit="contain"
              h={BigThenXs ? 20 : 15}
              fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
            />
            <Text size={BigThenXs ? "sm" : rem(10)} c="black">
              {props.name}
            </Text>
          </Flex>
        </Paper>

        {props.game == "cs2" && (
          <Flex gap={BigThenXs ? rem(20) : rem(2)} align="center">
            <Box miw={30} ta="center">
              <IconCurrencyDollar size={iconXs} />
            </Box>
            <Box miw={25} ta="center">
              <IconCross size={iconXs} />
            </Box>
            <Box miw={25} ta="center">
              <IconShieldFilled size={iconXs} />
            </Box>
            <Box miw={25} ta="center">
              <IconLetterK size={iconXs} />
            </Box>
            <Box miw={25} ta="center">
              <IconLetterA size={iconXs} />
            </Box>
            <Box miw={25} ta="center">
              <IconLetterD size={iconXs} />
            </Box>
            <Box miw={30} ta="center" display="flex">
              <Text size={BigThenXs ? rem(18) : rem(11)}>ADR</Text>
            </Box>
          </Flex>
        )}
        {props.game == "valorant" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>Agent</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>K</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>D</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>A</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>HS%</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>FK</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(10)}>FD</Text>
            </Box>
          </Flex>
        )}
        {(props.game == "lol" || props.game == "dota2") && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>K</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>D</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>A</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>CS</Text>
            </Box>
          </Flex>
        )}
        {props.game == "rl" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Goals</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Asissts</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Saves</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Shots</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Demos</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Demoed</Text>
            </Box>
          </Flex>
        )}
        {props.game == "codmwiii" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>K</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>D</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>K/D</Text>
            </Box>
            <Box miw={SmallThenSm ? 50 : 70} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>Damage</Text>
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export function ScoreBoardRow(props: { name: string; game: string }) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const SmallThenSm = useMediaQuery(`(max-width: ${BREAKPOINTS.SM})`);

  const iconXs = BigThenXs ? "xs" : rem(8);

  return (
    <>
      <Flex align="center" justify="space-between">
        <Text size={BigThenXs ? "md" : rem(12)}>{props.name}</Text>

        {props.game == "cs2" && (
          <Flex gap={BigThenXs ? rem(20) : rem(2)}>
            <Box miw={30} ta="center">
              <Text size={iconXs}>$4950</Text>
            </Box>
            <Flex miw={25}>
              <Progress
                my="auto"
                mx="auto"
                value={65}
                w={BigThenXs ? 20 : 16}
                color="white"
                size="sm"
              />
            </Flex>
            <Box miw={25} ta="center">
              <Text size={iconXs}>200</Text>
            </Box>
            <Box miw={25} ta="center">
              <Text size={iconXs}>23</Text>
            </Box>
            <Box miw={25} ta="center">
              <Text size={iconXs}>6</Text>
            </Box>
            <Box miw={25} ta="center">
              <Text size={iconXs}>12</Text>
            </Box>
            <Box miw={30} ta="center">
              <Text size={iconXs}>963.0</Text>
            </Box>
          </Flex>
        )}
        {props.game == "valorant" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={40} ta="center">
              <Image
                mx="auto"
                src="/heroavatar.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Hero"
              />
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>200</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>6</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>50%</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>12</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>32</Text>
            </Box>
          </Flex>
        )}
        {(props.game == "lol" || props.game == "dota2") && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Flex gap={0}>
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
              <Image
                src="/item.png"
                w={SmallThenSm ? 12 : 22}
                h={SmallThenSm ? 12 : 22}
                alt="Item"
              />
            </Flex>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>6</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>12</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={iconXs}>963.0</Text>
            </Box>
          </Flex>
        )}
        {props.game == "rl" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>200</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>6</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>0</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 50} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>0</Text>
            </Box>
          </Flex>
        )}
        {props.game == "codmwiii" && (
          <Flex gap={BigThenXs ? "md" : rem(2)}>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>23</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>6</Text>
            </Box>
            <Box miw={SmallThenSm ? 30 : 40} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>12</Text>
            </Box>
            <Box miw={SmallThenSm ? 50 : 70} ta="center">
              <Text size={BigThenXs ? rem(18) : rem(13)}>963.0</Text>
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export function MatchScoreboardComp({ match }: MatchScoreboardProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Card p="lg">
        <Title order={BigThenXs ? 4 : 5} tt="uppercase" mb={10}>
          ScoreBoard
        </Title>
        <Stack gap="xl">
          <Flex align="center" justify="space-between">
            <Stack>
              <Flex align="center" gap="xs">
                <Text c="dimmed" size={BigThenXs ? "sm" : "xs"}>
                  R - 21
                </Text>
                <Divider orientation="vertical" size="sm" />
                <Text size={BigThenXs ? "sm" : "xs"}>MIRAGE</Text>
              </Flex>
            </Stack>

            <Flex align="center" gap={rem(5)}>
              <Title order={BigThenXs ? 4 : 5}>4</Title>
              <Title order={BigThenXs ? 4 : 5}>:</Title>
              <Title order={BigThenXs ? 4 : 5}>6</Title>
            </Flex>

            <Flex align="center" gap={rem(5)}>
              <Text size={BigThenXs ? "sm" : "xs"}>1:39</Text>
              <IconBomb size={BigThenXs ? 20 : 16} />
            </Flex>
          </Flex>

          {["lol", "dota2", "valorant"].includes(match.sportInfo.alias) && (
            <MatchStats sport={match.sportInfo.alias} />
          )}

          <Stack gap="md">
            <ScoreBoardHead
              game={match.sportInfo.alias}
              teamId={match.participants.one.id!}
              name={match.participants.one.name!}
              bg="yellow.5"
            />
            {match.participants.one.team?.most_recent_lineup?.map(
              (player, index) => (
                <ScoreBoardRow
                  key={index}
                  game={match?.sportInfo?.alias ?? "lol"}
                  name={player.name}
                />
              )
            )}

            <Space />

            <ScoreBoardHead
              game={match.sportInfo.alias}
              teamId={match.participants.two.id!}
              name={match.participants.two.name!}
              bg="blue.5"
            />

            {match.participants.one.team?.most_recent_lineup?.map(
              (player, index) => (
                <ScoreBoardRow
                  key={index}
                  game={match?.sportInfo?.alias ?? "lol"}
                  name={player.name}
                />
              )
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
