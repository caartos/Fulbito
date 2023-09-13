import { useState, useEffect } from "react";
import { getRounds } from "../../services/getRounds";
import { getFixture } from "../../services/getFixture";

export function useGetSelectedRound({
  selectedValue,
  selectedLeague,
  user,
  setPredictions,
  setSelectedItems,
}) {
  const [rounds, setRounds] = useState([]);
  const [fixture, setFixture] = useState([]);
  const [winOrLose, setWinOrLose] = useState([]);
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(true);
  useEffect(() => {
    const arr = [];
    async function fetchData() {
      try {
        setLoading(true);

        const spacedLeague = selectedLeague.league;
        const leagueWithoutSpaces = spacedLeague.replace(/\s/g, "");

        const userPredictions =
          user?.predictions?.[leagueWithoutSpaces]?.[selectedValue] || [];
        //console.log(userPredictions);
        let array = [];
        let maxIndex = Math.max(...Object.keys(userPredictions));

        for (let i = 0; i <= maxIndex; i++) {
          array.push(userPredictions[i].prediction || "");
        }
        //console.log(array);
        if (user.predictions) {
          setPredictions(user.predictions);
          setSelectedItems(array);
          //console.log(selectedItems);
        }
        const rounds = await getRounds({ selectedLeague });

        setRounds(rounds);

        if (selectedValue === "") {
          return;
        }

        const unFixture = await getFixture({
          selectedLeague,
          selectedValue,
        });

        const fixtureOrdered = unFixture.sort(
          (a, b) => a.fixture.timestamp - b.fixture.timestamp
        );

        const fixture = fixtureOrdered.map((partido) => {
          const horaInicio = partido.fixture.date;
          //console.log(horaInicio)
          const equipoLocal = partido.teams.home.name;
          const equipoVisitante = partido.teams.away.name;

          function haPasado(fechaHora) {
            const fechaHoraActual = new Date();
            const fechaHoraMenos15Min = new Date(fechaHora - 900000); // Restar 15 minutos en milisegundos
            arr.push(fechaHoraMenos15Min);

            return fechaHoraMenos15Min <= fechaHoraActual;
          }

          const status = haPasado(new Date(horaInicio));
          return {
            horaInicio,
            equipoLocal,
            equipoVisitante,
            status,
          };
        });

        setFixture(fixture);

        const calculateTimeRemaining = (startTime) => {
          if (!startTime) {
            return 0; // O cualquier otro valor predeterminado que desees usar cuando startTime sea null
          }

          const horaInicioPartido = new Date(startTime).getTime();
          const horaActual = new Date().getTime();
          const tiempoRestanteEnMilisegundos = horaInicioPartido - horaActual;
          const tiempoRestanteEnMinutos =
            tiempoRestanteEnMilisegundos / (1000 * 60); // Convertir a minutos
          return tiempoRestanteEnMinutos;
        };

        const findFirstFutureDate = () => {
          const currentDate = new Date();
          for (const date of arr) {
            const differenceInMinutes = calculateTimeRemaining(
              date,
              currentDate
            );
            if (differenceInMinutes > 0) {
              return date;
            }
          }
          return null; // Si no se encuentra ninguna fecha, devolvemos null
        };

        //Buscar la primera fecha con diferencia mayor que 0
        const firstFutureDate = findFirstFutureDate();
        //console.log(firstFutureDate);
        const millisecondsRemaining =
          calculateTimeRemaining(firstFutureDate) * 60000;
        //console.log(millisecondsRemaining);
        setTimeout(() => {
          setReset(!reset);
        }, millisecondsRemaining);

        let results = [];
        for (const key in userPredictions) {
          const match = userPredictions[key];
          //console.log(match);
          const localTeam = match.local;
          const visitTeam = match.visit;
          let matchPrediction = match.prediction;

          // Buscar el partido correspondiente en el array de objetos
          const correspondingMatch = fixtureOrdered.find((item) => {
            //console.log(item)
            if (item.fixture.status.short == "FT") {
              return (
                item.teams.home.name === localTeam &&
                item.teams.away.name === visitTeam
              );
            }
          });

          if (correspondingMatch) {
            const goalsHome = correspondingMatch.goals.home;
            const goalsAway = correspondingMatch.goals.away;

            // Comparar los goles y determinar el resultado
            let result;
            if (goalsHome > goalsAway) {
              result = "local";
            } else if (goalsHome < goalsAway) {
              result = "visit";
            } else {
              result = "draw";
            }

            // Comparar la predicción con el resultado real
            if (matchPrediction == result) {
              //console.log("WIN");
              results.push("WIN");
            } else {
              //console.log("LOSE");
              results.push("LOSE");
            }
          } else {
            //console.log("No prediction");
            results.push("No prediction");
          }
        }
        //console.log(results);
        setWinOrLose(results);
        const p = results.reduce((totalPoints, result) => {
          if (result === "WIN") {
            return totalPoints + 1; // Suma 1 al total de puntos por cada "WIN"
          }
          return totalPoints; // No suma nada si no es "WIN"
        }, 0);
        setPoints(p);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }

    setLoading(false);
  }, [selectedValue, selectedLeague.code, user]);
  console.log(rounds);
  fetchData();
  return { winOrLose, loading, points, fixture, rounds };
}
