import { Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { Children } from "react";
import { BREAKPOINTS } from "~/styles/globals";

interface PathDisplayProps {
  path: {
    text: string;
    link: string;
  }[];
}

export function PathDisplay(props: PathDisplayProps) {
  const BigThenSm = useMediaQuery(`(min-width: ${BREAKPOINTS.SM})`);

  return (
    <>
      <Group gap="xs">
        {Children.toArray(
          props.path.map((path) => (
            <>
              <Text c="blue" size="xl">
                /
              </Text>

              <Text
                tt="uppercase"
                maw={250}
                truncate="end"
                component={Link}
                href={path.link}
                size={BigThenSm ? "md" : "xs"}
              >
                {path.text}
              </Text>
            </>
          ))
        )}
      </Group>
    </>
  );
}
