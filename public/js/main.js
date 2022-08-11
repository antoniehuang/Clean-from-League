document.querySelector('#search-button').addEventListener('click', fetchRiotAPI)
const timeText = document.querySelector('#reply')
const timeBetweenText = document.querySelector('#reply-days')
let puuid
let match_id
let endTime


async function fetchRiotAPI() {
    const summonerName = document.querySelector('#summoner-name').value
    const RIOT_API_KEY = "RGAPI-00f2b794-acea-4ea5-8515-0807aaa2be3f"
    let SUMMONER_V4_URL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${RIOT_API_KEY}`

    try {
        const res = await fetch(SUMMONER_V4_URL)
        const data = await res.json()
        console.log(data['puuid'])
        puuid = data['puuid']

        const res2 = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1&api_key=${RIOT_API_KEY}`)
        const data2 = await res2.json()
        match_id = data2[0]
        console.log(match_id)

        const res3 = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${match_id}?api_key=${RIOT_API_KEY}`)
        const data3 = await res3.json()
        endTime = data3['info']['gameEndTimestamp']
        console.log(endTime)
        timeText.innerHTML += convertUnix(endTime)
        timeBetweenText.innerHTML = timeBetween(endTime)

    } catch (err) {
        console.log(err)
    }
}

function convertUnix(endTime) {
    let date = new Date(endTime);

    let dateInString = (date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds());
    return dateInString
}

function timeBetween(endTime) {
    let date = new Date(endTime);
    let now = Date.now()
    let diffInTime = now - date
    let diffInDays = diffInTime / (1000 * 3600 * 24)
    return Math.trunc(diffInDays)
}