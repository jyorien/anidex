import { Grid, Image, Stack, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  detailText: {
    color: "white",
  },
}));

export function HomeAnime({ mal_id, name, type, status, src }: HomeAnimeData) {
  const { classes } = useStyles();
  return (
    <Grid
      bg="#6C8496"
      style={{ borderRadius: "3%", boxShadow: "2px 2px 2px #394147" }}
    >
      <Grid.Col p="0" span={4}>
        <Image src={src} radius="3% 0% 0% 3%" />
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack align="flex-start" justify="center" style={{ height: "100%" }}>
          <Text
            fz="32px"
            fw="500"
            className={classes.detailText}
            lineClamp={2}
            align="left"
          >
            {name}
          </Text>
          <Text
            span={true}
            px="20px"
            py="5px"
            style={{ borderRadius: "10%" }}
            bg="#385F40"
            className={classes.detailText}
          >
            {type}
          </Text>
          <Text className={classes.detailText}>{status}</Text>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
