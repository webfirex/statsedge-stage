import { SegmentedControl, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai/react";
import { MatchesPageAtom } from "~/lib/jotai/matches";
import { BREAKPOINTS } from "~/styles/globals";

export function MatchTimeControl() {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const [Query, setQuery] = useAtom(MatchesPageAtom);

  return (
    <>
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
                <Text size={BigThenMd ? "sm" : "xs"} my={3} fw="bold" mx="md">
                  Upcoming
                </Text>
              </>
            ),
          },
          {
            value: "past",
            label: (
              <>
                <Text size={BigThenMd ? "sm" : "xs"} my={3} fw="bold" mx="md">
                  Past
                </Text>
              </>
            ),
          },
        ]}
        value={Query.upcoming ? "upcoming" : "past"}
        onChange={(value) => {
          setQuery((_query) => {
            _query.upcoming = value === "upcoming";
            _query.page = 1;
            _query.total = 0;
          });
        }}
      />
    </>
  );
}
