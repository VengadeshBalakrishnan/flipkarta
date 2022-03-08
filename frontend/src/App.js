import React from 'react';
import data from './data';
import data1 from './data';

function App() {
  return (
    <div className="grid-container">
        <header className="row">
            <div>
                <a className="brand" href="/">Amazona</a>
            </div>
            <div> <a href="/cart"> Cart </a>
                <a href="/signin"> Sign In </a>
            </div>
        </header>
        <main>
            <div className="row center">
              {
                data.product.map((product) => (
                  <div key={product._id} className="card">
                    <a href={`/product/${product._id}`}>                     
                        <img className="medium" src={product.image} alt="Product" />
                    </a>
                    <div className="card-body">
                        <a href="product.html">
                            <h2> {product.name}</h2>
                        </a>
                    </div>
                    <div className="rating">
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                    </div>
                    <div className="price">
                        ${product.price}
                    </div>
                </div>                
            
                ))
              }
              </div>                
        </main>
        <footer className="row center">
            All right reserved.
        </footer>
    </div>
  )
}

export default App;
