import axios from "axios";
import { API_KEY } from "@env";

export async function getFixture({ selectedLeague, selectedValue }) {
  const response = await axios.get(
    "https://v3.football.api-sports.io/fixtures?",
    {
      params: {
        league: selectedLeague.code,
        season: 2023,
        round: `${selectedValue}`,
      },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY,
      },
    }
  );
    const data = response.data.response
    return data
}
