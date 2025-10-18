import { useNavigate } from 'react-router-dom';
import './GameCard.css'

const GameCard = (props) => {
    const navigate = useNavigate();
    const irADetalleProducto = (ID) => navigate(`/EditarProducto/${ID}`);

    return (
        <article onClick={() => irADetalleProducto(props.id)}>
              <h3>{props.titulo}</h3>
              <img src={props.img} />
              <p>{props.descripcion}</p>
              <p>S/. {props.precio}</p>
        </article>
    );
};

export default GameCard;