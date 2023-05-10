import {
  BackgroundImage,
  Center,
  Container,
  Flex,
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
  selected: {
    borderBottom: "2px solid white",
  },
}));

export function Detail() {
  const params = useParams();
  const { classes } = useStyles();
  const [detailedAnime, setDetailedAnime] = useState<DetailedAnimeData>();
  const [activeTab, setActiveTab] = useState<string | null>("trailer");

  const client = axios.create({
    baseURL: "http://localhost:8080/api/anime",
  });

  useEffect(() => {
    client.get(`/${params.id}`).then((res) => {
      const obj = res.data.data;
      console.log(obj);
      const detail: DetailedAnimeData = {
        poster_img: obj.images.jpg.large_image_url,
        trailer_img: obj.trailer.images.medium_image_url,
        trailer_url: obj.trailer.embed_url,
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
        background: obj.background,
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
    });
    {
      console.log(`hello ${detailedAnime?.background}`);
    }
  }, []);
  if (detailedAnime == null) return <></>;
  return (
    <Container size={"100%"} p={0}>
      <Container
        p={0}
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
                  fz="24px"
                  fw={500}
                  ta="start"
                >
                  Synopsis
                </Text>
                <Text mr={60} className={classes.detailText} align="justify">
                  {detailedAnime.synopsis}
                </Text>
              </Stack>
              <Text
                className={classes.detailText}
                fz="24px"
                fw={500}
                ta="start"
                display={"inline"}
              >
                Genres:{" "}
                {detailedAnime.genres.map((genre, index) => {
                  return index < detailedAnime.genres.length - 1
                    ? `${genre.name}, `
                    : `${genre.name}`;
                })}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
      <Tabs
        h={600}
        mx={20}
        value={activeTab}
        onTabChange={setActiveTab}
        py={15}
        unstyled
        fz={22}
        ta={"start"}
        styles={(themes) => ({
          tab: {
            color: "white",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            marginRight: "5px",
            "&:hover": {
              cursor: "pointer",
              borderBottom: "2px solid white",
              fontSize: "24px",
            },
          },

          tabsList: {
            marginTop: "20px",
            height: "50px",
          },
        })}
      >
        <Tabs.List>
          <Tabs.Tab
            value="trailer"
            className={activeTab == "trailer" ? classes.selected : ""}
          >
            Trailer
          </Tabs.Tab>
          <Tabs.Tab
            value="background"
            className={activeTab == "background" ? classes.selected : ""}
          >
            Background
          </Tabs.Tab>
          <Tabs.Tab
            value="cast"
            className={activeTab == "cast" ? classes.selected : ""}
          >
            Cast
          </Tabs.Tab>
          <Tabs.Tab
            value="staff"
            className={activeTab == "staff" ? classes.selected : ""}
          >
            Staff
          </Tabs.Tab>
          <Tabs.Tab
            value="themes"
            className={activeTab == "themes" ? classes.selected : ""}
          >
            Theme Songs
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="trailer">
          <Flex justify={"flex-end"}>
            <iframe
              src={detailedAnime.trailer_url.replace(
                "autoplay=1",
                "autoplay=0"
              )}
              style={{ border: "none" }}
              width={"800"}
              height={"500"}
            />
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="background">
          <Text px={15} align="justify" className={classes.detailText}>
            {detailedAnime.background != ""
              ? detailedAnime.background
              : "No background information"}
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="cast">
          <Text>Cast</Text>
        </Tabs.Panel>
        <Tabs.Panel value="staff">
          <Grid>
            <Grid.Col span={6}>
              <Text className={classes.detailText} fz={"xl"} fw={700}>
                Producers
              </Text>
              {detailedAnime.producers.map((producer) => {
                return (
                  <Text className={classes.detailText}>{producer.name}</Text>
                );
              })}
            </Grid.Col>
            <Grid.Col span={6}>
              <Text className={classes.detailText} fz={"xl"} fw={700}>
                Licensors
              </Text>
              {detailedAnime.licensors.map((licensor) => {
                return (
                  <Text className={classes.detailText}>{licensor.name}</Text>
                );
              })}
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="themes">
          <Grid>
            <Grid.Col span={6}>
              <Text className={classes.detailText} fz={"xl"} fw={700}>
                Opening(s)
              </Text>

              {detailedAnime.theme.openings.length > 0 ? (
                detailedAnime.theme.openings.map((opening) => {
                  return <Text className={classes.detailText}>{opening}</Text>;
                })
              ) : (
                <Text className={classes.detailText}>No opening found</Text>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <Text className={classes.detailText} fz={"xl"} fw={700}>
                Ending(s)
              </Text>
              {detailedAnime.theme.endings.length > 0 ? (
                detailedAnime.theme.endings.map((ending) => {
                  return <Text className={classes.detailText}>{ending}</Text>;
                })
              ) : (
                <Text className={classes.detailText}>No ending found</Text>
              )}
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
