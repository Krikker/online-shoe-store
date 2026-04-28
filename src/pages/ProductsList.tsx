import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { SmallInfo } from "../types";

interface ProductCardProps {
  item: SmallInfo;
  pos: string
}

const ProductsList = ({item, pos}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || item.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
    }, 1000);
    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };
  
  return (
    <div className="col-4" key={item.id}>
      <div className={`card ${pos === 'catalog' ? 'catalog-item-card' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <img src={item.images[currentImageIndex]}
          className="card-img-top img-fluid" alt={item.title}
        />
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price} руб.</p>
          <Link to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
}

export default ProductsList