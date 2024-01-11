import { Group, Text, rem } from "@mantine/core";
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
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  return (
    <>
      <Group gap={BigThenXs ? rem(10) : rem(4)}>
        {Children.toArray(
          props.path.map((path) => (
            <>
              <Text c="blue" size={BigThenXs ? "xl" : "lg"}>
                /
              </Text>

              <Text
                tt="uppercase"
                maw={BigThenXs ? 250 : 200}
                truncate="end"
                component={Link}
                href={path.link}
                size={BigThenXs ? "xs" : rem(10)}
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
