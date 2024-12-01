<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Save } from 'lucide-svelte';

	// save records locally
	function saveRecordsLocally() {
		// fetch the records
		async function fetchRecords() {
			// fetch the records
			const response = await fetch('/records.json');
			// save to local storage
			localStorage.setItem('records', JSON.stringify(await response.json()));
		}
		fetchRecords();
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="flex flex-row gap-2.5">
		<Save />Save
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Saving records locally</Dialog.Title>
			<Dialog.Description>
				Saving records locally will allow you to access them later
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button on:click={() => saveRecordsLocally()}>Save</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
