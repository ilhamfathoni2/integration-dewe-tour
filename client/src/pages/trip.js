import NavMain from "../component/navbar.js";
import Footer from "../component/footer.js";
import Addnewtrip from "../comp-addTrip/addTrip.js";

function Trip() {
  return (
    <>
      <NavMain />
      <Addnewtrip />
      <Footer />
    </>
  );
}

export default Trip;
