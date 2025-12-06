<script lang="ts">
	import { onMount } from 'svelte';
	import ResizableRange from './Resizable.svelte';

	let {
		lowDomain = $bindable(20),
		highDomain = $bindable(60),
		lowRange = $bindable(0),
		highRange = $bindable(120)
	} = $props();
	// not sure how to bind a derived value to expose customDomain and customRange to the parent component

	let customDomain = $derived(Math.round(lowDomain + (highDomain - lowDomain) / 2));
	let customRange = $derived(Math.round(lowRange + (highRange - lowRange) / 2));

	let domainMin = $state(0);
	let domainMax = $state(100);
	let rangeMin = $state(0);
	let rangeMax = $state(120);

	let containerEl: HTMLDivElement;
	let firstRangeContainer = $state<HTMLDivElement | undefined>(undefined);
	let secondRangeContainer = $state<HTMLDivElement | undefined>(undefined);

	let lineStartX = $state(0);
	let lineStartY = $state(0);
	let lineEndX = $state(0);
	let lineEndY = $state(0);

	let line2StartX = $state(0);
	let line2StartY = $state(0);
	let line2EndX = $state(0);
	let line2EndY = $state(0);

	let arrowStartX = $state(0);
	let arrowStartY = $state(0);
	let arrowEndX = $state(0);
	let arrowEndY = $state(0);

	function updateLine() {
		if (!containerEl || !firstRangeContainer || !secondRangeContainer) return;

		const containerRect = containerEl.getBoundingClientRect();
		const firstRect = firstRangeContainer.getBoundingClientRect();
		const secondRect = secondRangeContainer.getBoundingClientRect();

		const firstRange = domainMax - domainMin;
		const secondRange = rangeMax - rangeMin;
		if (firstRange === 0 || secondRange === 0) return;

		const firstBarLeft = ((lowDomain - domainMin) / firstRange) * firstRect.width;
		const firstBarRight = ((highDomain - domainMin) / firstRange) * firstRect.width;
		const firstBarWidth = firstBarRight - firstBarLeft;
		const secondBarLeft = ((lowRange - rangeMin) / secondRange) * secondRect.width;
		const secondBarRight = ((highRange - rangeMin) / secondRange) * secondRect.width;
		const secondBarWidth = secondBarRight - secondBarLeft;

		// Bottom left of first range's bar (relative to container)
		lineStartX = firstRect.left - containerRect.left + firstBarLeft;
		lineStartY = firstRect.bottom - containerRect.top;

		// Top left of second range's bar (relative to container)
		lineEndX = secondRect.left - containerRect.left + secondBarLeft;
		lineEndY = secondRect.top - containerRect.top;

		// Bottom right of first range's bar (relative to container)
		line2StartX = firstRect.left - containerRect.left + firstBarRight;
		line2StartY = firstRect.bottom - containerRect.top;

		// Top right of second range's bar (relative to container)
		line2EndX = secondRect.left - containerRect.left + secondBarRight;
		line2EndY = secondRect.top - containerRect.top;

		// Bottom center of first range's bar (relative to container)
		arrowStartX = firstRect.left - containerRect.left + firstBarLeft + firstBarWidth / 2;
		arrowStartY = firstRect.bottom - containerRect.top;

		// Top center of second range's bar (relative to container)
		arrowEndX = secondRect.left - containerRect.left + secondBarLeft + secondBarWidth / 2;
		arrowEndY = secondRect.top - containerRect.top;
	}

	$effect(() => {
		updateLine();
	});

	$effect(() => {
		lowDomain;
		highDomain;
		lowRange;
		highRange;
		domainMin;
		domainMax;
		rangeMin;
		rangeMax;
		updateLine();
	});

	onMount(() => {
		updateLine();
		const resizeObserver = new ResizeObserver(() => {
			updateLine();
		});
		if (containerEl) resizeObserver.observe(containerEl);
		if (firstRangeContainer) resizeObserver.observe(firstRangeContainer);
		if (secondRangeContainer) resizeObserver.observe(secondRangeContainer);
		return () => resizeObserver.disconnect();
	});

	$effect(() => {
		if (firstRangeContainer && secondRangeContainer) {
			const resizeObserver = new ResizeObserver(() => {
				updateLine();
			});
			resizeObserver.observe(firstRangeContainer);
			resizeObserver.observe(secondRangeContainer);
			return () => resizeObserver.disconnect();
		}
	});
</script>

<div bind:this={containerEl} class="relative m-4">
	<ResizableRange
		bind:containerRef={firstRangeContainer}
		title="Domain"
		bind:value={customDomain}
		bind:low={lowDomain}
		bind:high={highDomain}
		min={domainMin}
		max={domainMax}
		className="mb-20"
	/>
	<ResizableRange
		bind:containerRef={secondRangeContainer}
		title="Range"
		bind:value={customRange}
		bind:low={lowRange}
		bind:high={highRange}
		min={rangeMin}
		max={rangeMax}
	/>

	<!-- SVGs connecting the two ranges -->
	<svg class="absolute inset-0 pointer-events-none z-10 w-full">
		<defs>
			<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
				<polygon points="0 0, 10 3, 0 6" class="fill-balck dark:fill-white" />
			</marker>
		</defs>
		<!-- Line from bottom left of first range to top left of second range -->
		<line
			x1={lineStartX}
			y1={lineStartY}
			x2={lineEndX}
			y2={lineEndY}
			class="stroke-black dark:stroke-white -z-1"
			stroke-width="2"
		/>
		<!-- Line from bottom right of first range's bar to top right of second range's bar -->
		<line
			x1={line2StartX}
			y1={line2StartY}
			x2={line2EndX}
			y2={line2EndY}
			class="stroke-black dark:stroke-white -z-1"
			stroke-width="2"
		/>
		<!-- Arrow from bottom center of first range to top center of second range -->
		<line
			x1={arrowStartX}
			y1={arrowStartY}
			x2={arrowEndX}
			y2={arrowEndY}
			class="stroke-black dark:stroke-white -z-1"
			stroke-width="2"
			marker-end="url(#arrowhead)"
		/>
	</svg>
</div>
