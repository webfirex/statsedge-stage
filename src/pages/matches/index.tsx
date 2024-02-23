/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Group,
  Image,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedValue, useMediaQuery } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import { Children, useEffect } from "react";
import { FadeUpAni } from "~/components/animation/fade-up";
import { LayoutComp } from "~/components/layout";
import { BREAKPOINTS } from "~/styles/globals";
import { api } from "~/utils/api";
import { MatchSportSelector } from "~/components/match-page/sport-selector";
import { SportInfo, NumTimeFormat } from "~/lib/functions";
import { MatchCard } from "~/components/match-page/match-card";
import { PaginatedFooterComp } from "~/components/paginated-footer";
import { useAtom } from "jotai/react";
import { MatchesPageAtom } from "~/lib/jotai/matches";
import { UrlString, useUrlState } from "~/lib/hooks/useUrlState";
import { MatchTimeControl } from "~/components/match-page/match-segment";
import { SPORT_INFO } from "~/lib/data";
import { PathDisplay } from "~/components/pathdisplay";

export default function App() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const [Query, setQuery] = useAtom(MatchesPageAtom);

  const [DebouncedQuery] = useDebouncedValue(Query, 1000);

  const [URLQuery, setURLQuery] = useUrlState(
    {
      sport: UrlString("lol"),
    },
    "m"
  );

  const ListApi = api.fixture.list.useQuery({
    from: DebouncedQuery.from
      ? NumTimeFormat(DebouncedQuery.from?.getTime(), "2017-12-31")
      : NumTimeFormat(new Date().getTime(), "2017-12-31"),
    to: DebouncedQuery.to
      ? NumTimeFormat(DebouncedQuery.to?.getTime(), "2017-12-31")
      : NumTimeFormat(new Date().getTime(), "2017-12-31"),
    sport: DebouncedQuery.sport.alias,
    page: DebouncedQuery.page,
    pageCount: DebouncedQuery.per,
    upcoming: DebouncedQuery.upcoming,
  });

  // Sync URL Query ========

  useEffect(() => {
    if (URLQuery.sport !== Query.sport.alias) {
      setQuery((_query) => {
        _query.sport = SportInfo(URLQuery.sport) ?? SPORT_INFO[0]!;
      });
    }
  }, [URLQuery.sport]);

  useEffect(() => {
    setURLQuery({
      sport: Query.sport.alias,
    });
  }, [Query.sport]);

  // ========================

  // Sync Total Page ========
  useEffect(() => {
    if (ListApi.isSuccess && ListApi.data?.data?.total) {
      setQuery((_query) => {
        _query.total = ListApi.data?.data?.total ?? 0;
      });
    }
  }, [ListApi.data?.data?.total]);
  // ========================

  // Set Dates ==============
  useEffect(() => {
    if (!Query.from || !Query.to) {
      setQuery((_query) => {
        _query.from = new Date();
        _query.to = new Date();
      });
    }
  }, []);
  // ========================

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack>
            <FadeUpAni>
              <MatchSportSelector
                sport={Query.sport}
                setSport={(sport) => {
                  setQuery((_query) => {
                    _query.sport = sport;
                    _query.page = 1;
                    _query.total = 0;
                  });
                }}
              />
            </FadeUpAni>

            <FadeUpAni>
              <PathDisplay
                path={[
                  {
                    text: `${Query.sport.alias} Matches`,
                    link: `/matches?m-sport=${Query.sport.alias}`,
                  },
                ]}
              />
            </FadeUpAni>

            {/* <FadeUpAni>
              <Group justify="center" gap="xl">
                <MatchTabsComp />
              </Group>
            </FadeUpAni> */}

            {/* <Space h="xl" /> */}

            <FadeUpAni>
              <Group
                {...(!BigThenMd
                  ? {
                      grow: true,
                      preventGrowOverflow: false,
                      wrap: "nowrap",
                    }
                  : {})}
              >
                <Image
                  src={Query.sport.logo}
                  mah={BigThenMd ? 50 : 25}
                  alt="game icon"
                  fit="contain"
                />

                <Title order={BigThenMd ? 1 : 4} lh={1}>
                  {Query.upcoming ? "Upcoming" : "Past"} {Query.sport.name}{" "}
                  Matches
                </Title>
              </Group>
            </FadeUpAni>

            <Space />

            <FadeUpAni>
              <Group>
                <Stack gap={5}>
                  <Text c="dimmed" size="sm">
                    Select a date
                  </Text>

                  <Group gap="xs">
                    <MatchTimeControl />

                    <DatePickerInput
                      type="range"
                      leftSection={<IconCalendar size={18} stroke={1.5} />}
                      leftSectionPointerEvents="none"
                      placeholder="Pick date"
                      aria-label=""
                      value={[Query.from, Query.to]}
                      onChange={([from, to]) => {
                        setQuery((_query) => {
                          _query.from = from;
                          _query.to = to;
                        });
                      }}
                    />
                  </Group>
                </Stack>
              </Group>
            </FadeUpAni>

            <Space h="xl" />

            {(() => {
              if (ListApi.isError) {
                return <Text>Error</Text>;
              }

              if (ListApi.isLoading) {
                return <Loader />;
              }

              if (ListApi.isSuccess) {
                const data = ListApi.data;

                if (!data.data || data.data.fixtures.length === 0) {
                  return <Text>No Data</Text>;
                }

                return (
                  <>
                    <Stack>
                      {Children.toArray(
                        data.data.fixtures.map((match) => (
                          <>
                            <Stack gap={BigThenMd ? "" : "0"}>
                              <Title
                                order={5}
                                tt="uppercase"
                                mb={BigThenMd ? "" : "30px"}
                              >
                                {NumTimeFormat(
                                  match.day,
                                  "Monday, 8th January 2021"
                                )}
                              </Title>

                              {Children.toArray(
                                match.fixtures.map((fixture) => (
                                  <>
                                    <MatchCard match={fixture} />
                                  </>
                                ))
                              )}
                            </Stack>
                          </>
                        ))
                      )}
                    </Stack>
                  </>
                );
              }
            })()}

            <PaginatedFooterComp
              nextPage={() => {
                setQuery((_query) => {
                  _query.page++;
                });
              }}
              prevPage={() => {
                setQuery((_query) => {
                  _query.page--;
                });
              }}
              setPerPage={(value) => {
                setQuery((_query) => {
                  _query.per = value;
                });
              }}
              page={Query.page}
              per={Query.per}
              total={Query.total}
            />
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
