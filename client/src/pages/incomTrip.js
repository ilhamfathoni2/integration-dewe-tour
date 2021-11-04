import NavMain from "../component/navbar";
import Footer from "../component/footer";
import Product from "../product/product";
import Btnaddtrip from "../comp-trip/btnAddTrip";

function IncomTrip() {
  return (
    <>
      <NavMain />
      <Btnaddtrip />
      <Product />
      <Footer />
    </>
  );
}

export default IncomTrip;
