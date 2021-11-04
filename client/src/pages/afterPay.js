import NavMain from "../component/navbar";
import Footer from "../component/footer";
import PayWaiting from "../comp-pay/cPayWaiting";

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
