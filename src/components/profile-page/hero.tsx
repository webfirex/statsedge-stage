import { AspectRatio, Card, Grid, Image } from "@mantine/core";

export function ProfileHeroComp() {
  return (
    <>
      <Card radius="lg">
        <Grid columns={10} gutter={0}>
          <Grid.Col span={{ base: 0, md: 4 }}></Grid.Col>

          <Grid.Col span={{ base: 10, md: 6 }}>
            <AspectRatio ratio={16 / 2}>
              <Image radius="lg" src="/pro-hero.png" alt="profile hero" fit="fill" />
            </AspectRatio>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}
