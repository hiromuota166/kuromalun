import Image from "next/image";
import SlideShow from "@/components/SlideShow";

export default function Home() {
  return (
    <div className="bg-backgroundColor">
      <div className="bg-backgroundColor h-fit">
        <SlideShow />
      </div>
      <div className="bg-backgroundColor h-fit p-4">
        <div className="text-mainColor">
          <h1 className="text-xl">大学公認部活動</h1>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-4 overflow-x-scroll py-4">
            <Image src="/hackathon.PNG" alt="背景を挿入"  className="rounded-lg flex-shrink-0" width={256} height={160} />
            <Image src="/tennisCircle.JPG" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
            <Image src="/haikei.png" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
            <Image src="/haikei.png" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
          </div>
        </div>
        <div className="text-mainColor">
          <h1 className="text-xl">大学公認同好会</h1>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-4 overflow-x-scroll py-4">
            <Image src="/hackathon.PNG" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
            <Image src="/tennisCircle.JPG" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
            <Image src="/haikei.png" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
            <Image src="/haikei.png" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
          </div>
        </div>
        <div className="text-mainColor">
          <h1 className="text-xl">大学非公認サークル</h1>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-4 overflow-x-scroll py-4">
            <Image src="/hackathon.PNG" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
            <Image src="/tennisCircle.JPG" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
            <Image src="/haikei.png" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
            <Image src="/haikei.png" alt="背景を挿入"  className="rounded-lg flex-shrink-0"  width={256} height={160} />
          </div>
        </div>
      </div>
    </div>
  );
}
