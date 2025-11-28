<script lang="ts">
	import type { Snippet } from 'svelte';

	let props = $props();

	const stepSnippetMap = $derived(
		Object.keys(props)
			.filter(
				(key) => key.startsWith('step') && typeof props[key as keyof typeof props] === 'function'
			)
			.reduce(
				(map, key) => {
					const isTitle = key.endsWith('Title');
					const stepNum = parseInt(key.replace('step', '').replace('Title', '')) || 0;

					if (!map[stepNum]) {
						map[stepNum] = { title: undefined, content: undefined };
					}

					map[stepNum][isTitle ? 'title' : 'content'] = props[key as keyof typeof props] as Snippet;

					return map;
				},
				{} as Record<number, { title?: Snippet; content?: Snippet }>
			)
	);
</script>

<div class="steps grid grid-cols-[50px_1fr] mt-6" style="counter-reset: section">
	{#each Array(Object.keys(stepSnippetMap).length) as _, i}
		{@render step(stepSnippetMap[i + 1].title, stepSnippetMap[i + 1].content)}
	{/each}
</div>

{#snippet step(titleSnippet: Snippet | undefined, stepSnippet?: Snippet)}
	<div class="left flex flex-col items-center">
		<div
			class="circle relative bg-primary outline shadow-md rounded-full w-[25px] h-[25px] text-white circle"
		></div>
		<div class="line bg-primary w-1 flex-1"></div>
	</div>
	<div
		class="right content ml-4 pb-2.5 [&_a]:text-primary [&_a]:font-semibold [&_a]:decoration-primary/50 [&_a:hover]:underline [&_a:hover]:underline-offset-2"
	>
		{#if titleSnippet}
			<h2 class="text-lg font-bold">
				{@render titleSnippet()}
			</h2>
		{/if}
		{@render stepContent(stepSnippet)}
	</div>
{/snippet}

{#snippet stepContent(stepSnippet?: Snippet)}
	{@render stepSnippet?.()}
{/snippet}

<style>
	.circle::before {
		counter-increment: section;
		content: counter(section);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	/* override last one - target the second-to-last child (last left div) */
	.left:nth-last-child(2) .circle::before {
		content: '✔︎';
	}
</style>
