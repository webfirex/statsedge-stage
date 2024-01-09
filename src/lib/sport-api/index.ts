import { CustomMatch } from "./custom/match";
import { FixtureGet } from "./fixture/get";
import { FixtureList } from "./fixture/list";
import { PlayerGet } from "./player/get";
import { TeamGet } from "./team/get";
import { TeamLogo } from "./team/logo";

class Fixtures {
  public static List = FixtureList;
  public static Get = FixtureGet;
}

class Team {
  public static Logo = TeamLogo;
  public static Get = TeamGet;
}

class Player {
  public static Get = PlayerGet;
}

class Custom {
  public static Match = CustomMatch;
}

export class SportApi {
  public static readonly Fixtures = Fixtures;
  public static readonly Player = Player;
  public static readonly Team = Team;
  public static readonly Custom = Custom;
}
