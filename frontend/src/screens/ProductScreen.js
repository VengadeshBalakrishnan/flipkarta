import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate  } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate ();

  const params = useParams();
  const { id } = params;
  const [qty, setQty] = useState(1);
  const productDetail = useSelector((state) => state.productDetails);
  const { loading, error, selectedProducts } = productDetail;

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`, {
      state: {
        id: id,
        qty: qty,
      },
    });
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          <div>
            <Link to="/">Back to Result</Link>
            <div className="row top">
              <div className="col-2">
                <img
                  className="large"
                  src={selectedProducts.image}
                  alt={selectedProducts.name}
                ></img>
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1> {selectedProducts.name}</h1>
                  </li>
                  <li>
                    <Rating
                      rating={selectedProducts.rating}
                      numReview={selectedProducts.numReview}
                    ></Rating>
                  </li>
                  <li>Price: $ {selectedProducts.price}</li>
                  <li>Description: {selectedProducts.description}</li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div> Price </div>
                        <div className="price"> $ {selectedProducts.price}</div>
                      </div>
                      <div className="row">
                        <div> Status </div>
                        <div>
                          {selectedProducts.countInStock > 0 ? (
                            <span className="success"> In Stock</span>
                          ) : (
                            <span className="danger">Unavailable</span>
                          )}
                        </div>
                      </div>
                    </li>
                    {selectedProducts.countInStock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div> Qty</div>
                            <div>
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[
                                  ...Array(
                                    selectedProducts.countInStock
                                  ).keys(),
                                ].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button className="primary block" onClick={addToCartHandler}>Add to Cart</button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
