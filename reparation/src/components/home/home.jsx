import Description from "./description";
import { Carousel } from "./Carousel";
import img1 from '../../assets/img/carousel/bg1.jpg';
import img2 from '../../assets/img/carousel/bg2.jpg';
import img3 from '../../assets/img/carousel/bg3.jpg';
import Services from "./services";

export default function Home() {
  const data = [
    {
      "src": img1,
      "alt": "Image 1 for carousel"
    },
    {
      "src": img2,
      "alt": "Image 2 for carousel"
    },
    {
      "src": img3,
      "alt": "Image 3 for carousel"
    }
  ]
  return (
    <>
      <Carousel data={data} />
      <Description />
      <Services />
    </>
  );
}
