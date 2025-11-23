import type { Component } from 'svelte';
import { error } from '@sveltejs/kit';

import {
	allComponents,
	type Component as ComponentMetadata,
	allExamples,
	type Example as ExampleMetadata
} from 'content-collections';

import type { Examples } from '$lib/types.js';
import type { ComponentCatalog } from '$examples/catalog/types.js';

/**
 * Get markdown document component and metadata (frontmatter)
 * @param slug
 * @returns
 */
export async function getMarkdownComponent(slug: string = 'index') {
	const modules = import.meta.glob<{
		default: Component;
		metadata: ComponentMetadata | ExampleMetadata;
	}>('/src/content/**/*.md');

	let doc: Awaited<ReturnType<(typeof modules)[string]>> | null = null;
	for (const [path, resolver] of Object.entries(modules)) {
		if (path === `/src/content/components/${slug}.md`) {
			doc = await resolver();
			break;
		}
	}

	const metadata = getMetadata(slug);

	if (!doc || !metadata) {
		error(404, 'Could not find the document.');
	}

	return {
		PageComponent: doc.default,
		metadata
	};
}

/**
 * Get full metadata (authored frontmatter + content-collection transformed)
 */
function getMetadata(slug: string): ComponentMetadata {
	return allComponents.find((c) => c.slug === slug) as any;
}

/**
 * Extract examples from markdown content and load their components
 * @param markdownContent - The markdown content to extract examples from
 * @param catalog - Optional catalog to include examples from
 * @param allExamples - Glob import of all example components
 * @param allSources - Glob import of all example sources
 * @param defaultComponent - Optional default component name (from route params)
 * @returns Examples object with loaded components and sources
 */
export async function loadExamplesFromMarkdown(
	markdownContent: string,
	catalog: ComponentCatalog | null,
	allExamples: Record<string, () => Promise<any>>,
	allSources: Record<string, () => Promise<any>>,
	defaultComponent?: string
): Promise<Examples> {
	// Extract all <Example component="..." name="..."> from markdown content
	const regex = /<Example\s+([^>]*?)\/>/g;
	const matches = [...markdownContent.matchAll(regex)];
	const pageExamples = matches.map((match) => {
		const attrs = match[1];
		const component = attrs.match(/component="([^"]*?)"/)?.[1] || defaultComponent; // use default component if not explicit (ex. <Example name="basic" />)
		const name = attrs.match(/name="([^"]*?)"/)?.[1] || null;
		return { component, name };
	});

	const examples: Examples = {};
	for (const path in allExamples) {
		if (
			catalog?.examples.some(
				(example) => path === `/src/examples/${catalog.component}/${example.name}.svelte`
			) ||
			pageExamples.some(
				(example) => path === `/src/examples/${example.component}/${example.name}.svelte`
			)
		) {
			const component = (await allExamples[path]()) as Component;
			const source = (await allSources[path]()) as string;
			const [_, __, ___, componentName, filename] = path.split('/');
			const name = filename.replace('.svelte', '');

			// Remove `export { data };`
			// TODO: Also remove blank lines left behind
			const cleanupSource = source.replace(/^.*export .*;.*$/gm, '');

			if (!examples[componentName]) {
				examples[componentName] = {};
			}
			examples[componentName][name] = { component, source: cleanupSource };
		}
	}

	return examples;
}
