<script lang="ts">
	import { onMount } from 'svelte';
	import { LoaderCircle } from 'lucide-svelte';

	onMount(() => {
		setTimeout(() => {
			window.location.href = '/app';
		}, 3000);
	});
</script>

<main class="flex h-screen max-h-screen flex-col items-center justify-center gap-2.5 p-4">
	<h2 class="border-none font-bold">Bagbag cemetery</h2>
	<div class="flex items-center gap-2.5">
		<LoaderCircle size="32" class="animate-spin" />
	</div>
</main>
