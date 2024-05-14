import TopTagLisť from "@/components/TopTagLisť";
import SlideShow from "@/components/SlideShow";

export default function Home() {
  return (
    <div className="">
      <div className="bg-backgroundColor h-fit">
        <TopTagLisť />
      </div>
      <div className="bg-backgroundColor h-fit">
        <SlideShow />
      </div>
      <div className="bg-backgroundColor h-fit">
        <h1>Home</h1>
      </div>
    </div>

  );
}
