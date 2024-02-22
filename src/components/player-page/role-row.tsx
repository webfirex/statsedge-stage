import { Box, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type PlayerStatsTestType } from "~/lib/type";
import { BREAKPOINTS } from "~/styles/globals";

interface RoleRowProps {
  player: PlayerStatsTestType;
}

export function RoleRow(props: RoleRowProps) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <>
      <Box
        display={"flex"}
        style={{
          borderTop: "1px solid #fff",
          borderBottom: "1px solid #fff",
          justifyContent: BigThenMd ? "flex-start" : "space-between",
          marginTop: "15px",
          padding: "10px",
          gap: BigThenMd ? "50px" : "0",
        }}
      >
        {props.player.role && <Text>ROLE: {props.player.role}</Text>}
        <Text>Top 20 (#5)</Text>
        {props.player.age && <Text>{props.player.age} yrs</Text>}
      </Box>
    </>
  );
}
