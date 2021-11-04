import { Container, Image } from "react-bootstrap";
import "./detail.css";
import imageHead from "../src-assets/d11.png";
import image1 from "../src-assets/d112.png";
import image2 from "../src-assets/d113.png";
import image3 from "../src-assets/d114.png";

function ImageDetail() {
  return (
    <>
      <Container>
        <Image src={imageHead} className="image-head" />
        <div className="d-flex justify-content-between mt-4 mb-10">
          <Image src={image1} />
          <Image src={image2} />
          <Image src={image3} />
        </div>
      </Container>
    </>
  );
}

export default ImageDetail;
