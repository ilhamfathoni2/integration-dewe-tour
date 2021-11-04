import NavMain from "../component/navbar";
import Footer from "../component/footer";
import TitleDetail from "../comp-detail/detailTitle";
import ImageDetail from "../comp-detail/imageDetail";
import Description from "../comp-detail/desc";
import PriceDetail from "../comp-detail/price";

function Detail() {
  return (
    <>
      <NavMain />
      <TitleDetail />
      <ImageDetail />
      <Description />
      <PriceDetail />
      <Footer />
    </>
  );
}

export default Detail;
