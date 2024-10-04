<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Card from '$lib/components/ui/card';
	import { onMount, setContext } from 'svelte';
	import { retrieveByAgeRange, retrieveByGender, searchPerson, type RecordDB } from '$lib/db/index';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	//@ts-ignore
	import lodash from 'lodash';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	let filterValue = {};
	let records: RecordDB[] = [];
	let searchResult: Array<RecordDB> = [];
	let topResult: string = '';
	let filterByGender:boolean = false;
	let filterByAgeRange:boolean = false;
	let filterByCategory:boolean = false;
	let categoryValue:string = ''
	let ageRangeLowValue:number = 0
	let ageRangeHighValue:number = 0
	let genderValue:string = ''

	onMount(async () => {
		const response = await fetch('/records.json');
		records = <RecordDB[]>await response.json();
		window.records = records;
	});

	function sendSearch(event: SubmitEvent) {
		//@ts-ignore
		const searchVal = event.target.search.value;
		// request the record data
		searchResult = searchPerson(records, searchVal);
		document.getElementById('searchResultDialog')?.click();
	}
	$: {
		if (lodash.isArray(records)) {
			searchResult = searchPerson(records, topResult);
		}
	}
</script>

<main class="relative h-screen flex-col">
	<header class="absolute top-0 z-50 mx-4 mt-3.5 w-[80vw]">
		<div class="relative">
			<form on:submit|preventDefault={sendSearch}>
				<Command.Root>
					<Input
						name="search"
						bind:value={topResult}
						class="focus-visible:ring-0"
						placeholder="Search"
					/>
					{#if topResult !== ''}
						<Command.List>
							<Command.Empty>No results found.</Command.Empty>
							<Command.Group heading="Suggestions" class="w-full">
								{#each searchResult.slice(0, 5) as record}
									<Drawer.Root>
										<Command.Item class="w-full">
											<Drawer.Trigger class="flex w-full justify-start">
												<span
													>{lodash.startCase(
														`${record.firstName} ${record.middleName} ${record.lastName}`
													)}</span
												>
											</Drawer.Trigger>
										</Command.Item>
										<Drawer.Content class="h-3/4 w-full">
											<div class="h-full w-full overflow-y-auto">
												<Drawer.Header>
													<div class="flex flex-row items-center gap-5">
														<Avatar.Root class="h-14 w-14 sm:h-16 sm:w-16">
															<Avatar.Fallback
																>{record.firstName.at(0)}{record.lastName.at(0)}</Avatar.Fallback
															>
														</Avatar.Root>
														<div class="flex flex-col items-start">
															<h3 class="scroll-m-0 text-sm tracking-normal sm:text-2xl">
																{record.lastName}, {record.firstName}, {record.middleName}
															</h3>
															<h4 class="scroll-m-0 text-sm tracking-normal sm:text-xl">
																{record.category} / {record.sex}
															</h4>
														</div>
													</div>
													<div class="flex flex-row items-center gap-5">
														<span class="small sm:large flex flex-row items-center gap-2.5">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																fill="currentColor"
																class="bi bi-cake2"
																viewBox="0 0 16 16"
															>
																<path
																	d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683q-.224.051-.432.107c-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16s4.022-.227 5.432-.603c.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12 12 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22 22 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a29 29 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802zm-.668 5.556L3 5.524v.967q.468.111 1 .201V5.315a21 21 0 0 1 2-.242v1.855q.488.036 1 .054V5.018a28 28 0 0 1 2 0v1.964q.512-.018 1-.054V5.073c.72.054 1.393.137 2 .242v1.377q.532-.09 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356s-.012.139-.356.356c-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5s.012-.139.356-.356c.319-.2.814-.4 1.47-.575M15 7.806v1.027l-.68.907a.94.94 0 0 1-1.17.276 1.94 1.94 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9s4.022-.227 5.432-.603c.612-.163 1.149-.36 1.568-.591m0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.94.94 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426"
																/>
															</svg>
															{record.birthDay}</span
														>
														<span class="small sm:large flex flex-row items-center gap-2.5">
															<svg
																fill="#000000"
																height="16"
																width="16"
																version="1.1"
																id="Layer_1"
																xmlns="http://www.w3.org/2000/svg"
																xmlns:xlink="http://www.w3.org/1999/xlink"
																viewBox="0 0 512 512"
																xml:space="preserve"
															>
																<g>
																	<g>
																		<path
																			d="M424.627,143.859L344.083,4.352C342.528,1.66,339.655,0,336.545,0H175.455c-3.11,0-5.983,1.66-7.538,4.352L87.373,143.859    c-1.096,1.899-1.436,4.14-0.951,6.278l80.544,355.084c0.899,3.965,4.423,6.779,8.489,6.779h161.088    c4.066,0,7.589-2.814,8.489-6.779l80.544-355.084C426.063,147.999,425.723,145.757,424.627,143.859z M329.593,494.591H182.406    l-78.252-344.98l76.327-132.202h151.038l76.328,132.202L329.593,494.591z"
																		/>
																	</g>
																</g>
																<g>
																	<g>
																		<path
																			d="M375.332,151.323L317.28,50.776c-1.555-2.693-4.428-4.352-7.538-4.352H202.259c-3.11,0-5.983,1.66-7.538,4.352    l-58.051,100.547c-1.096,1.899-1.436,4.14-0.951,6.278l68.321,301.196c0.898,3.965,4.423,6.779,8.489,6.779h86.944    c4.066,0,7.59-2.814,8.489-6.779l68.321-301.196C376.768,155.463,376.428,153.222,375.332,151.323z M292.52,448.167h-73.041    l-66.029-291.092l53.834-93.242h97.432l53.833,93.242L292.52,448.167z"
																		/>
																	</g>
																</g>
																<g>
																	<g>
																		<path
																			d="M320.604,142.089H279.27V98.526c0-4.807-3.897-8.704-8.704-8.704h-29.131c-4.807,0-8.704,3.897-8.704,8.704v43.563    h-41.335c-4.807,0-8.704,3.897-8.704,8.704v29.131c0,4.807,3.897,8.704,8.704,8.704h41.335v118.526    c0,4.807,3.897,8.704,8.704,8.704h29.131c4.807,0,8.704-3.897,8.704-8.704V188.629h41.335c4.807,0,8.704-3.897,8.704-8.704    v-29.131C329.309,145.987,325.411,142.089,320.604,142.089z M311.901,171.22h-41.335c-4.807,0-8.704,3.897-8.704,8.704v118.526    H250.14V179.925c0-4.807-3.897-8.704-8.704-8.704h-41.335v-11.722h41.335c4.807,0,8.704-3.897,8.704-8.704v-43.563h11.722v43.563    c0,4.807,3.897,8.704,8.704,8.704h41.335V171.22z"
																		/>
																	</g>
																</g>
															</svg>
															{record.dateOfDeath}
														</span>
													</div>
												</Drawer.Header>
												<div class="flex flex-col gap-5 p-4">
													<div class="grid grid-cols-3 border-b">
														<span class="muted"
															>Cluster: <span class="small">{record.cluster}</span></span
														>
														<span class="muted">Wing: <span class="small">{record.wing}</span></span
														>
														<span class="muted"
															>Level: <span class="small">{record.level}</span></span
														>
													</div>
													<div class="grid grid-cols-2">
														<span class="small sm:large">Date of interment</span>
														<span class="small sm:large underline">{record.dateOfInterment}</span>
													</div>
													<div class="grid grid-cols-2">
														<span class="small sm:large">Date of burial</span>
														<span class="small sm:large underline">{record.dateOfBurial}</span>
													</div>
													<div class="grid grid-cols-2">
														<span class="small sm:large">O.R Number</span>
														<span class="small sm:large underline">{record.ORNumber}</span>
													</div>
													<div class="grid grid-cols-2">
														<span class="small sm:large">Registration Number</span>
														<span class="small sm:large underline">{record.registrationNumber}</span
														>
													</div>
													<div class="grid grid-cols-2">
														<span class="small sm:large">Cemetery</span>
														<span class="small sm:large underline">{record.cemetery}</span>
													</div>
													<div class="grid grid-cols-2">
														<span class="small sm:large">Funeral Service</span>
														<span class="small sm:large underline">{record.funeralService}</span>
													</div>
												</div>
											</div>
										</Drawer.Content>
									</Drawer.Root>
								{/each}
							</Command.Group>
						</Command.List>
					{/if}
				</Command.Root>
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button
							id="searchFilterBtn"
							type="button"
							size="icon"
							builders={[builder]}
							variant="ghost"
							class="absolute right-0 top-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-filter"
								viewBox="0 0 16 16"
							>
								<path
									d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
								/>
							</svg>
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="bottom" class="h-3/4">
						<Sheet.Header>Search Filter</Sheet.Header>
						<div class="space-y-5 p-4">
							<div class="flex items-center space-x-2">
								<Checkbox id="terms" checked aria-labelledby="terms-label" />
								<Label
									id="terms-label"
									for="terms"
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Enable Filter
								</Label>
							</div>
							<hr />
							<h4>Filter by</h4>
							<div class="space-y-5">
								<div class="space-y-2.5">
									<div class="flex flex-row items-center gap-2.5">
										<span class="muted">Gender</span>
										<Checkbox bind:checked={filterByGender} />
									</div>
									<Select.Root onSelectedChange={(v) => {
										if(v){
											//@ts-ignore
											genderValue = v.value
										}
									}} disabled={!filterByGender}>
										<Select.Trigger>
											<Select.Value placeholder="Select Gender" />
										</Select.Trigger>
										<Select.Content>
											<Select.Group>
												<Select.Label>Gender</Select.Label>
												<Select.Item value='male' label={'Male'}>Male</Select.Item>
												<Select.Item value='female' label={'Female'}>Female</Select.Item>
											</Select.Group>
										</Select.Content>
									</Select.Root>
								</div>
								<div class="space-y-2.5">
									<div class="flex flex-row items-center gap-2.5">
										<span class="muted">Age</span>
										<Checkbox bind:checked={filterByAgeRange} />
									</div>
									<Input bind:value={ageRangeLowValue} disabled={!filterByAgeRange} placeholder="Starting age" type="number" />
									<Input bind:value={ageRangeHighValue} disabled={!filterByAgeRange} placeholder="Ending age" type="number" />
								</div>
								<div class="space-y-2.5">
									<div class="flex flex-row items-center gap-2.5">
										<span class="muted">Category</span>
										<Checkbox bind:checked={filterByCategory} />
									</div>
									<Select.Root disabled={!filterByCategory}>
										<Select.Trigger>
											<Select.Value placeholder="Select Category" />
										</Select.Trigger>
										<Select.Content>
											<Select.Group>
												<Select.Label>Category</Select.Label>
												{#each new Set(records.map((v) => v.category)) as category}
													<Select.Item value={category} label={category}>{category}</Select.Item>
												{/each}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								</div>
							</div>
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</form>
		</div>
	</header>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button
				id="searchResultDialog"
				type="button"
				size="icon"
				builders={[builder]}
				variant="ghost"
				class="absolute right-0 top-0"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-filter"
					viewBox="0 0 16 16"
				>
					<path
						d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
					/>
				</svg>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="bottom" class="h-3/4 overflow-y-auto">
			<Sheet.Header>Search Result</Sheet.Header>
			<div class="flex flex-col gap-5 pt-5">
				{#each searchResult || [] as value}
					<Card.Root>
						<Card.Header>
							<Card.Title>
								{value.firstName}
								{value.middleName}
								{value.lastName}
							</Card.Title>
						</Card.Header>
					</Card.Root>
				{/each}
			</div>
		</Sheet.Content>
	</Sheet.Root>
	<article class="">
		<slot></slot>
	</article>
	<footer class="absolute bottom-0 z-50 w-full">
		<nav class="grid grid-cols-3 gap-5 rounded-tl-md rounded-tr-md bg-accent p-4">
			<div class="flex flex-col items-center">
				<Button size="icon" variant="ghost" href="/app">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-geo"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"
						/>
					</svg>
				</Button>
				<span class="small">Map</span>
			</div>
			<div class="flex flex-col items-center">
				<Button size="icon" variant="ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-geo"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"
						/>
					</svg>
				</Button>
				<span class="small"> Saved </span>
			</div>
			<div class="flex flex-col items-center">
				<Button size="icon" variant="ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-geo"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"
						/>
					</svg>
				</Button>
				<span class="small"> About </span>
			</div>
		</nav>
	</footer>
</main>
