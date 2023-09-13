import axios from "axios";
import { API_KEY } from "@env";

export async function getRounds({ selectedLeague }) {
  const rounds = await axios.get(
    "https://v3.football.api-sports.io/fixtures/rounds",
    {
      params: {
        league: selectedLeague.code,
        season: 2023,
      },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    }
  );
  const data = rounds.data.response;
  return data;
}
