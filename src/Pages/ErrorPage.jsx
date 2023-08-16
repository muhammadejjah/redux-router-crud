import { useRouteError,Link ,useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigate= useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
    <div id="error-page">
      <h1 className="text-danger">ERROR {error.status}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message || error.data}</i>
      </p>
      <Button variant="primary" onClick={()=>{navigate("/",{replace:true})}}>Go Home</Button>
    </div>
    </div>
  );
}
