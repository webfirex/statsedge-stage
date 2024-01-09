import { Group, Text } from "@mantine/core";
import { Children } from "react";

interface PathDisplayProps {
  path: string[];
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

              <Text tt="uppercase" maw={250} truncate="end">{path}</Text>
            </>
          ))
        )}
      </Group>
    </>
  );
}
