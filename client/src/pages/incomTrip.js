import NavMain from "../component/navbar";
import Footer from "../component/footer";
import Product from "../product/product";
import BtnAdd from "../comp-trip/btnAddCountry";

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
