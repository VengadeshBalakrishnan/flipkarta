import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import SimpleImageSlider from "react-simple-image-slider";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import OfferOrder from "../components/OfferOrder";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const images = [{ url: "../../../images/home1.jpg" }];

  const properties = {
    duration: 5000,
    autoplay: true,
    // transitionDuration: 50000,
    // arrows: true,
    // infinite: false,
    // easing: "ease",
    // //indicators: (i) => <div className="indicator">{i + 6}</div>,
  };

  const orderImages = [
    {
      id: 1,
      name: "Top Offers",
      url: "../../../images/offerOrder/offer1.webp",
    },
    { id: 2, name: "Grocery", url: "../../../images/offerOrder/offer2.webp" },
    { id: 3, name: "Mobiles", url: "../../../images/offerOrder/offer3.webp" },
    { id: 4, name: "Fashion", url: "../../../images/offerOrder/offer4.webp" },
    {
      id: 5,
      name: "Electronics",
      url: "../../../images/offerOrder/offer5.webp",
    },
    { id: 6, name: "Home", url: "../../../images/offerOrder/offer6.webp" },
    { id: 7, name: "Appliance", url: "../../../images/offerOrder/offer7.webp" },
    { id: 8, name: "Travels", url: "../../../images/offerOrder/offer8.webp" },
    { id: 9, name: "Beauty", url: "../../../images/offerOrder/offer9.webp" },
  ];

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="orderParent item">
            {orderImages.map((image, index) => (
              <OfferOrder key={index} order={image}></OfferOrder>
            ))}
          </div>
          <div>
            <SimpleImageSlider
              width="100%"
              height={250}
              images={images}
              showBullets={true}
              showNavs={true}
            />
          </div>
          <div className="rowImages center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
