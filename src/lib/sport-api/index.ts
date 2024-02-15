import { CustomMatch } from "./custom/match";
import { FixtureGet } from "./fixture/get";
import { FixtureList } from "./fixture/list";
import { FixtureStatsDOTA } from "./fixture/stats-dota";
import { FixtureStatsLOL } from "./fixture/stats-lol";
import { FixtureStream } from "./fixture/stream";
import { PickBanHeroes } from "./pickban/heroes";
import { PickBanMaps } from "./pickban/maps";
import { ParticipantRecent } from "./participant/recent";
import { PlayerGet } from "./player/get";
import { PlayerStats } from "./player/stats";
import { TeamForm } from "./team/form";
import { TeamGet } from "./team/get";
import { TeamLogo } from "./team/logo";
import { TeamStats } from "./team/stats";

class Fixtures {
  public static List = FixtureList;
  public static Get = FixtureGet;
  public static Stream = FixtureStream;
  public static Stats = {
    LOL: FixtureStatsLOL,
    DOTA: FixtureStatsDOTA,
  };
}

class PickBan {
  public static Heroes = PickBanHeroes;
  public static Maps = PickBanMaps;
}

class Team {
  public static Logo = TeamLogo;
  public static Get = TeamGet;
  public static Form = TeamForm;
  public static Stats = TeamStats;
}

class Participant {
  public static Recent = ParticipantRecent;
}

class Player {
  public static Get = PlayerGet;
  public static Stats = PlayerStats;
}

class Custom {
  public static Match = CustomMatch;
}

export class SportApi {
  public static readonly Fixtures = Fixtures;
  public static readonly Player = Player;
  public static readonly Participant = Participant;
  public static readonly Team = Team;
  public static readonly Custom = Custom;
  public static readonly PickBan = PickBan;
}
