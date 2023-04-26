interface DetailedAnimeData {
    poster_img: string,
    trailer_img: string,
    title: string,
    title_en: string,
    title_jp: string,
    type: string,
    source: string,
    episodes_count: number,
    status: string,
    is_airing: boolean,
    air_period: string,
    episode_duration: string,
    synopsis: string,
    background: string,
    season: string,
    year: string,
    broadcast_time: string,
    producers: Entity[],
    licensors: Entity[],
    genres: Entity[],
    demographics: Entity[],
    relations: Relation[]
    theme: {openings: string[], endings: string[]}

}

interface Entity {
    mal_id: number,
    name: string
}

interface Relation {
    relation: string,
    entry: {mal_id: string, type: string, name: string}[]
}