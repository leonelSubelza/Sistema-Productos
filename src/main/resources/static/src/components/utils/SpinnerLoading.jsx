import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../../styles/ventana-productos/SpinnerLoading.css';
import { funcionesContext } from '../../context/FuncionesTablaContext';

function SpinnerLoading() {

  const { mensajeSpinner,showSpinner } = useContext(funcionesContext)
  return (
    <>
    <div className={`spinnerContainer ${showSpinner ? 'show':''}`}>
      <Button variant="dark" disabled>
      <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {' '+mensajeSpinner}
      </Button>
      </div>
    </>
  );
}

export default SpinnerLoading;