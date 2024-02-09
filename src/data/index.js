const api = {
    baseUri: "https://api.themoviedb.org/3",
    apiKey: "dd231f76e44445acda161ff34b144401",
    language: "it-It"
}

const pics = {
    baseUri: "https://image.tmdb.org/t/p/w342",
    placeholder: "https://www.altavod.com/assets/images/poster-placeholder.png"
}

const mapProductions = p => ({
    id: p.id,
    title: p.title || p.name,
    originalTitle: p.original_title || p.original_name,
    lang: p.original_language,
    posterPath: p.poster_path,
    voteAverage: p.vote_average
})

export { api, mapProductions, pics }