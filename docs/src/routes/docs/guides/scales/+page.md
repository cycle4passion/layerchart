<script lang="ts">
	import DomainRange from './DomainRange.svelte';
	import DomainRangeChart from './DomainRangeChart.svelte';
  let [lowDomain, highDomain, lowRange, highRange] = [20, 60, 0, 120];
</script>

# Scales

> WIP

## What is a scale

At its essenece, a scale is a function that maps data values (`domain`) to pixel values (`range`) on a per-dimension basis (x, y, color, etc).

LayerChart uses [d3-scale](https://d3js.org/d3-scale) under the hood which provides many different scales (i.e. "mappers") including `scaleLinear`, `scaleTime`, `scaleBand`, and others.

<DomainRangeChart />

<DomainRange bind:lowDomain bind:highDomain bind:lowRange bind:highRange />

this example basically says data/domain values are between <code>{lowDomain}</code> and <code>{highDomain}</code> and range/pixels values are between <code>{lowRange}</code> and <code>{highRange}</code>, and you would setup this (under the hood, what LayerChart does for you).

<br />
<code>
const xScale = scaleLinear().domain([{lowDomain}, {highDomain}]).range([{lowRange}, {highRange}]);
</code>

or shorthand

<code>
const xScale = scaleLinear([{lowDomain}, {highDomain}], [{lowRange}, {highRange}]);
</code>

and would produce the following:

<code>xScale({lowDomain}) => {lowRange}</code><br />
<code>xScale({highDomain}) => {highRange}</code><br />
<code>xScale(50) => 60</code>

In LayerChart, range and domain are determined / defaulted for you

- `xDomain` => all `x` values in data (based on value accessor),
- `xRange` => `width` of chart (minus left/right padding),
- `yDomain` => all `y` values in data (based on value accessor),
- `yRange` => `height` of chart (minus top/bottom padding)

for most scales, like scaleLinear, you specify the extents (min/max), which is why it is a 2 item array

LayerChart will calcualte these for you, or you can pass an explicit value for one of both. If the other value is `null`, it will be calculated based on the data/chart dimensions

```js
<Chart yDomain={[0, null]} />
```

This means also have a min extent of `0` regardless of your smallest data value, but calculate the max (by specifying `null`)

this guarantees you always show `0` on your a-axis

## Ticks

https://observablehq.com/@d3/scale-ticks?collection=@d3/d3-scale

## Resources

- [Introducing d3-scale](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f 'https://medium.com/@mbostock/introducing-d3-scale-61980c51545f')
- [D3 in Depth: D3 Scale functions](https://www.d3indepth.com/scales/)
- [https://scottmurray.org/tutorials/d3/scales](https://scottmurray.org/tutorials/d3/scales 'https://scottmurray.org/tutorials/d3/scales')
- [https://jckr.github.io/blog/2011/08/11/d3-scales-and-color/](https://jckr.github.io/blog/2011/08/11/d3-scales-and-color/ 'https://jckr.github.io/blog/2011/08/11/d3-scales-and-color/')
- [d3-scale documentation](https://d3js.org/d3-scale)
- https://observablehq.com/@d3/continuous-scales?collection=@d3/d3-scale
