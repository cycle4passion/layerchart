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
		<div class="circle relative bg-surface-content/20 outline shadow-md rounded-full size-6"></div>
		<div class="line bg-surface-content/10 w-px flex-1"></div>
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
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
		counter-increment: section;
		content: counter(section);
	}

	/* override last one - target the second-to-last child (last left div) */
	.left:nth-last-child(2) .circle::before {
		content: '✔︎';
	}
</style>
