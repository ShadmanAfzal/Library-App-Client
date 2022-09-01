import { AppBar } from './components/Appbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Books } from './components/Books';
import { Button } from 'bootstrap';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigator = useNavigate();
  return (
    <div>
      <div className="navbar navbar-dark bg-dark">
        <a className="navbar-brand px-2" href="#">Library App</a>
        <button
          className='btn btn-dark float-right'
          onClick={() => {
            navigator('/add')
          }}>Add Books</button>
      </div>
      <Books />



    </div>
  );
}

export default App;
