import { ValuationChart } from "./_components/chart";
import { getSBIValuation, getTsumikiValuation } from "./data";

export default async function Home() {
  const sbiValuation = await getSBIValuation();
  const tsumikiValuation = await getTsumikiValuation();

  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex flex-col gap-4 px-1">
        <h2 className="text-2xl font-bold">評価額推移</h2>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl">SBI証券</h3>
            <div>{sbiValuation.at(-1)?.value.toLocaleString()} 円</div>
          </div>
          <div className="flex w-full items-center justify-center">
            <ValuationChart data={sbiValuation} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl">tsumiki証券</h3>
            <div>{tsumikiValuation.at(-1)?.value.toLocaleString()} 円</div>
          </div>
          <div className="flex w-full items-center justify-center">
            <ValuationChart data={tsumikiValuation} />
          </div>
        </div>
      </div>
    </div>
  );
}
