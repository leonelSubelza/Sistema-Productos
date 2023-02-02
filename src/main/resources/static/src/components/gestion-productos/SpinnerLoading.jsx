import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../../styles/SpinnerLoading.css';

function SpinnerLoading({mensaje, openSpinner}) {
  return (
    <>
    <div className={`spinnerContainer ${openSpinner ? 'show':''}`}>
      <Button variant="primary" disabled>
      <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {' '+mensaje}
      </Button>
      </div>
    </>
  );
}

export default SpinnerLoading;