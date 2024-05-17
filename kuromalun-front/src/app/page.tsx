import TopTagLisť from "@/components/TopTagLisť";
import SlideShow from "@/components/SlideShow";

export default function Home() {
  return (
    <div className="pb-24 bg-backgroundColor">
      <div className="bg-backgroundColor h-fit">
        <TopTagLisť />
      </div>
      <div className="bg-backgroundColor h-fit">
        <SlideShow />
      </div>
      <div className="bg-backgroundColor h-fit p-4">
        <div className="text-mainColor">
          <h1 className="text-xl">大学公認部活動</h1>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-4 overflow-x-scroll py-4">
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/hackathon.PNG" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/tennisCircle.JPG" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/haikei.png" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/haikei.png" alt="背景を挿入" />
          </div>
        </div>
        <div className="text-mainColor">
          <h1 className="text-xl">大学公認同好会</h1>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-4 overflow-x-scroll py-4">
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/hackathon.PNG" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/tennisCircle.JPG" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/haikei.png" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/haikei.png" alt="背景を挿入" />
          </div>
        </div>
        <div className="text-mainColor">
          <h1 className="text-xl">大学非公認サークル</h1>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-4 overflow-x-scroll py-4">
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/hackathon.PNG" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/tennisCircle.JPG" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/haikei.png" alt="背景を挿入" />
            <img className="rounded-lg flex-shrink-0 w-64 h-40" src="/haikei.png" alt="背景を挿入" />
          </div>
        </div>
      </div>
    </div>
  );
}
