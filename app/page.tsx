// import Ascii from "./components/Ascii";
import Ascii from "@/app/components/Ascii";

export default function Home() {
  // const getCarType = () => {
  //   return LicenseUtils.getCarTypeData("JWZ148").then((data) => {
  //     return data.carType;
  //   });
  // };

  // const carType = getCarType();

  const carType = "Stationsvagn Kombivagn";

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="dark:bg-black sm:items-start text-orange-300 font-mono text-xs">
        <div className="p-2">
          fetched data: license plate &lt;JWZ148&gt; is of type &lt;{carType}
          &gt;
        </div>

        <div>
          <Ascii />
        </div>
      </main>
    </div>
  );
}
