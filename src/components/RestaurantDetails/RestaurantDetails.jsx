import { useEffect, useState } from "react";
import "./RestaurantDetails.css";

export const RestaurantDetails = () => {
  const [resdata, setResdata] = useState([]);
  const [page, setPage] = useState(1);
  const [star,setStar]=useState(null)
  const [payment,setPayment]=useState("")
  const [order,setOrder]=useState("")
  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    fetch(`http://localhost:3001/Restaurant?_limit=3&_page=${page}`)
      .then((Response) => Response.json())
      .then((data) => setResdata(data));
  };

  const starfun=(value)=>{
      setStar(value)
      getStar()
  }
  const getStar=()=>{
      fetch(`http://localhost:3001/Restaurant?rating=${star}`)
      .then((Response) => Response.json())
      .then((data) => setResdata(data));
  }
  const paymentfun=(method)=>{
    setPayment(method)
    getPayment()
  }
  const getPayment=()=>{
    fetch(`http://localhost:3001/Restaurant?Payment_method=${payment}`)
    .then((Response) => Response.json())
    .then((data) => setResdata(data));
  }
  const orderfun=(sort)=>{
      setOrder(sort)
      getOrder()
  }
  const getOrder=()=>{
    fetch(`http://localhost:3001/Restaurant?_sort=cost_for_two&_order=${order}`)
    .then((Response) => Response.json())
    .then((data) => setResdata(data));
  }
  return (

    <div>
        <div className="stars">
          <button onClick={()=>{starfun(1)}}>1 star</button>
          <button onClick={()=>{starfun(2)}}>2 star</button>
          <button onClick={()=>{starfun(3)}}>3 star</button>
          <button onClick={()=>{starfun(4)}}>4 star</button>
          <button onClick={()=>{starfun(5)}}>5 star</button>
      </div>
      <div className="payment">
          <button onClick={()=>{paymentfun("card")}}>card</button>
          <button onClick={()=>{paymentfun("cash")}}>cash</button>
          <button onClick={()=>{getData()}}>all</button>
      </div>
      <div className="order"> 
        <button onClick={()=>{orderfun("asc")}}>asc</button>
        <button onClick={()=>{orderfun("desc")}}>desc</button>
      </div>
      <div className="margin">
        {" "}
        <button
         disabled={page===1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev
        </button>
        <span className="font">{page}</span>
        <button
            disabled={page===7}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          next
        </button>
      </div>
          <hr />
      {resdata.map((elem) => {
        return (
          <div>
            <div className="flax">
              <div className="flex1">
                <div>
                  <img src={elem.img_url} />
                </div>
                <div>
                  <h2>{elem.name}</h2>
                  <p>{elem.categories}</p>
                  <p>cost for two: ${elem.cost_for_two}</p>
                  <p>Min:${elem.min}-Upto 30 min</p>
                  <p>Accept: {elem.Payment_method}</p>
                </div>
              </div>
              <div className="flex2">
                <p>Rating: {elem.rating}</p>
                <p>Votes: {elem.votes}</p>
                <p>Reviews: {elem.reviews}</p>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
      
      
    </div>
  );
};
