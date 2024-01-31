import Image from "next/image";
import mainImage from "./icon2.png"
export default function Home() {
  return (
    <main>
      <nav>
        <div>
          <Image src={mainImage} alt="main-icon"/>
        </div>
      </nav>
    </main>
  );
}
