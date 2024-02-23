import { LOLMatchTest } from "./matches-test";
import { PlayerPastMatchesTest } from "./past-matches-test";
import { PlayerStatsTest } from "./stats-test";

export const PlayerInfoTest = async (props: { id: number }) => {
  const PlayerInfo = await PlayerStatsTest.Call({
    id: props.id,
  });

  if (!PlayerInfo) {
    null;
  }

  const match = await PlayerPastMatchesTest.Call();

  const matchStats = await Promise.all(
    match.map(async (m) => {
      return await LOLMatchTest.Call({ id: m.id });
    })
  );

  const finalMatches = match.map((m) => {
    const _matchStats = matchStats.find((ms) => ms?.id === m.id);

    if (!_matchStats) {
      return null;
    }

    return {
      ...m,
      ..._matchStats,
    };
  });

  console.log(JSON.stringify(finalMatches, null, 2));

  return {
    ...PlayerInfo,
    history_matches: finalMatches,
  };
};
