import { Accordion, Container, Grid, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const FAQ = [
  {
    value: "Apples",
    description:
      "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
  },
  {
    value: "Bananas",
    description:
      "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
  },
  {
    value: "Broccoli",
    description:
      "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
  },
  {
    value: "Appleds",
    description:
      "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
  },
  {
    value: "Basnanas",
    description:
      "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
  },
  {
    value: "Brocfcoli",
    description:
      "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
  },
];

export function LandingFAQComp() {
  const BiggerThan431 = useMediaQuery("(min-width: 431px)");

  return (
    <>
      <Container w="100%">
        <Grid columns={10} w="100%" gutter="xl">
          <Grid.Col span={{ base: 10, md: 3 }}>
            <Title ta={BiggerThan431 ? "left" : "center"} order={3}>
              Frequently asked questions
            </Title>
          </Grid.Col>

          <Grid.Col span={{ base: 10, md: 7 }}>
            <Accordion defaultValue={FAQ[0]?.value} w="100%">
              {FAQ.map((faq) => (
                <>
                  <Accordion.Item key={faq.value} value={faq.value}>
                    <Accordion.Control>{faq.value}</Accordion.Control>
                    <Accordion.Panel>{faq.description}</Accordion.Panel>
                  </Accordion.Item>
                </>
              ))}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
