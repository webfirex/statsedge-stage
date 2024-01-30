import { CustomMatch } from "./custom/match";
import { FixtureGet } from "./fixture/get";
import { FixtureList } from "./fixture/list";
import { FixtureStream } from "./fixture/stream";
import { ParticipantRecent } from "./participant/recent";
import { PlayerGet } from "./player/get";
import { PlayerStats } from "./player/stats";
import { TeamGet } from "./team/get";
import { TeamLogo } from "./team/logo";

class Fixtures {
  public static List = FixtureList;
  public static Get = FixtureGet;
  public static Stream = FixtureStream;
}

class Team {
  public static Logo = TeamLogo;
  public static Get = TeamGet;
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
}
