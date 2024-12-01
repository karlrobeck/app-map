<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Info } from 'lucide-svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger class="flex flex-row gap-2.5">
		<Info /> About
	</Sheet.Trigger>
	<Sheet.Content side="bottom" class="h-full gap-2.5 overflow-y-auto">
		<Sheet.Header>
			<Sheet.Title>About Bagbag</Sheet.Title>
		</Sheet.Header>
		<div class="space-y-2.5 pt-4">
			<p>
				Bagbag Cemetery application is a robust PWA map navigation system built with modern web
				technologies, ensuring a seamless and interactive user experience. The combination of
				SvelteKit, GeoJSON, and MapTiler SDK allows for the creation of a custom map tailored to the
				needs of Bagbag Cemetery. Deploying on Vercel ensures efficient and reliable hosting with
				easy maintenance and updates. The PWA features further enhance user engagement by a native
				app-like experience.
			</p>
			<h3>Application structure</h3>
			<ul class="list-disc space-y-2.5 pl-8">
				<li>
					<h4>Sveltekit Framework</h4>
					<p>
						Utilized for building the frontend application with reactive components and a
						streamlined development experience.
					</p>
				</li>
				<li>
					<h4>MapTiler SDK for JavaScript</h4>
					<p>
						Integrated to display the custom map created with GeoJSON. Provides various map
						functionalities and customization options.
					</p>
				</li>
				<li>
					<h4>GeoJSON</h4>
					<p>
						Custom GeoJSON file containing geographical data specific to Bagbag Cemetery. This file
						is used to render the map within the application.
					</p>
				</li>
			</ul>
			<h3>PWA Features</h3>
			<ul class="list-disc space-y-2.5 pl-8">
				<li>
					<h4>Web App Manifest</h4>
					<p>
						Configured to include metadata such as the app name, icons, and theme color to enhance
						the native app experience.
					</p>
				</li>
				<li>
					<h4>HTTPS</h4>
					<p>Ensured for secure communication and to meet PWA requirements.</p>
				</li>
			</ul>
			<h3>Map Features</h3>
			<ul class="list-disc space-y-2.5 pl-8">
				<li>
					<h4>Custom Map Display</h4>
					<p>Utilizes GeoJSON data to render a detailed and interactive map of Bagbag Cemetery.</p>
				</li>
				<li>
					<h4>Navigation System</h4>
					<p>
						Provides navigation functionalities to help users find specific locations within the
						cemetery.
					</p>
				</li>
				<li>
					<h4>Responsive Design</h4>
					<p>
						Ensures the application is accessible and functional across various devices and screen
						sizes.
					</p>
				</li>
			</ul>
			<h4 class="muted">Developed By:</h4>
			<ul class="space-y-2.5 pl-8">
				<li class="muted">Genelita G. Biglang-awa</li>
				<li class="muted">Kurt Retzel G. Kenniker</li>
			</ul>
		</div>
	</Sheet.Content>
</Sheet.Root>
