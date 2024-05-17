<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<main class="flex flex-col gap-5">
	<h1>Welcome to Bagbag Cemetery</h1>
	<p>Explore and navigate the cemetery with our mapping services. Click to Get Started now</p>
	<div class="flex flex-wrap gap-2">
		<Button href="/maps">Get started</Button>
		<Button variant="ghost" href="/about">Learn more</Button>
	</div>
</main>
