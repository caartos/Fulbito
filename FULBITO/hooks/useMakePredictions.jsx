function useMakePredictions({
    predictions,
    selectedValue,
    selectedLeague,
    selectedItems,
    setSelectedItems,
    setPredictions,
    fixture,
  }) {
    const handleCheckboxChange = (checkboxName, partido, index) => {
      const updatedPredictions = { ...predictions };
      const roundKey = selectedValue;
      const spacedLeague = selectedLeague.league;
      const leagueWithoutSpaces = spacedLeague.replace(/\s/g, "");
  
      function arrayToObject(ar) {
        const obj = {};
        for (let i = 0; i < ar.length; i++) {
          obj[i] = ar[i];
        }
        return obj;
      }
      // Verificar si la liga seleccionada ya tiene predicciones
      if (!updatedPredictions[leagueWithoutSpaces]) {
        updatedPredictions[leagueWithoutSpaces] = {};
      }
  
      // Verificar si la ronda seleccionada ya tiene predicciones
      if (!updatedPredictions[leagueWithoutSpaces][roundKey]) {
        let a = Array(fixture.length).fill("");
        let aObj = arrayToObject(a);
        updatedPredictions[leagueWithoutSpaces][roundKey] = aObj;
      }
  
      updatedPredictions[leagueWithoutSpaces][roundKey][index] = {
        local: partido.equipoLocal,
        visit: partido.equipoVisitante,
        prediction: checkboxName,
        round: selectedValue,
      };
      //predicciones que vienen despues de la ultima vez de apretar save
      setPredictions(updatedPredictions);
  
      const updatedItems = [...selectedItems];
      updatedItems[index] = checkboxName;
  
      setSelectedItems(updatedItems);
    };
  
    return { handleCheckboxChange };
  }

  export default useMakePredictions