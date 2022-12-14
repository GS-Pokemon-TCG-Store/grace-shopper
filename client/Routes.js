import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import { fetchProducts } from "./store/allProducts";
import { fetchCart } from "./store/order";
import UserInfo from "./components/UserInfo";
import AllUsers from "./components/AllUsers";
import EditCheckout from "./components/EditCheckout";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.fetchCart();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/payment" component={Payment} />
            <Route path="/checkout/edit" component={EditCheckout} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/editInfo" component={UserInfo} />
            <Route path="/users" component={AllUsers} />
            <Route path="/login" component={Home} />
            <Route path="/signup" component={Home} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    fetchCart: () => dispatch(fetchCart()),
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
