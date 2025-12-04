<script lang="ts">
	import Code from '$lib/components/Code.svelte';

	const source =
		` <script lang="ts">
  import { truncate } from '@layerstack/utils';

	const str = 'This is a really long string of text.';
	</` +
		`script>
	<div>{truncate(str, 21)}</div>
	`;
</script>

<Code {source} language="js" copyButton={false} lang="ts" />
