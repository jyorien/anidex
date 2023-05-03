import {
  BackgroundImage,
  Center,
  Container,
  Grid,
  Image,
  Overlay,
  Stack,
  Tabs,
  Text,
  createStyles,
  px,
  rem,
} from "@mantine/core";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  detailText: {
    color: "white",
  },
}));

export function Detail() {
  const params = useParams();
  const { classes } = useStyles();
  const [detailedAnime, setDetailedAnime] = useState<DetailedAnimeData>();

  const client = axios.create({
    baseURL: "http://localhost:8080/api/anime",
  });

  useEffect(() => {
    client.get(`/${params.id}`).then((res) => {
      const obj = res.data.data;
      const detail: DetailedAnimeData = {
        poster_img: obj.images.jpg.large_image_url,
        trailer_img: obj.trailer.images.medium_image_url,
        title: obj.title,
        title_en: obj.title_english,
        title_jp: obj.title_japanese,
        type: obj.type,
        source: obj.source,
        episodes_count: obj.episodes,
        status: obj.status,
        is_airing: obj.airing,
        air_period: obj.aired.string,
        episode_duration: obj.duration,
        synopsis: obj.synopsis,
        background: obj.bacground,
        season: obj.season,
        year: obj.year,
        broadcast_time: obj.broadcast.string,
        producers: obj.producers,
        licensors: obj.licensors,
        genres: obj.genres,
        demographics: obj.demographics,
        relations: obj.relations,
        theme: {
          openings: obj.theme.openings,
          endings: obj.theme.endings,
        },
      };
      setDetailedAnime(detail);
      console.log(detail.trailer_img);
    });
  }, []);
  if (detailedAnime == null) return <></>;
  return (
    <Container size={"100%"} p={0}>
      <Container
        size={"100%"}
        style={{
          backgroundImage: `url(${detailedAnime.trailer_img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Grid
          py={50}
          style={{
            backdropFilter: `blur(${rem(15)})`,
            backgroundColor: `rgb(0, 0, 0, 0.3)`,
          }}
        >
          <Grid.Col span={4}>
            <Image
              src={detailedAnime.poster_img}
              radius="5%"
              height="500px"
              fit="contain"
            />
          </Grid.Col>
          <Grid.Col span={8} ta={"start"}>
            <Stack h={"100%"} justify="center">
              <Text
                className={classes.detailText}
                fz="36px"
                fw={700}
                p="5% 0"
                style={{ verticalAlign: "middle" }}
              >
                {detailedAnime.title}
              </Text>
              <Stack>
                <Text
                  className={classes.detailText}
                  fz="36px"
                  fw={700}
                  ta="start"
                >
                  Synopsis
                </Text>
                <Text className={classes.detailText} ta={"start"}>
                  {detailedAnime.synopsis}
                </Text>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
}
