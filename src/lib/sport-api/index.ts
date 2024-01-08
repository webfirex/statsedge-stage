import { FixtureList } from "./fixture/list";
import { TeamLogo } from "./team/logo";

class Fixtures {
  public static List = FixtureList;
}

class Team {
  public static Logo = TeamLogo;
}

export class SportApi {
  public static readonly Fixtures = Fixtures;
  public static readonly Team = Team;
}
