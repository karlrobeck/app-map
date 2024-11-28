<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Save } from 'lucide-svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger class="flex flex-row gap-2.5">
		<Save />Save
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
			<Sheet.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
