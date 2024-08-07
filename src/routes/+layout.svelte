<script lang="ts">
	import '../app.pcss';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Separator } from '$lib/components/ui/separator';
	import { page } from '$app/stores';
	import * as Select from '$lib/components/ui/select/index.js';
</script>

<slot></slot>
