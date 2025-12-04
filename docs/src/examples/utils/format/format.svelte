<script lang="ts">
	import { format } from '@layerstack/utils';

	import Code from '$lib/components/Code.svelte';

	const fmtSource =
		` <script lang="ts">
  import { format } from '@layerstack/utils';

  format(1234.56, "integer");
  format(1234.56, "decimal");
  format(1234.56, "currency");
  format(0.5678, "percent");
  format(0.5678, "percentRound");
  format(1_234_567, "metric");
  format(new Date(), "day", { variant: "short" });
  format(new Date(), "custom", { custom: "eee, MMMM do" });
</` +
		`script>
`;

	// Evaluate each line and capture all outputs
	const evaluatedOutput = fmtSource
		.split('\n')
		.map((line) => {
			const trimmed = line.trim();
			if (trimmed.startsWith('format(')) {
				return `${line} // ${eval(trimmed)}`;
			}
			return line;
		})
		.join('\n');
</script>

<Code source={evaluatedOutput} language="js" copyButton={false} lang="ts" />
