import {
    Container,
    Divider,
    Group,
    Image,
    Pagination,
    SegmentedControl,
    Space,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import {DatePickerInput} from '@mantine/dates';
import {useMediaQuery} from "@mantine/hooks";
import {IconCalendar} from "@tabler/icons-react";
import {useAtom, useAtomValue} from "jotai";
import {Children, useEffect, useState} from "react";
import {FadeUpAni} from "~/components/animation/fade-up";
import {AppGameSelector} from "~/components/app-page/game-selector";
import {AppMatchCard} from "~/components/app-page/match-card";
import {LayoutComp} from "~/components/layout";
import {SelectedCompTabAtom, SelectedGameAtom} from "~/lib/jotai";
import {BREAKPOINTS} from "~/styles/globals";
import {TAB_LIST} from "~/lib/data";


function TabsComp({value}: { value: { name: string, alias: string }[] }) {

    const [SelectedTab, setSelectedTab] = useAtom(SelectedCompTabAtom)

    return (
        <>
            {Children.toArray(
                value.map((tab) => (
                    <>
                        <Stack
                            gap={5}
                            onClick={() => setSelectedTab(tab)}
                            style={{cursor: "pointer"}}
                        >
                            <Text fw="bold" size="sm">
                                {tab.name}
                            </Text>

                            <Divider
                                size="md"
                                color={SelectedTab === tab ? "blue" : "transparent"}
                            />
                        </Stack>
                    </>
                ))
            )}
        </>
    );
}

export default function App() {
    const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

    const SelectedGame = useAtomValue(SelectedGameAtom);


    const [vState, setState] = useState({
        data: [{
            id: '2131',
            live: true,
            startAt: "",
            date:"",
            formatCount: "",
            league: {
                name: "name",
                logo: "https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&",
            },
            teams: {
                1: {
                    name: "Liquid",
                    logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
                    points: "6 (1)",
                },
                2: {
                    name: "Master",
                    logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
                    points: "6 (1)",
                },
            },
        }],
        displayData: [{
            id: '2131',
            live: true,
            startAt: "",
            date:"",
            formatCount: "",
            league: {
                name: "name",
                logo: "https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&",
            },
            teams: {
                1: {
                    name: "Liquid",
                    logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
                    points: "6 (1)",
                },
                2: {
                    name: "Master",
                    logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
                    points: "6 (1)",
                },
            },
        }],
        dataLoading: false,
        dateType: 'upcoming',
        pagination: {
            total: 1,
            current: 1
        }
    })
    const [valueDateRange, setValueDateRange] = useState<[Date | null, Date | null]>([(new Date()), (new Date())]);

    /* eslint-disable */
    useEffect(() => {
        (async () => {

            setState(prevState => ({
                ...prevState,
                data: [],
                dataLoading: true
            }))

            /* eslint-disable */
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJza3lsZXJjYW1wZXIiLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOi0zMzA5MDQ4MTMzMzUyOTY5Njk3LCJjdXN0b21lciI6dHJ1ZX0.9SkaL3AeufKMI_AAH_1PtYEYAy8FQ46EJjHKsTvDTRo"

            const queryParams = {
                sport: SelectedGame.alias || '',
                from: (new Date(valueDateRange[0]!)).toISOString().split('T')[0] || '',
                to: (new Date(valueDateRange[1]!)).toISOString().split('T')[0] || '',
                page: '1',
            };

            const response = await fetch(
                `https://api.gamescorekeeper.com/v1/fixtures?${new URLSearchParams(queryParams)}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })


            const resData = await response.json()
            const tempState = resData.fixtures.map((item: any) => {

                const startDate = new Date(item.scheduledStartTime)
                const pad = (num: number) => (num < 10 ? "0" + num : num);

                const hours = pad(startDate.getHours());
                const minutes = pad(startDate.getMinutes());


                const months = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];

                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                const dayOfWeek = days[startDate.getDay()];
                const dayOfMonth = startDate.getDate();
                const month = months[startDate.getMonth()];
                const year = startDate.getFullYear();

                const getOrdinalSuffix = (number:number) => {
                    if (number >= 11 && number <= 13) {
                        return 'th';
                    }
                    const lastDigit = number % 10;
                    switch (lastDigit) {
                        case 1:
                            return 'st';
                        case 2:
                            return 'nd';
                        case 3:
                            return 'rd';
                        default:
                            return 'th';
                    }
                };

                const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

                const formattedDate = `${dayOfWeek}, ${dayOfMonth}${ordinalSuffix} ${month} ${year}`;

                return {
                    id: item.competition.id,
                    live: item.status != "Ended",
                    date:formattedDate,
                    startAt: `${startDate.toLocaleDateString('en-US', { weekday: 'short' })} ${hours}:${minutes}`,
                    formatCount: item.format.value,
                    league: {
                        name: item.competition.name,
                        logo: "https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&",
                    },
                    teams: {
                        1: {
                            name: item.participants[0].name,
                            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
                            points: item.participants[0].score,
                        },
                        2: {
                            name: item.participants[1].name,
                            logo: "https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg",
                            points: item.participants[1].score,
                        },
                    },
                }
            })
            if (vState.dateType === 'upcoming') {
                const displayData = tempState.filter((item: any) => item.live)
                setState(prevState => ({
                    ...prevState,
                    data: tempState,
                    dataLoading: false,
                    displayData: displayData,
                    pagination: {
                        total: Math.ceil(displayData.length / 10),
                        current: 1
                    }
                }))
            } else {
                const displayData = tempState.filter((item: any) => !item.live)
                setState(prevState => ({
                    ...prevState,
                    data: tempState,
                    dataLoading: false,
                    displayData: displayData,
                    pagination: {
                        total: Math.ceil(displayData.length / 10),
                        current: 1
                    }
                }))
            }
        })()
    }, [SelectedGame, ...valueDateRange])


    useEffect(() => {
        setValueDateRange([(new Date()), (new Date())])
    }, [SelectedGame]);


    useEffect(() => {
        if (vState.dateType === 'upcoming') {
            const displayData = vState.data.filter(item => item.live)
            setState(prevState => ({
                ...prevState,
                displayData: displayData,
                pagination: {
                    total: Math.ceil(displayData.length / 10),
                    current: 1
                }
            }))
        } else {
            const displayData = vState.data.filter(item => !item.live)
            setState(prevState => ({
                ...prevState,
                displayData: displayData,
                pagination: {
                    total: Math.ceil(displayData.length / 10),
                    current: 1
                }
            }))
        }
    }, [vState.dateType])

    /* eslint-enable */

    return (
        <>
            <LayoutComp>
                <Container size="xl" mt="xl">
                    <Stack>
                        <FadeUpAni>
                            <AppGameSelector/>
                        </FadeUpAni>

                        <FadeUpAni>
                            <Group gap="xs">
                                <Text c="blue" size="xl">
                                    /
                                </Text>

                                <Text tt="uppercase">{SelectedGame.game}</Text>
                            </Group>
                        </FadeUpAni>

                        <FadeUpAni>
                            <Group justify="center" gap="xl">
                                <TabsComp value={TAB_LIST}/>
                            </Group>
                        </FadeUpAni>

                        <Space h="xl"/>

                        <FadeUpAni>
                            <Group
                                {...(!BigThenMd
                                    ? {grow: true, preventGrowOverflow: false, wrap: "nowrap"}
                                    : {})}
                            >
                                <Image
                                    src={SelectedGame.icon}
                                    mah={BigThenMd ? 50 : 25}
                                    alt="game icon"
                                    fit="contain"
                                />

                                <Title order={BigThenMd ? 1 : 4} lh={1}>
                                    Upcoming {SelectedGame.game} Matches
                                </Title>
                            </Group>
                        </FadeUpAni>

                        <Space/>

                        <FadeUpAni>
                            <Group>
                                <Stack gap={5}>
                                    <Text c="dimmed" size="sm">
                                        Select a date
                                    </Text>

                                    <Group gap="xs">
                                        <SegmentedControl
                                            size="xs"
                                            color="blue"
                                            radius="xl"
                                            styles={{
                                                root: {
                                                    background: "transparent",
                                                    border: "1px solid var(--mantine-color-dimmed)",
                                                },
                                            }}
                                            data={[
                                                {
                                                    value: "upcoming",
                                                    label: (
                                                        <>
                                                            <Text
                                                                size={BigThenMd ? "sm" : "xs"}
                                                                my={3}
                                                                fw="bold"
                                                                mx="md"
                                                            >
                                                                Upcoming
                                                            </Text>
                                                        </>
                                                    ),
                                                },
                                                {
                                                    value: "past",
                                                    label: (
                                                        <>
                                                            <Text
                                                                size={BigThenMd ? "sm" : "xs"}
                                                                my={3}
                                                                fw="bold"
                                                                mx="md"
                                                            >
                                                                Past
                                                            </Text>
                                                        </>
                                                    ),
                                                },
                                            ]}
                                            value={vState.dateType}
                                            onChange={(value) => setState(prevState => ({
                                                ...prevState,
                                                dateType: value
                                            }))}
                                        />

                                        {/*<IconCalendar size={18}/>*/}
                                        <DatePickerInput
                                            type="range"
                                            leftSection={<IconCalendar size={18} stroke={1.5}/>}
                                            leftSectionPointerEvents="none"
                                            placeholder="Pick date"
                                            value={valueDateRange}
                                            onChange={setValueDateRange}
                                        />
                                    </Group>
                                </Stack>
                            </Group>
                        </FadeUpAni>

                        <Space h="xl"/>

                        <Stack gap="xl">
                            {/*{Children.toArray(*/}
                            {/*  MATCH_LIST.map((match) => (*/}
                            <>
                                <Stack>
                                    {/*<FadeUpAni>*/}
                                    {/*  <Group>*/}
                                    {/*    <Title order={5} tt="uppercase">*/}
                                    {/*      {match.date}*/}
                                    {/*    </Title>*/}
                                    {/*  </Group>*/}
                                    {/*</FadeUpAni>*/}

                                    {/*<Space />*/}



                                    {Children.toArray(
                                        vState.displayData.filter((item, idx) => {
                                            return (idx > ((vState.pagination.current - 1) * 10) - 1) && (idx < (vState.pagination.current) * 10)
                                        }).map((match,idx) => {
                                            const filterData=vState.displayData.filter((item, idx) => {
                                                return (idx > ((vState.pagination.current - 1) * 10) - 1) && (idx < (vState.pagination.current) * 10)
                                            })
                                            return (
                                                <>
                                                    {
                                                        idx==0 && (<>
                                                            <FadeUpAni>
                                                                <Group>
                                                                    <Title order={5} tt="uppercase">
                                                                        {match.date}
                                                                    </Title>
                                                                </Group>
                                                            </FadeUpAni>

                                                            <Space />
                                                        </>)
                                                    }
                                                    {
                                                        idx!=0 && match.date!= filterData[(idx-1)]?.date && (<>
                                                            <FadeUpAni>
                                                                <Group>
                                                                    <Title order={5} tt="uppercase">
                                                                        {match.date}
                                                                    </Title>
                                                                </Group>
                                                            </FadeUpAni>

                                                            <Space />
                                                        </>)
                                                    }
                                                    <FadeUpAni>
                                                        <AppMatchCard
                                                            match={match}
                                                            game={{
                                                                name: SelectedGame.game,
                                                                icon: SelectedGame.icon,
                                                            }}
                                                        />
                                                    </FadeUpAni>
                                                </>
                                            )
                                        })
                                    )}
                                    {(vState.displayData.length == 0 && !vState.dataLoading) && 'No competition'}
                                    {vState.dataLoading && "Data Loading. Please wait."}
                                </Stack>
                                <Space/>
                                <Pagination
                                    total={vState.pagination.total}
                                    siblings={1}
                                    defaultValue={1}
                                    value={vState.pagination.current}
                                    onChange={(val) => setState(prevState => ({
                                        ...prevState,
                                        pagination: {
                                            total: prevState.pagination.total,
                                            current: val
                                        }
                                    }))}
                                />
                            </>
                            {/*))*/}
                            {/*)}*/}
                        </Stack>
                    </Stack>
                </Container>
            </LayoutComp>
        </>
    );
}
