import { ActionIcon, Group, NumberInput, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginatedFooterProps {
  per: number;
  total: number;
  page: number;
  nextPage: () => void;
  prevPage: () => void;
  setPerPage: (value: number) => void;
}

export const PaginatedFooterComp = (props: PaginatedFooterProps) => {
  return (
    <>
      <Group justify="space-between" my="1rem" mx="md">
        <Group>
          <Text>Rows per page</Text>

          <NumberInput
            variant="default"
            min={5}
            max={50}
            size="xs"
            w="4rem"
            value={props.per}
            onChange={(value) => props.setPerPage(Number(value))}
          />
        </Group>

        <Group gap="xl">
          <Text>
            Page {props.page} of {Math.ceil(props.total / props.per)}
          </Text>

          <Group gap="xs">
            <ActionIcon
              variant="default"
              disabled={props.page <= 1}
              onClick={() => props.prevPage()}
            >
              <IconChevronLeft />
            </ActionIcon>
            <ActionIcon
              variant="default"
              disabled={props.page >= Math.ceil(props.total / props.per)}
              onClick={() => props.nextPage()}
            >
              <IconChevronRight />
            </ActionIcon>
          </Group>
        </Group>
      </Group>
    </>
  );
};
