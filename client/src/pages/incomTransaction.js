import NavMain from "../component/navbar.js";
import Footer from "../component/footer.js";
import DataTransaction from "../comp-transaction/dataTransaction.js";

function IncomTransaction() {
  const title = "Incom Transaction";
  document.title = "Dewe Tour | " + title;

  return (
    <>
      <NavMain />
      <DataTransaction />
      <Footer />
    </>
  );
}

export default IncomTransaction;
