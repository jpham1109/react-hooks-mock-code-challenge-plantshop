import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchText, setSearchText] = useState("")

  useEffect (() => {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(setPlants)
  }, [])

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant])
  }

  function handleDeletePlant(id) {
    const updatedPlants = plants.filter((plant) => plant.id !== id)
    setPlants(updatedPlants)
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlants)
  }
  const plantsToDisplay = plants.filter((plant) => plant.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search searchText={searchText} onChangeSearch={setSearchText}/>
      <PlantList plants={plantsToDisplay} onDeletePlant={handleDeletePlant} onUpdatePlant={handleUpdatePlant}/>
    </main>
  );
}

export default PlantPage;
