<script lang="ts">
	import { onMount } from 'svelte';
	import { Tooltip } from 'svelte-ux';
	import { cls } from '@layerstack/tailwind';

	let {
		title = '',
		low = $bindable(20),
		high = $bindable(60),
		min = 0,
		max = 100,
		value = $bindable(0),
		minWidth = 150,
		containerRef = $bindable(),
		className = ''
	} = $props();

	let containerEl: HTMLDivElement;
	let containerWidth = 0;

	const range = $derived(max - min);
	const domain = $derived(Math.round(low + (high - low) / 2));

	let resizingFrom: 'left' | 'right' | null = null;
	let startX = 0;
	let startLow = 0;
	let startHigh = 0;

	onMount(() => {
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};
	});

	function startResize(e: MouseEvent, side: 'left' | 'right') {
		resizingFrom = side;
		startX = e.pageX;
		startLow = low;
		startHigh = high;
		e.preventDefault();
	}

	function onMouseMove(e: MouseEvent) {
		if (!resizingFrom || !containerEl) return;

		containerWidth = containerEl.clientWidth;
		if (containerWidth === 0 || range === 0) return;

		const deltaPx = e.pageX - startX;
		const deltaValue = (deltaPx / containerWidth) * range;
		const minWidthValue = (minWidth / containerWidth) * range;

		if (resizingFrom === 'left') {
			const newLow = Math.round(
				Math.min(Math.max(min, startLow + deltaValue), startHigh - minWidthValue)
			);
			low = newLow;
		} else if (resizingFrom === 'right') {
			const newHigh = Math.round(
				Math.max(Math.min(max, startHigh + deltaValue), startLow + minWidthValue)
			);
			high = newHigh;
		}
	}

	function onMouseUp() {
		resizingFrom = null;
	}

	$effect(() => {
		if (containerEl) {
			containerRef = containerEl;
		}
	});
</script>

<div bind:this={containerEl} class={cls('relative w-full h-16', className)}>
	<!-- Resizable bar -->
	<div
		class="absolute h-full text-primary p-6 overflow-hidden bg-primary/10 rounded-sm outline-2 outline-primary-700 flex items-center justify-between"
		style:left={range > 0 ? ((low - min) / range) * 100 + '%' : '0%'}
		style:width={range > 0 ? ((high - low) / range) * 100 + '%' : '0%'}
		style:min-width={minWidth + 'px'}
	>
		<span>{Math.round(low)}</span>
		<div class="flex flex-col items-center">
			<div>{title}</div>
			<div>{domain}</div>
		</div>
		<span>{Math.round(high)}</span>

		<button
			aria-label="left handle"
			class="absolute left-0 top-0 bottom-0 w-4 bg-primary/50 opacity-50 hover:opacity-100 cursor-col-resize z-50 flex items-center justify-center"
			onmousedown={(e) => startResize(e, 'left')}
		>
			<div class="w-0.5 h-1/4 bg-primary"></div>
		</button>

		<button
			aria-label="right handle"
			class="absolute right-0 top-0 bottom-0 w-4 bg-primary/50 opacity-50 hover:opacity-100 cursor-col-resize z-50 flex items-center justify-center"
			onmousedown={(e) => startResize(e, 'right')}
		>
			<div class="w-0.5 h-1/4 bg-primary"></div>
		</button>
	</div>
</div>
