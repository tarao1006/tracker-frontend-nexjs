import { getDetails, getValuation } from "@/app/data";
import { styled } from "@/styled-system/jsx";
import { default as nextDynamic } from "next/dynamic";

const ValuationChart = nextDynamic(() => import("./_components/chart"), {
	ssr: false,
});

export const dynamic = "force-dynamic";

export default async function Home() {
	const valuation = await getValuation();
	const details = await getDetails();

	const calculateDiff = (a: number | undefined, b: number | undefined) => {
		if (a === undefined || b === undefined) {
			return { diff: undefined, diffPercentage: undefined };
		}
		return { diff: a - b, diffPercentage: ((a - b) / b) * 100 };
	};

	const calculate = () => {
		const current = valuation[valuation.length - 1]?.value;
		const previous = valuation[valuation.length - 2]?.value;
		const deposit = details[details.length - 1]?.value;

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

	const dataAttr = (condition: boolean) => {
		return condition ? "" : undefined;
	};

	return (
		<styled.div
			display="block grid"
			justifyContent="center"
			maxWidth="min(1024px, 100vw)"
			marginX="auto"
			marginTop="12"
			rowGap="10"
		>
			<styled.div
				color="white"
				display="grid"
				columnGap="12"
				rowGap="1"
				gridTemplateColumns="max-content 1fr"
				justifyContent="space-between"
				borderStyle="solid"
				borderColor="gray.200"
				borderWidth="1px"
				borderRadius="lg"
				paddingY="3"
				paddingX="6"
				width="max-content"
				divideStyle="solid"
				divideColor="gray.200"
				divideY="1px"
				marginX="auto"
				fontVariantNumeric="tabular-nums"
			>
				<styled.div
					display="grid"
					gridColumn="-1 / 1"
					gridTemplateColumns="subgrid"
				>
					<styled.div>評価額</styled.div>
					<styled.div textAlign="right">
						{current?.toLocaleString()} 円
					</styled.div>
				</styled.div>

				<styled.div
					display="grid"
					gridColumn="-1 / 1"
					gridTemplateColumns="subgrid"
				>
					<styled.div>前日比</styled.div>
					<styled.div
						textAlign="right"
						data-positive={dataAttr(diffPerDay !== undefined && diffPerDay > 0)}
						data-negative={dataAttr(diffPerDay !== undefined && diffPerDay < 0)}
						_positive={{
							color: "green.500",
						}}
						_negative={{
							color: "red.500",
						}}
					>
						{diffPerDay?.toLocaleString()} 円 / (
						{diffPercentagePerDay?.toFixed(2)} %)
					</styled.div>
				</styled.div>

				<styled.div
					display="grid"
					gridColumn="-1 / 1"
					gridTemplateColumns="subgrid"
				>
					<styled.div>入金額</styled.div>
					<styled.div textAlign="right">
						{deposit?.toLocaleString()} 円
					</styled.div>
				</styled.div>

				<styled.div
					display="grid"
					gridColumn="-1 / 1"
					gridTemplateColumns="subgrid"
				>
					<styled.div>差額</styled.div>
					<styled.div
						textAlign="right"
						data-positive={dataAttr(diff !== undefined && diff > 0)}
						data-negative={dataAttr(diff !== undefined && diff < 0)}
						_positive={{
							color: "green.500",
						}}
						_negative={{
							color: "red.500",
						}}
					>
						{diff?.toLocaleString()} 円 / ({diffPercentage?.toFixed(2)} %)
					</styled.div>
				</styled.div>
			</styled.div>

			<ValuationChart data={valuation} />
		</styled.div>
	);
}
