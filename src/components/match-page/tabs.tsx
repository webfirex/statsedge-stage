import { Divider, Stack, Text } from "@mantine/core";
import { useAtom } from "jotai/react";
import { Children } from "react";
import { TAB_LIST } from "~/lib/data";
import { MatchesPageAtom } from "~/lib/jotai/matches";

export function MatchTabsComp() {
  const [Query, setQuery] = useAtom(MatchesPageAtom);

  return (
    <>
      {Children.toArray(
        TAB_LIST.map((tab) => (
          <>
            <Stack
              gap={5}
              onClick={() =>
                setQuery((_query) => {
                  _query.tab = tab.alias;
                })
              }
              style={{ cursor: "pointer" }}
            >
              <Text fw="bold" size="sm">
                {tab.name}
              </Text>

              <Divider
                size="md"
                color={Query.tab === tab.alias ? "blue" : "transparent"}
              />
            </Stack>
          </>
        ))
      )}
    </>
  );
}
