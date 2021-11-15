import NavMain from "../component/navbar.js";
import Footer from "../component/footer.js";
import Product from "../product/product";
import BtnAdd from "../comp-trip/btnAddCountry.js";

function IncomTrip() {
  return (
    <>
      <NavMain />
      <BtnAdd />
      <Product />
      <Footer />
    </>
  );
}

export default IncomTrip;
