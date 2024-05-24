
export default function CardCategoria({handleCardSet,tipoProducto}) {
  const handleClick = () => {
    return handleCardSet(tipoProducto);
  }

  return (
    <>
      <div className={`card-categoria-container-item`} onClick={handleClick}>
        <p>{tipoProducto.nombre}</p>
      </div>
    </>
  );
}