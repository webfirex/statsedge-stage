import {
  Card,
  Divider,
  Group,
  Image,
  Overlay,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { CircleFlag } from "react-circle-flags";
import { NumTimeFormat, UTCToLocalTime } from "~/lib/functions";
import { useTimeLeft } from "~/lib/hooks/useTimeLeft";
import { type MatchType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface MatchHeroProps {
  match: MatchType;
}

export function MatchHeroComp({ match }: MatchHeroProps) {
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const timeLeft = useTimeLeft(UTCToLocalTime(match.scheduledStartTime));

  return (
    <>
      <Card
        style={{
          backgroundImage: `url(/match-view-card-bg.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        withBorder
      >
        <Overlay
          style={{
            zIndex: 1,
          }}
          blur={15}
          opacity={0.75}
          gradient="linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)"
        />
        <Stack
          align="center"
          style={{
            zIndex: 2,
          }}
        >
          <Group justify="center" grow w="100%" gap={5}>
            <Text
              truncate="end"
              maw={BigThenXs ? rem(400) : rem(150)}
              ta="right"
              fw="bold"
              size={BigThenXs ? rem(40) : rem(15)}
              tt="uppercase"
              ff="STNO"
            >
              {match.participants.one.name}
            </Text>

            <Image
              src="/vs.svg"
              h={BigThenXs ? rem(60) : rem(30)}
              w={BigThenXs ? rem(60) : rem(30)}
              alt="box"
              fit="contain"
              style={{
                flexGrow: 0,
              }}
            />

            <Text
              truncate="end"
              maw={BigThenXs ? rem(400) : rem(150)}
              ta="left"
              fw="bold"
              size={BigThenXs ? rem(40) : rem(15)}
              tt="uppercase"
              ff="STNO"
            >
              {match.participants.two.name}
            </Text>
          </Group>

          <Divider size="sm" maw={800} w="100%" />

          <Group>
            <Card
              p={BigThenXs ? "sm" : "xs"}
              miw={BigThenXs ? rem(350) : rem(100)}
              style={{
                backgroundColor: "rgba(221, 0, 18, 0.45)",
                position: "relative",
              }}
            >
              <Group mx="auto" gap={BigThenXs ? "md" : 10}>
                <Stack gap={5}>
                  <Text size={BigThenXs ? "xl" : rem(10)} ta="right">
                    {match.participants.one.name}
                  </Text>

                  <Group justify="end" gap={rem(5)}>
                    <Text size={BigThenXs ? "xs" : rem(10)} ta="right">
                      {match.participants.one.team?.country ?? "Unknown"}
                    </Text>

                    <CircleFlag
                      countryCode={
                        match.participants.one.team?.countryISO?.toLowerCase() ??
                        ""
                      }
                      height={BigThenXs ? 16 : 10}
                    />
                  </Group>
                </Stack>

                <Image
                  src={`/api/team/logo?id=${match.participants.one.id}`}
                  alt="league logo"
                  fit="contain"
                  h={BigThenXs ? rem(30) : rem(10)}
                  fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                />
              </Group>
              <Image
                style={{
                  position: "absolute",
                  bottom: "50%",
                  right: 0,
                  transform: "translateY(50%)",
                  width: "25%",
                  zIndex: 1,
                  opacity: 0.3,
                }}
                src={`/api/team/logo?id=${match.participants.one.id}`}
                alt="as"
              />
            </Card>

            <Title order={BigThenXs ? 3 : 5}>
              {match.participants.one.score}:{match.participants.two.score}
            </Title>

            <Card
              p={BigThenXs ? "md" : "xs"}
              miw={BigThenXs ? rem(350) : rem(100)}
              style={{
                backgroundColor: "rgba(0, 165, 57, 0.45)",
                position: "relative",
              }}
            >
              <Group mx="auto" gap={10}>
                <Image
                  src={`/api/team/logo?id=${match.participants.two.id}`}
                  alt="league logo"
                  fit="contain"
                  h={BigThenXs ? rem(30) : rem(10)}
                  fallbackSrc="https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"
                />
                <Stack gap={rem(5)}>
                  <Text size={BigThenXs ? "xl" : rem(10)} ta="left">
                    {match.participants.two.name}
                  </Text>

                  <Group justify="start" gap={rem(5)}>
                    <CircleFlag
                      countryCode={
                        match.participants.two.team?.countryISO?.toLowerCase() ??
                        ""
                      }
                      height={BigThenXs ? 16 : 10}
                    />
                    <Text size={rem(10)} ta="left">
                      {match.participants.two.team?.country ?? "Unknown"}
                    </Text>
                  </Group>
                </Stack>
              </Group>
              <Image
                style={{
                  position: "absolute",
                  bottom: "50%",
                  left: 0,
                  transform: "translateY(50%)",
                  width: "25%",
                  zIndex: 1,
                  opacity: 0.3,
                }}
                src={`/api/team/logo?id=${match.participants.two.id}`}
                alt="as"
              />
            </Card>
          </Group>

          <Stack align="center" gap={5}>
            <Text fw="bold" size="xs">
              {NumTimeFormat(
                UTCToLocalTime(match.scheduledStartTime),
                "19th December 2021"
              )}
            </Text>

            <Text size="xs">
              <Text inherit span c="dimmed">
                BO{match.format.value}
              </Text>{" "}
              -{" "}
              {(() => {
                if (match.status === "Scheduled") {
                  return <>Starts in {timeLeft}</>;
                }

                if (match.status === "Started") {
                  if (match.startTime === null) return <>Started</>;

                  return (
                    <>
                      Started at{" "}
                      {NumTimeFormat(UTCToLocalTime(match.startTime), "14:00")}
                    </>
                  );
                }

                if (match.status === "Ended") {
                  if (match.endTime === null) return <>Ended</>;

                  return (
                    <>
                      Finished at{" "}
                      {NumTimeFormat(UTCToLocalTime(match.endTime), "14:00")}
                    </>
                  );
                }

                return match.status;
              })()}
            </Text>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
