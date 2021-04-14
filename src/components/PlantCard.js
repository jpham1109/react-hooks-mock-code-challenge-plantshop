import React, { useState } from "react";

function PlantCard({plant, onDeletePlant, onUpdatePlant}) {
  const { id, name, image, price } = plant

  const [stock, setStock] = useState(true)
  const [updatedPrice, setUpdatedPrice] = useState(" ")

  function handleStockClick() {
    setStock(stock => !stock)
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    onDeletePlant(id)
  }

  function handlePriceSubmit(event) {
    event.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: updatedPrice})
    })
    .then(r => r.json())
    .then(onUpdatePlant)
    setUpdatedPrice(" ")
  }
  
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {stock ? (
        <button 
        className="primary" 
        onClick={handleStockClick}
        >In Stock</button>
      ) : (
        <button 
        className="primary"
        onClick={handleStockClick}>Out of Stock</button>
      )}
      <button 
        className="warning"
        onClick={handleDeleteClick}>Delete</button>
      <form onSubmit={handlePriceSubmit}>
        <input type="number" name="price" step="0.01" placeholder="New price.." value={updatedPrice} onChange={(event) => setUpdatedPrice(parseFloat(event.target.value))}/>
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
