document.querySelector('#search-button').addEventListener('click', fetchRiotAPI)
const timeText = document.querySelector('#reply')

function fetchRiotAPI() {
    const summonerName = document.querySelector('#summoner-name').value
    const RIOT_API_KEY = "RGAPI-00f2b794-acea-4ea5-8515-0807aaa2be3f"
    const SUMMONER_V4_URL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${RIOT_API_KEY}`
    let puuid

    fetch(SUMMONER_V4_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data['puuid'])
            puuid = data['puuid']
        })
        .catch(err => {
            console.error(err)
        })

    const MATCH_V5_URL = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/PisqaI86EeM0_2c-Eur1p2hEAihuS7GJe95Sj8AuH3O3GqgjFDQH9ugA5aS9gAjLpAy9ve1q_fsKZA/ids?start=0&count=1&api_key=${RIOT_API_KEY}`
    let match_id
    fetch(MATCH_V5_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            match_id = data[0]
            console.log(match_id)
        })
        .catch(err => {
            console.error(err)
        })

    const MATCH_V5_URL_TIME = `https://europe.api.riotgames.com/lol/match/v5/matches/${match_id}?api_key=${RIOT_API_KEY}`
    let endTime;
    fetch(MATCH_V5_URL_TIME)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            endTime = data
        })
        .catch(err => {
            console.error(err)
        })
}