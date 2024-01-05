import { AspectRatio, Card, Grid, Image } from "@mantine/core";

export function ProfileHeroComp() {
  return (
    <>
      <Card>
        <Grid columns={10} gutter={0}>
          <Grid.Col span={{ base: 0, md: 4 }}></Grid.Col>

          <Grid.Col span={{ base: 10, md: 6 }}>
            <AspectRatio ratio={16 / 2}>
              <Image src="/pro-hero.png" alt="profile hero" fit="fill" />
            </AspectRatio>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}
