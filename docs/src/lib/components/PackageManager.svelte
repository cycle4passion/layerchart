<script lang="ts">
	import Code from './Code.svelte';
	import { Tabs } from 'svelte-ux';

	interface Props {
		packageName?: string;
		options?: {
			value: number;
			label: string;
			command: string;
		}[];
	}

	let {
		packageName = 'layerchart',
		options = [
			{
				value: 0,
				label: 'pnpm',
				command: 'pnpm i'
			},
			{
				value: 1,
				label: 'npm',
				command: 'npm i'
			},
			{
				value: 2,
				label: 'bun',
				command: 'bun add'
			},
			{
				value: 3,
				label: 'deno',
				command: 'deno add'
			},
			{
				value: 4,
				label: 'yarn',
				command: 'yarn add'
			}
		]
	}: Props = $props();

	let value = $state(0);
</script>

<div class="grid grid-cols-2 gap-4 pt-4 w-full">
	<Tabs
		{options}
		placement="top"
		bind:value
		classes={{
			content: 'w-full border rounded-b rounded-tr w-full',
			tab: { root: 'rounded-t' }
		}}
	>
		<svelte:fragment slot="content" let:value>
			<Code source={`${options[value].command} ${packageName}`} language="sh" />
		</svelte:fragment>
	</Tabs>
</div>
