import NavMain from "../component/navbar";
import Footer from "../component/footer";
import DataTransaction from "../comp-transaction/dataTransaction";

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
