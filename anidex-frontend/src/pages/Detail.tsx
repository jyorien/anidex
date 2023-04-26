import { Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Detail() {
  const params = useParams();
  const [detailedAnime, setDetailedAnime] = useState<DetailedAnimeData>();

  const client = axios.create({
    baseURL: "http://localhost:8080/api/anime",
  });

  useEffect(() => {
    client.get(`/${params.id}`).then((res) => {
      const obj = res.data.data;
      const detail: DetailedAnimeData = {
        poster_img: obj.images.jpg.large_image_url,
        trailer_img: obj.images.medium_image_url,
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
    });
  }, []);
  if (detailedAnime == null) return;
  return <h1>{detailedAnime.producers[1].name}</h1>;
}
