export default function CardCategoria({handleCardSet,tipoProducto}) {
  const handleClick = () => {
    return handleCardSet(tipoProducto);
  }

  return (
    <>
      <div className={`card-categoria-container-item`} onClick={handleClick}>
        <div className={'card-categoria-img-container'}><img alt={'Imagen de ilustración de Categoria'} src={'https://static.vecteezy.com/system/resources/previews/000/581/914/non_2x/tshirt-icon-vector-illustration.jpg'} /></div>
        <p>{tipoProducto.nombre}</p>
      </div>
    </>
  );
}