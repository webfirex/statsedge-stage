import { Group, Text } from "@mantine/core";
import Link from "next/link";
import { Children } from "react";

interface PathDisplayProps {
  path: {
    text: string;
    link: string;
  }[];
}

export function PathDisplay(props: PathDisplayProps) {
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
