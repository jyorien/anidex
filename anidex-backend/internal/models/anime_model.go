package models

type HomeAnimeResponse struct {
	Data []HomeAnime `json:"data"`
}

type HomeAnime struct {
	MalId  int             `json:"mal_id"`
	Images NormalJpgImages `json:"images"`
	Title  string          `json:"title"`
	Type   string          `json:"type"`
	Status string          `json:"status"`
	Season string          `json:"season"`
	Year   int             `json:"year"`
}

type NormalJpgImages struct {
	JpgList NormalImageUrl `json:"jpg"`
}

type NormalImageUrl struct {
	Url string `json:"image_url"`
}

type DetailedAnimeResponse struct {
	Data DetailedAnime `json:"data"`
}

type DetailedAnime struct {
	MalId             int                 `json:"mal_id"`
	Images            LargeJpgImages      `json:"images"`
	TrailerInfo       Trailer             `json:"trailer"`
	Title             string              `json:"title"`
	TitleEnglish      string              `json:"title_english"`
	TitleJapanese     string              `json:"title_japanese"`
	Type              string              `json:"type"`
	Source            string              `json:"source"`
	Episodes          int                 `json:"episodes"`
	Status            string              `json:"status"`
	Airing            bool                `json:"airing"`
	AirPeriod         AirPeriod           `json:"aired"`
	EpisodeDuration   string              `json:"duration"`
	Synopsis          string              `json:"synopsis"`
	Background        string              `json:"background"`
	Season            string              `json:"season"`
	Year              string              `json:"year"`
	BroadcastSchedule BroadcastSchedule   `json:"broadcast"`
	ProducersList     []Name              `json:"producers"`
	LicensorsList     []Name              `json:"licensors"`
	GenreList         []Name              `json:"genres"`
	DemographicsList  []Name              `json:"demographics"`
	RelatedTitles     []Relation          `json:"relations"`
	ThemeSongList     map[string][]string `json:"theme"`
}

type LargeJpgImages struct {
	JpgList LargeImageUrl `json:"jpg"`
}

type LargeImageUrl struct {
	Url string `json:"large_image_url"`
}

type Trailer struct {
	EmbedVideoUrl string        `json:"embed_url"`
	Images        TrailerImages `json:"images"`
}

type TrailerImages struct {
	ImageUrl string `json:"medium_image_url"`
}

type AirPeriod struct {
	Period string `json:"string"`
}

type BroadcastSchedule struct {
	BroadcastTime string `json:"string"`
}

type Name struct {
	MalId int    `json:"mal_id"`
	Name  string `json:"name"`
}

type Relation struct {
	Title string  `json:"relation"`
	Entry []Entry `json:"entry"`
}

type Entry struct {
	MalId int    `json:"mal_id"`
	Type  string `json:"type"`
	Name  string `json:"name"`
}
