<script lang="ts">
	import { Button } from 'svelte-ux';

	import A from '$lib/markdown/components/a.svelte';
	import Code from '$lib/components/Code.svelte';
  import Example from '$lib/components/Example.svelte';
	import Steps from '$lib/components/Steps.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import Blockquote from '$lib/components/Blockquote.svelte';

	import LucideGithub from '~icons/lucide/github';
	import SimpleIconsStackblitz from '~icons/simple-icons/stackblitz'

	const appcss = `.lc-root-container {
	/* Default marks color when not using explicit color or color scale */
	--color-primary: var(--color-blue-500);

	/* Progressively darker shades representing surfaces (backgrounds). */
	--color-surface-100: var(--color-white);
	--color-surface-200: var(--color-gray-100);
	--color-surface-300: var(--color-gray-300);

	/* Content (text) color */
	--color-surface-content: var(--color-gray-900);
}`;
</script>

# Getting Started

LayerChart can be used standlone, or integrates nicely with other frameworks and design systems.

There is built in first class support for <A href="https://tailwindcss.com/" target="_blank">tailwindcss 4</A>, but this is completely optional and also works seamlessly with regular CSS and inline styles.

<Steps>
	{#snippet step1Title()}
		Create a Project or <a href="#git-up-and-running-even-quicker">Git a Project</a>
	{/snippet}
	{#snippet step1Content()}
			<p class="text-surface-content pt-2">
				Use the Svelte CLI to generate a new SvelteKit project, or continue with an existing project.
			</p>
			<Code
				language="sh"
				title="sh"
				source={`npx sv create my-app add --tailwindcss\ncd my-app`}
				class="mt-4 outline"
			/>
			<Blockquote>To add tailwind to an existing project you can <code>npv sv add tailwindcss</code></Blockquote>
	{/snippet}
	{#snippet step2Title()}
		Import <code>layerchart</code> with your package manager of choice.
	{/snippet}
	{#snippet step2Content()}
			<Tabs keys={['pnpm', 'npm', 'bun', 'deno', 'yarn']} classes={{ root: "py-2", content: 'p-0' }}>
				{#snippet content(value)}
					{#if value === 0}
						<Code language="sh" title="sh" source={`pnpm i layerchart`} />
					{:else if value === 1}
						<Code language="sh" title="sh" source={`npm i layerchart`} />
					{:else if value === 2}
						<Code language="sh" title="sh" source={`bun add layerchart`} />
					{:else if value === 3}
						<Code language="sh" title="sh" source={`deno add layerchart`} />
					{:else if value === 4}
						<Code language="sh" title="sh" source={`yarn add layerchart`} />
					{/if}
				{/snippet}
			</Tabs>
	{/snippet}
	{#snippet step3Title()}
		Apply CSS
	{/snippet}
	{#snippet step3Content()}
	<p class="text-surface-content pt-2">
		Out of the box LayerChart will use <a
			href="https://www.digitalocean.com/community/tutorials/css-currentcolor"
			target="_blank"><code>currentColor</code></a
		> as the default color, but you can customize the CSS globally with a few CSS variables.
	</p>
	<Code language="css" title="app.css" source={appcss} class="mt-4 outline" />
	<p class="pt-4 text-surface-content">
				or with a single <code>.css</code> import, Layerchart <a
					href="https://github.com/techniq/layerchart/tree/next/packages/layerchart/src/lib/styles"
					>provides</a
				> theming conventions for many popular UI frameworks.
			</p>
			<Tabs
				keys={['shadcn-svelte', 'Skeleton 3', 'Skeleton 4', 'Svelte UX', 'DaisyUI 5']}
				classes={{ root: 'mt-4', content: 'p-0' }}
			>
				{#snippet content(value)}
					{#if value === 0}
						<Code language="css" title="app.css" source={`@import 'layerchart/shadcn-svelte.css';`} />
					{:else if value === 1}
						<Code language="css" title="app.css" source={`@import 'layerchart/skeleton-3.css';`} />
					{:else if value === 2}
						<Code language="css" title="app.css" source={`@import 'layerchart/skeleton-4.css';`} />
					{:else if value === 3}
						<Code language="css" title="app.css" source={`@import 'layerchart/svelte-ux.css';`} />
					{:else if value === 4}
						<Code language="css" title="app.css" source={`@import 'layerchart/daisyui-5.css';`} />
					{:else if value === 5}
						<Code language="css" title="app.css" source={`@import 'layerchart/standalone.css';`} />
					{/if}
				{/snippet}
			</Tabs>
	{/snippet}
	{#snippet step4Title()}
		Create you first chart
	{/snippet}
	{#snippet step4Content()}
		<p class="text-surface-content pt-2">
			Import the charting components you need from <code>layerchart</code>. Don't forget to take a look at the large collection of <a href="/docs/examples">examples</a> for some additonal inspiration.
		</p>
		<div class="mt-4">
			<Example component="LineChart" name="basic" showCode={true} />
		</div>
	{/snippet}
	{#snippet step5Title()}
		Done!
	{/snippet}
	{#snippet step5Content()}
		<Tabs keys={['pnpm', 'npm', 'bun', 'deno', 'yarn']} hasTitle={false}  classes={{ root: "pt-2", content: 'p-0' }}>
			{#snippet content(value)}
			{#if value === 0}
					<Code language="sh" title="sh" source={`pnpm dev`} />
				{:else if value === 1}
					<Code language="sh" title="sh" source={`npm run dev`} />
				{:else if value === 2}
					<Code language="sh" title="sh" source={`bun run dev`} />
				{:else if value === 3}
					<Code language="sh" title="sh" source={`deno task dev`} />
				{:else if value === 4}
					<Code language="sh" title="sh" source={`yarn dev`} />
				{/if}
			{/snippet}
		</Tabs>
	{/snippet}
</Steps>

### Git up and running even quicker!

Starter [project repos](https://github.com/techniq/layerchart/tree/next/examples) are available for popular UI frameworks.

<Tabs keys={["shadcn-svelte","Skeleton", "Svelte UX", "daisyUI", "Standalone CSS"]} classes={{content: 'h-[120px] [&_a]:text-primary [&_a:hover]:underline'}} activeClass="bg-surface-200 border-b-surface-200">
{#snippet content(value)}
{#if value === 0}

<div><a href="https://www.shadcn-svelte.com/", target="\_blank">shadcn-svelte</a></div>
<div class='pt-2'>Starter Project v1
{@render githubButton('shadcn-svelte-1')}
{@render stackBlitzButton('shadcn-svelte-1')}</div>
{:else if value === 1}
<div><a href="https://www.skeleton.dev/", target="\_blank">Skeleton</a></div>
<div class='pt-2'>Starter Project v3
{@render githubButton('skeleton-3')}
{@render stackBlitzButton('skeleton-3')}</div>
<div>Starter Project v4
{@render githubButton('skeleton-4')}
{@render stackBlitzButton('skeleton-4')}</div>
{:else if value === 2}
<div><a href="https://www.shadcn-svelte.com/", target="\_blank">shadcn-svelte</a></div>
<div class='pt-2'>v2 Works out of the box!</div>
{:else if value === 3}
<div><a href="https://daisyui.com/", target="\_blank">shadcn-svelte</a></div>
<div class='pt-2'>Starter Project v5
{@render githubButton('dauilyui-5')}
{@render stackBlitzButton('daisyui-5')}</div>
{:else if value === 4}
<div class='pt-2'>Start Project Standalone CSS {@render githubButton('svelte-ux-2')}
{@render stackBlitzButton('svelte-ux-2')}</div>
{/if}
{/snippet}
</Tabs>

{#snippet githubButton(path, text = 'Source')}
<Button href="https://github.com/techniq/layerchart/tree/docs-v2/examples/{path}" icon={LucideGithub} size="sm" variant="fill-light" target="\_blank">{text}</Button>
{/snippet}

{#snippet stackBlitzButton(path, text = 'Open in StackBlitz')}
<Button href="https://stackblitz.com/github/techniq/layerchart/tree/docs-v2/examples/{path}" icon={SimpleIconsStackblitz} size="sm" variant="fill-light" target="\_blank">{text}</Button>
{/snippet}
