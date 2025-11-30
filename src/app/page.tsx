import { ValuationChart } from "./_components/chart";
import { cn } from "./cn";
import { getDetails, getValuation } from "./data";

export default async function Home() {
  const valuation = await getValuation();
  const details = await getDetails();

  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex justify-center">
        <CurrentValuation valuation={valuation} details={details} />
      </div>
      <div className="flex flex-col gap-4 px-5">
        <h2 className="text-2xl font-bold">評価額推移</h2>
        <h3 className="text-xl">SBI証券</h3>
        <div className="flex w-full items-center justify-center px-5">
          <ValuationChart data={valuation} />
        </div>
      </div>
    </div>
  );
}

const CurrentValuation = ({
  valuation,
  details,
}: {
  valuation: { date: string; value: number }[];
  details: { date: string; value: number }[];
}) => {
  const calculateDiff = (a: number | undefined, b: number | undefined) => {
    if (a === undefined || b === undefined) {
      return { diff: undefined, diffPercentage: undefined };
    }
    return { diff: a - b, diffPercentage: ((a - b) / b) * 100 };
  };

  const calculate = () => {
    const current = valuation.at(-1)?.value;
    const previous = valuation.at(-2)?.value;
    const deposit = details.at(-1)?.value;

    const { diff, diffPercentage } = calculateDiff(current, deposit);
    const { diff: diffPerDay, diffPercentage: diffPercentagePerDay } =
      calculateDiff(current, previous);

    return {
      current,
      previous,
      deposit,
      diff,
      diffPercentage,
      diffPerDay,
      diffPercentagePerDay,
    };
  };

  const {
    current,
    deposit,
    diff,
    diffPercentage,
    diffPerDay,
    diffPercentagePerDay,
  } = calculate();

  return (
    <div className="text-numeric grid w-max grid-cols-[max-content_1fr] justify-between divide-y divide-black rounded-lg border border-solid border-black px-3">
      <div className="col-span-full grid grid-cols-subgrid py-2">
        <div>評価額</div>
        <div className="text-right">{current?.toLocaleString()} 円</div>
      </div>

      <div className="col-span-full grid grid-cols-subgrid py-2">
        <div>前日比</div>
        <div
          className={cn(
            "text-right",
            diffPerDay !== undefined && diffPerDay > 0 ? "text-green-600" : "",
            diffPerDay !== undefined && diffPerDay < 0 ? "text-red-600" : "",
          )}
        >
          {diffPerDay?.toLocaleString()} 円 / (
          {diffPercentagePerDay?.toFixed(2)} %)
        </div>
      </div>

      <div className="col-span-full grid grid-cols-subgrid py-2">
        <div>入金額</div>
        <div className="text-right">{deposit?.toLocaleString()} 円</div>
      </div>

      <div className="col-span-full grid grid-cols-subgrid py-2">
        <div>差額</div>
        <div
          className={cn(
            "text-right",
            diff !== undefined && diff > 0 ? "text-green-600" : "",
            diff !== undefined && diff < 0 ? "text-red-500" : "",
          )}
        >
          {diff?.toLocaleString()} 円 / ({diffPercentage?.toFixed(2)} %)
        </div>
      </div>
    </div>
  );
};
