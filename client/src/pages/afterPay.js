import NavMain from "../component/navbar.js";
import Footer from "../component/footer.js";
import PayWaiting from "../comp-pay/cPayWaiting.js";

function AfterPay() {
  return (
    <>
      <NavMain />
      <PayWaiting />
      <Footer />
    </>
  );
}

export default AfterPay;
