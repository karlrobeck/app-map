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

{#if $page.url.pathname === '/maps'}
	<div>
		<div class="absolute z-10 flex w-screen justify-between">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button class="m-4" builders={[builder]} variant="secondary">
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M14 12.85L1 12.85L1 14.15L14 14.15L14 12.85ZM14 8.85002L1 8.85002L1 10.15L14 10.15L14 8.85002ZM1 4.85003L14 4.85003L14 6.15003L1 6.15002L1 4.85003ZM14 0.850025L1 0.850025L1 2.15002L14 2.15002L14 0.850025Z"
								fill="currentColor"
								fill-rule="evenodd"
								clip-rule="evenodd"
							></path></svg
						>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left">
					<Sheet.Header>
						<Sheet.Title>Bag Bag Cemetary</Sheet.Title>
						<Sheet.Description>Main Menu</Sheet.Description>
					</Sheet.Header>
					<Separator class="my-4" />
					<ul role="menubar" class="flex flex-col gap-2">
						<li role="menuitem">
							<Button href="/" variant="ghost" class="flex w-full justify-start gap-2">
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
									></path></svg
								>
								Home
							</Button>
						</li>
						<li role="menuitem">
							<Button href="/maps" variant="ghost" class="flex w-full justify-start gap-2">
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M10.3285 1.13607C10.1332 0.940809 9.81662 0.940808 9.62136 1.13607C9.42609 1.33133 9.42609 1.64792 9.62136 1.84318L10.2744 2.49619L5.42563 6.13274L4.31805 5.02516C4.12279 4.8299 3.80621 4.8299 3.61095 5.02516C3.41569 5.22042 3.41569 5.537 3.61095 5.73226L5.02516 7.14648L6.08582 8.20714L2.81545 11.4775C2.62019 11.6728 2.62019 11.9894 2.81545 12.1846C3.01072 12.3799 3.3273 12.3799 3.52256 12.1846L6.79293 8.91425L7.85359 9.97491L9.2678 11.3891C9.46306 11.5844 9.77965 11.5844 9.97491 11.3891C10.1702 11.1939 10.1702 10.8773 9.97491 10.682L8.86733 9.57443L12.5039 4.7257L13.1569 5.37871C13.3522 5.57397 13.6687 5.57397 13.864 5.37871C14.0593 5.18345 14.0593 4.86687 13.864 4.6716L12.8033 3.61094L11.3891 2.19673L10.3285 1.13607ZM6.13992 6.84702L10.9887 3.21047L11.7896 4.01142L8.15305 8.86015L6.13992 6.84702Z"
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
									></path></svg
								>
								Maps
							</Button>
						</li>
						<li role="menuitem">
							<Button href="/about" variant="ghost" class="flex w-full justify-start gap-2">
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
									></path></svg
								>
								About
							</Button>
						</li>
						<li role="menuitem">
							<Button href="/" variant="ghost" class="flex w-full justify-start gap-2">
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
									></path></svg
								>
								Download our app
							</Button>
						</li>
					</ul>
				</Sheet.Content>
			</Sheet.Root>
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button class="m-4 mr-20 w-1/4 justify-start" builders={[builder]} variant="secondary"
						>Search</Button
					>
				</Sheet.Trigger>
				<Sheet.Content side="right" class="overflow-y-auto">
					<Sheet.Header>
						<Sheet.Title>Search Tab</Sheet.Title>
					</Sheet.Header>
					<Input placeholder="Search a tomb" />
					<div class="my-4" />
					<h4>Filters:</h4>
					<div class="my-4 grid grid-cols-2 gap-2">
						<Select.Root>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Select Gender" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Gender</Select.Label>
									<Select.Item value="male" label="Male">Male</Select.Item>
									<Select.Item value="female" label="Female">Female</Select.Item>
								</Select.Group>
							</Select.Content>
							<Select.Input name="favoriteFruit" />
						</Select.Root>
						<Select.Root>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Select Age" />
							</Select.Trigger>
							<Select.Content>
								<ScrollArea class="h-32 w-full rounded-md border">
									<Select.Group>
										<Select.Label>Age</Select.Label>
										{#each { length: 100 } as _, i}
											<Select.Item value={i + 1} label={`${i + 1}`}>{i + 1}</Select.Item>
										{/each}
									</Select.Group>
								</ScrollArea>
							</Select.Content>
							<Select.Input name="favoriteFruit" />
						</Select.Root>
						<Select.Root>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Select Year" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Year</Select.Label>
									<Select.Item value="2023" label="2023">2023</Select.Item>
									<Select.Item value="2024" label="2024">2024</Select.Item>
								</Select.Group>
							</Select.Content>
							<Select.Input name="favoriteFruit" />
						</Select.Root>
						<Select.Root>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Select Category" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Category</Select.Label>
									<Select.Item value="adult" label="Adult">Adult</Select.Item>
									<Select.Item value="child" label="Child">Child</Select.Item>
									<Select.Item value="body parts" label="Body parts">Body parts</Select.Item>
									<Select.Item value="old" label="Old">Old</Select.Item>
									<Select.Item value="bone" label="bone">Bone</Select.Item>
								</Select.Group>
							</Select.Content>
							<Select.Input name="favoriteFruit" />
						</Select.Root>
					</div>
				</Sheet.Content>
			</Sheet.Root>
		</div>

		<div id="mainMapContainer" role="application" class="h-screen">
			<slot></slot>
		</div>
	</div>
{:else}
	<div role="application">
		<header role="navigation" class="border p-4">
			<nav class="flex flex-row items-center justify-between">
				<div class="flex flex-row items-center gap-5">
					<Sheet.Root>
						<Sheet.Trigger>
							<svg
								width="24"
								height="24"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><path
									d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z"
									fill="currentColor"
									fill-rule="evenodd"
									clip-rule="evenodd"
								></path></svg
							>
						</Sheet.Trigger>
						<Sheet.Content side="left">
							<Sheet.Header>
								<Sheet.Title>Bag Bag Cemetary</Sheet.Title>
								<Sheet.Description>Main Menu</Sheet.Description>
							</Sheet.Header>
							<Separator class="my-4" />
							<ul role="menubar" class="flex flex-col gap-2">
								<li role="menuitem">
									<Button href="/" variant="ghost" class="flex w-full justify-start gap-2">
										<svg
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
												fill="currentColor"
												fill-rule="evenodd"
												clip-rule="evenodd"
											></path></svg
										>
										Home
									</Button>
								</li>
								<li role="menuitem">
									<Button href="/maps" variant="ghost" class="flex w-full justify-start gap-2">
										<svg
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M10.3285 1.13607C10.1332 0.940809 9.81662 0.940808 9.62136 1.13607C9.42609 1.33133 9.42609 1.64792 9.62136 1.84318L10.2744 2.49619L5.42563 6.13274L4.31805 5.02516C4.12279 4.8299 3.80621 4.8299 3.61095 5.02516C3.41569 5.22042 3.41569 5.537 3.61095 5.73226L5.02516 7.14648L6.08582 8.20714L2.81545 11.4775C2.62019 11.6728 2.62019 11.9894 2.81545 12.1846C3.01072 12.3799 3.3273 12.3799 3.52256 12.1846L6.79293 8.91425L7.85359 9.97491L9.2678 11.3891C9.46306 11.5844 9.77965 11.5844 9.97491 11.3891C10.1702 11.1939 10.1702 10.8773 9.97491 10.682L8.86733 9.57443L12.5039 4.7257L13.1569 5.37871C13.3522 5.57397 13.6687 5.57397 13.864 5.37871C14.0593 5.18345 14.0593 4.86687 13.864 4.6716L12.8033 3.61094L11.3891 2.19673L10.3285 1.13607ZM6.13992 6.84702L10.9887 3.21047L11.7896 4.01142L8.15305 8.86015L6.13992 6.84702Z"
												fill="currentColor"
												fill-rule="evenodd"
												clip-rule="evenodd"
											></path></svg
										>
										Maps
									</Button>
								</li>
								<li role="menuitem">
									<Button href="/about" variant="ghost" class="flex w-full justify-start gap-2">
										<svg
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
												fill="currentColor"
												fill-rule="evenodd"
												clip-rule="evenodd"
											></path></svg
										>
										About
									</Button>
								</li>
								<li role="menuitem">
									<Button href="/" variant="ghost" class="flex w-full justify-start gap-2">
										<svg
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
												fill="currentColor"
												fill-rule="evenodd"
												clip-rule="evenodd"
											></path></svg
										>
										Download our app
									</Button>
								</li>
							</ul>
						</Sheet.Content>
					</Sheet.Root>
					<svg
						width="24"
						height="24"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M2 3C1.44772 3 1 3.44772 1 4V11C1 11.5523 1.44772 12 2 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H2ZM0 4C0 2.89543 0.895431 2 2 2H13C14.1046 2 15 2.89543 15 4V11C15 12.1046 14.1046 13 13 13H2C0.895431 13 0 12.1046 0 11V4ZM2 4.25C2 4.11193 2.11193 4 2.25 4H4.75C4.88807 4 5 4.11193 5 4.25V5.75454C5 5.89261 4.88807 6.00454 4.75 6.00454H2.25C2.11193 6.00454 2 5.89261 2 5.75454V4.25ZM12.101 7.58421C12.101 9.02073 10.9365 10.1853 9.49998 10.1853C8.06346 10.1853 6.89893 9.02073 6.89893 7.58421C6.89893 6.14769 8.06346 4.98315 9.49998 4.98315C10.9365 4.98315 12.101 6.14769 12.101 7.58421ZM13.101 7.58421C13.101 9.57302 11.4888 11.1853 9.49998 11.1853C7.51117 11.1853 5.89893 9.57302 5.89893 7.58421C5.89893 5.5954 7.51117 3.98315 9.49998 3.98315C11.4888 3.98315 13.101 5.5954 13.101 7.58421Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						></path></svg
					>
				</div>
			</nav>
		</header>
		<div role="main" class="p-4">
			<slot></slot>
		</div>
	</div>
{/if}
