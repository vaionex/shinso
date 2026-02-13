<script>
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let mobileMenuOpen = $state(false);
	let activeTab = $state('overview');
	let hoveredModel = $state(null);
	let benchmarksVisible = $state(false);

	onMount(() => {
		mounted = true;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						if (entry.target.id === 'benchmark-chart') benchmarksVisible = true;
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);
		document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	// Updated benchmarks from actual research data
	const models = [
		{ id: 'shinso', name: 'Shinso', short: 'Shinso', overall: 73.9, compilation: 94.2, functional: 73.9, testPass: 71.3, testsPerContract: 12.4, color: '#3B82F6', gradient: 'from-blue-500 to-cyan-400', highlight: true },
		{ id: 'claude', name: 'Claude 4.1.5 Sonnet', short: 'Claude 4.1.5', org: 'Anthropic', overall: 45.6, compilation: 68.2, functional: 45.6, testPass: 42.1, testsPerContract: 1.0, color: '#A855F7', gradient: 'from-purple-500 to-purple-400' },
		{ id: 'gemini3', name: 'Gemini 3 Pro Preview', short: 'Gemini 3 Pro', org: 'Google', overall: 33.7, compilation: 52.8, functional: 33.7, testPass: 30.4, testsPerContract: 1.0, color: '#6366F1', gradient: 'from-indigo-500 to-indigo-400' },
		{ id: 'gemini25', name: 'Gemini 2.5', short: 'Gemini 2.5', org: 'Google', overall: 28.6, compilation: 44.1, functional: 28.6, testPass: 25.2, testsPerContract: 1.0, color: '#8B5CF6', gradient: 'from-violet-500 to-violet-400' },
		{ id: 'qwen', name: 'Qwen3 Coder', short: 'Qwen3 Coder', org: 'Alibaba', overall: 21.9, compilation: 36.4, functional: 21.9, testPass: 18.7, testsPerContract: 1.0, color: '#F59E0B', gradient: 'from-amber-500 to-amber-400' },
		{ id: 'gpt', name: 'GPT-5.2 Pro', short: 'GPT-5.2 Pro', org: 'OpenAI', overall: 21.3, compilation: 35.8, functional: 21.3, testPass: 17.9, testsPerContract: 1.0, color: '#10B981', gradient: 'from-emerald-500 to-emerald-400' }
	];

	// Score breakdown categories
	const categories = [
		{ name: 'Logic Preservation', shinso: 78.2, claude: 48.1, gemini3: 36.2, gemini25: 30.8, qwen: 24.1, gpt: 22.7 },
		{ name: 'Type Safety', shinso: 71.4, claude: 42.3, gemini3: 31.5, gemini25: 26.4, qwen: 19.8, gpt: 19.2 },
		{ name: 'Error Handling', shinso: 69.8, claude: 39.7, gemini3: 28.9, gemini25: 24.1, qwen: 18.4, gpt: 17.6 },
		{ name: 'API Mapping', shinso: 75.1, claude: 51.2, gemini3: 38.4, gemini25: 32.7, qwen: 25.3, gpt: 24.8 }
	];

	// Error pattern heatmap (error counts — lower is better)
	const errorPatterns = [
		{ code: 'E03003', name: 'Type Mismatch', values: [1, 4, 6, 3, 6, 5] },
		{ code: 'E05001', name: 'Missing Import', values: [1, 2, 4, 3, 3, 2] },
		{ code: 'E03002', name: 'Null Reference', values: [0, 3, 5, 3, 7, 2] },
		{ code: 'E04007', name: 'Invalid Syntax', values: [1, 2, 1, 1, 3, 2] },
		{ code: 'E02004', name: 'Scope Error', values: [0, 1, 2, 1, 3, 1] }
	];

	const tabs = [
		{ id: 'overview', label: 'Overall Performance' },
		{ id: 'detailed', label: 'Detailed Metrics' },
		{ id: 'categories', label: 'Score Breakdown' },
		{ id: 'errors', label: 'Error Analysis' },
		{ id: 'rigor', label: 'Testing Rigor' }
	];

	const languages = ['Python', 'TypeScript', 'Rust', 'Go', 'C++', 'Java', 'Solidity', 'Move'];

	const navItems = [
		{ label: 'Problem', href: '#problem' },
		{ label: 'Benchmarks', href: '#benchmarks' },
		{ label: 'Data Engine', href: '#data-engine' },
		{ label: 'Technology', href: '#technology' },
		{ label: 'Roadmap', href: '#roadmap' },
		{ label: 'Team', href: '#team' }
	];

	const team = [
		{ name: 'Sam Beni', role: 'CEO', bio: 'Pioneer of "Complex AI." Accelerated 49 unicorns.', logos: ['Tech Nation', 'Intel AI', 'Imperial'], initials: 'SB' },
		{ name: 'Elod Varga', role: 'CTO', bio: 'Built, launched, and exited 2× successful tech protocols.', logos: ['Taraxa', 'EWOR'], initials: 'EV' },
		{ name: 'Dr. Rabimba Karanjai', role: 'CSO / CAIO', bio: 'World-renowned AI language translation researcher.', logos: ['U of Houston', 'Google', 'PayPal'], initials: 'RK' }
	];

	function getHeatColor(val) {
		if (val === 0) return 'bg-blue-500/20 text-blue-300';
		if (val <= 1) return 'bg-blue-500/10 text-blue-400';
		if (val <= 2) return 'bg-indigo-500/15 text-indigo-300';
		if (val <= 3) return 'bg-purple-500/20 text-purple-300';
		if (val <= 4) return 'bg-violet-500/25 text-violet-200';
		if (val <= 5) return 'bg-fuchsia-500/25 text-fuchsia-200';
		return 'bg-pink-500/30 text-pink-200';
	}
</script>

<svelte:head>
	<title>Shinso AI — The Data Engine for Code Intelligence</title>
	<link rel="icon" type="image/svg+xml" href="/icon.svg" />
	<meta name="description" content="Shinso's agentic code transpiler achieves 73.9% accuracy — 3.5x better than GPT. We generate production-viable code translations at scale to power the next generation of AI models." />
	<meta property="og:title" content="Shinso AI — The Data Engine for Code Intelligence" />
	<meta property="og:description" content="73.9% functional correctness. 3.5× better than GPT. The only AI producing production-viable code translations." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://shinso.ai" />
</svelte:head>

<!-- Nav -->
<nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2.5">
			<img src="/icon.svg" alt="Shinso" class="h-8 w-8" />
			<span class="text-lg font-bold text-white tracking-tight">Shinso</span>
		</a>
		<div class="hidden items-center gap-8 md:flex">
			{#each navItems as item}
				<a href={item.href} class="text-[13px] text-gray-400 transition-colors hover:text-white">{item.label}</a>
			{/each}
			<a href="/access" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25">Get Access</a>
		</div>
		<button class="md:hidden text-gray-400 p-2" onclick={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Menu">
			{#if mobileMenuOpen}
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
			{:else}
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
			{/if}
		</button>
	</div>
	{#if mobileMenuOpen}
		<div class="border-t border-white/5 bg-[#050508]/95 px-6 py-4 backdrop-blur-xl md:hidden">
			{#each navItems as item}
				<a href={item.href} class="block py-3 text-gray-400 hover:text-white text-base" onclick={() => mobileMenuOpen = false}>{item.label}</a>
			{/each}
			<a href="#contact" class="mt-3 block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white" onclick={() => mobileMenuOpen = false}>Get Access</a>
		</div>
	{/if}
</nav>

<!-- ============ HERO ============ -->
<section class="relative min-h-screen flex items-center overflow-hidden pt-20 bg-grid">
	<div class="pointer-events-none absolute top-1/3 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.04] blur-[120px]"></div>
	<div class="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050508] to-transparent"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 text-center">
		<div class="fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-5 py-2 text-sm text-blue-400" class:visible={mounted}>
			<span class="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
			ACM Distinguished Paper of the Year 2025
		</div>

		<h1 class="fade-in-up mx-auto max-w-5xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl" class:visible={mounted} style="transition-delay: 0.1s">
			The Data Engine for
			<span class="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"> Code Intelligence</span>
		</h1>

		<p class="fade-in-up mx-auto mt-8 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg" class:visible={mounted} style="transition-delay: 0.2s">
			Our agentic transpiler translates code between languages at <strong class="text-white">73.9% accuracy</strong> — outperforming GPT, Claude, Gemini, and Qwen. We generate production-viable code data at scale to train the next generation of frontier AI models.
		</p>

		<div class="fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" class:visible={mounted} style="transition-delay: 0.3s">
			<a href="/access" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/25">
				Request Demo
				<svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
			</a>
			<a href="#benchmarks" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-gray-300 transition-all hover:border-white/20 hover:bg-white/10">
				View Benchmarks
			</a>
		</div>

		<!-- Hero stats -->
		<div class="fade-in-up mx-auto mt-20 grid max-w-4xl grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-white/5 pt-12" class:visible={mounted} style="transition-delay: 0.4s">
			<div>
				<div class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">73.9%</div>
				<div class="mt-1 text-xs sm:text-sm text-gray-500">Functional Correctness</div>
			</div>
			<div>
				<div class="text-3xl sm:text-4xl font-bold text-white">12.4×</div>
				<div class="mt-1 text-xs sm:text-sm text-gray-500">More Tests per Contract</div>
			</div>
			<div>
				<div class="text-3xl sm:text-4xl font-bold text-white">94.2%</div>
				<div class="mt-1 text-xs sm:text-sm text-gray-500">Compilation Rate</div>
			</div>
			<div>
				<div class="text-3xl sm:text-4xl font-bold text-white">6</div>
				<div class="mt-1 text-xs sm:text-sm text-gray-500">Models Benchmarked</div>
			</div>
		</div>
	</div>
</section>

<!-- ============ PROBLEM ============ -->
<section id="problem" class="relative border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">The Problem</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">AI Code Translation Is Broken</h2>
			<p class="mt-6 text-base sm:text-lg leading-relaxed text-gray-400">
				Current models generate code that looks right but doesn't work. Enterprise can't ship AI-translated code into production. The entire pipeline — from translation to verification — needs to be rethought.
			</p>
		</div>

		<div class="fade-in-up mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
			<div class="rounded-2xl border border-red-500/10 bg-red-500/5 p-6 sm:p-8">
				<div class="mb-3 text-3xl sm:text-4xl font-bold text-red-400">78%</div>
				<div class="text-sm font-medium text-red-300">of AI-translated code fails to compile</div>
				<p class="mt-3 text-sm text-gray-500">Models produce syntactically plausible but fundamentally broken translations requiring extensive manual repair.</p>
			</div>
			<div class="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-6 sm:p-8">
				<div class="mb-3 text-3xl sm:text-4xl font-bold text-amber-400">$4.2M</div>
				<div class="text-sm font-medium text-amber-300">avg. enterprise migration cost</div>
				<p class="mt-3 text-sm text-gray-500">Manual code translation is slow, expensive, and error-prone. Most migrations run 2–3× over budget.</p>
			</div>
			<div class="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-6 sm:p-8">
				<div class="mb-3 text-3xl sm:text-4xl font-bold text-blue-400">18 mo</div>
				<div class="text-sm font-medium text-blue-300">average migration timeline</div>
				<p class="mt-3 text-sm text-gray-500">Enterprise migrations take months or years with current tooling, creating massive opportunity costs.</p>
			</div>
		</div>
	</div>
</section>

<!-- ============ BENCHMARKS — Interactive Dashboard ============ -->
<section id="benchmarks" class="bg-grid relative border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Benchmarks</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
				Shinso Beats GPT, Claude, Gemini & Qwen
			</h2>
			<p class="mt-6 text-base sm:text-lg text-gray-400">
				Comprehensive evaluation across code translation tasks. Compilation verification, functional correctness, test pass rates, and error analysis.
			</p>
		</div>

		<!-- Tab navigation -->
		<div class="fade-in-up mt-12 flex gap-1 overflow-x-auto pb-2 sm:justify-center scrollbar-hide">
			{#each tabs as tab}
				<button
					class="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all {activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}"
					onclick={() => activeTab = tab.id}
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Dashboard container -->
		<div class="fade-in-up mt-8 rounded-2xl border border-white/5 bg-[#0a0a12] overflow-hidden" id="benchmark-chart">

			<!-- TAB: Overview — Main bar chart -->
			{#if activeTab === 'overview'}
				<div class="p-6 sm:p-10">
					<div class="flex items-center justify-between mb-8">
						<div>
							<h3 class="text-lg font-semibold text-white">Overall Performance</h3>
							<p class="text-sm text-gray-500 mt-1">Average score across all translation benchmarks</p>
						</div>
						<div class="hidden sm:flex items-center gap-4 text-xs text-gray-500">
							<div class="flex items-center gap-1.5">
								<div class="w-8 border-t border-dashed border-emerald-500/60"></div>
								<span>Production-viable</span>
							</div>
							<div class="flex items-center gap-1.5">
								<div class="w-8 border-t border-dashed border-amber-500/60"></div>
								<span>Needs refinement</span>
							</div>
						</div>
					</div>

					<!-- Vertical bar chart -->
					<div class="relative">
						<!-- Y-axis labels -->
						<div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-600 tabular-nums w-8">
							<span>100</span>
							<span>80</span>
							<span>60</span>
							<span>40</span>
							<span>20</span>
							<span>0</span>
						</div>

						<!-- Chart area -->
						<div class="ml-10 relative">
							<!-- Grid lines -->
							<div class="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
								{#each [0, 1, 2, 3, 4, 5] as _}
									<div class="border-t border-white/5 w-full"></div>
								{/each}
							</div>

							<!-- Threshold lines -->
							<div class="absolute inset-x-0 bottom-8 pointer-events-none" style="height: calc(100% - 2rem)">
								<!-- Production-viable at 60 -->
								<div class="absolute w-full border-t border-dashed border-emerald-500/40" style="bottom: 60%">
									<span class="absolute right-0 -top-4 text-[10px] text-emerald-500/60 hidden sm:block">Production-viable</span>
								</div>
								<!-- Needs refinement at 45 -->
								<div class="absolute w-full border-t border-dashed border-amber-500/40" style="bottom: 45%">
									<span class="absolute right-0 -top-4 text-[10px] text-amber-500/60 hidden sm:block">Needs refinement</span>
								</div>
							</div>

							<!-- Bars -->
							<div class="relative flex items-end justify-around gap-2 sm:gap-4" style="height: 320px; padding-bottom: 2rem">
								{#each models as m, i}
									<div
										role="group" class="flex-1 max-w-24 flex flex-col items-center gap-2 group cursor-pointer"
										onmouseenter={() => hoveredModel = m.id}
										onmouseleave={() => hoveredModel = null}
									>
										<!-- Value -->
										<span class="text-xs sm:text-sm font-bold tabular-nums transition-colors {m.highlight ? 'text-blue-400' : hoveredModel === m.id ? 'text-white' : 'text-gray-500'}">{m.overall}</span>

										<!-- Bar -->
										<div
											class="w-full rounded-t-lg bg-gradient-to-t {m.gradient} transition-all duration-300 {hoveredModel === m.id ? 'opacity-100 shadow-lg' : m.highlight ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}"
											style="height: {benchmarksVisible ? m.overall * 2.88 : 0}px; transition: height 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) {i * 0.1}s, opacity 0.3s; {m.highlight ? `box-shadow: 0 0 30px ${m.color}33` : ''}"
										></div>

										<!-- Label -->
										<span class="text-[10px] sm:text-xs text-center leading-tight {m.highlight ? 'text-white font-medium' : 'text-gray-500'} whitespace-nowrap">{m.short}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Hover detail -->
					{#if hoveredModel}
						{@const m = models.find(x => x.id === hoveredModel)}
						<div class="mt-6 flex items-center gap-4 rounded-xl bg-white/5 border border-white/5 p-4 transition-all">
							<div class="h-3 w-3 rounded-full" style="background: {m.color}"></div>
							<div class="flex-1">
								<span class="text-sm font-medium text-white">{m.name}</span>
								{#if m.org}<span class="text-xs text-gray-500 ml-2">{m.org}</span>{/if}
							</div>
							<div class="flex gap-6 text-center">
								<div><div class="text-sm font-bold text-white tabular-nums">{m.compilation}%</div><div class="text-[10px] text-gray-500">Compile</div></div>
								<div><div class="text-sm font-bold text-white tabular-nums">{m.functional}%</div><div class="text-[10px] text-gray-500">Functional</div></div>
								<div><div class="text-sm font-bold text-white tabular-nums">{m.testPass}%</div><div class="text-[10px] text-gray-500">Test Pass</div></div>
							</div>
						</div>
					{/if}
				</div>

			<!-- TAB: Detailed Metrics -->
			{:else if activeTab === 'detailed'}
				<div class="p-6 sm:p-10">
					<h3 class="text-lg font-semibold text-white mb-2">Comprehensive Benchmark Analysis</h3>
					<p class="text-sm text-gray-500 mb-8">Compilation rate, functional correctness, and test pass rate with 95% CI</p>

					<!-- Grouped bars for each model -->
					<div class="space-y-6">
						{#each models as m}
							<div role="group" class="group" onmouseenter={() => hoveredModel = m.id} onmouseleave={() => hoveredModel = null}>
								<div class="flex items-center gap-3 mb-2">
									<div class="h-2.5 w-2.5 rounded-full shrink-0" style="background: {m.color}"></div>
									<span class="text-sm font-medium {m.highlight ? 'text-white' : 'text-gray-400'}">{m.name}</span>
									{#if m.org}<span class="text-xs text-gray-600">{m.org}</span>{/if}
								</div>
								<div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
									<!-- Compilation -->
									<div class="flex items-center gap-3">
										<span class="text-[10px] text-gray-600 w-16 shrink-0">Compile</span>
										<div class="flex-1 h-7 bg-white/5 rounded-md overflow-hidden">
											<div class="h-full rounded-md bg-gradient-to-r {m.gradient} {m.highlight ? '' : 'opacity-60'} flex items-center transition-all duration-700"
												style="width: {m.compilation}%">
												<span class="ml-2 text-[10px] font-bold text-white tabular-nums">{m.compilation}%</span>
											</div>
										</div>
									</div>
									<!-- Functional -->
									<div class="flex items-center gap-3">
										<span class="text-[10px] text-gray-600 w-16 shrink-0">Functional</span>
										<div class="flex-1 h-7 bg-white/5 rounded-md overflow-hidden">
											<div class="h-full rounded-md bg-gradient-to-r {m.gradient} {m.highlight ? '' : 'opacity-60'} flex items-center transition-all duration-700"
												style="width: {m.functional}%">
												<span class="ml-2 text-[10px] font-bold text-white tabular-nums">{m.functional}%</span>
											</div>
										</div>
									</div>
									<!-- Test Pass -->
									<div class="flex items-center gap-3">
										<span class="text-[10px] text-gray-600 w-16 shrink-0">Test Pass</span>
										<div class="flex-1 h-7 bg-white/5 rounded-md overflow-hidden">
											<div class="h-full rounded-md bg-gradient-to-r {m.gradient} {m.highlight ? '' : 'opacity-60'} flex items-center transition-all duration-700"
												style="width: {m.testPass}%">
												<span class="ml-2 text-[10px] font-bold text-white tabular-nums">{m.testPass}%</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

			<!-- TAB: Score Breakdown -->
			{:else if activeTab === 'categories'}
				<div class="p-6 sm:p-10">
					<h3 class="text-lg font-semibold text-white mb-2">Score Breakdown by Category</h3>
					<p class="text-sm text-gray-500 mb-8">Performance across key code translation quality dimensions</p>

					<!-- Legend -->
					<div class="flex flex-wrap gap-3 mb-6">
						{#each models.slice(0, 3) as m}
							<div class="flex items-center gap-1.5 text-xs text-gray-400">
								<div class="h-2.5 w-2.5 rounded-sm" style="background: {m.color}"></div>
								{m.short}
							</div>
						{/each}
					</div>

					<div class="space-y-8">
						{#each categories as cat}
							<div>
								<div class="text-sm font-medium text-white mb-3">{cat.name}</div>
								<div class="space-y-1.5">
									{#each [
										{ name: 'Shinso', val: cat.shinso, model: models[0] },
										{ name: 'Claude 4.1.5', val: cat.claude, model: models[1] },
										{ name: 'Gemini 3 Pro', val: cat.gemini3, model: models[2] },
										{ name: 'Gemini 2.5', val: cat.gemini25, model: models[3] },
										{ name: 'Qwen3', val: cat.qwen, model: models[4] },
										{ name: 'GPT-5.2', val: cat.gpt, model: models[5] }
									] as row}
										<div class="flex items-center gap-3">
											<span class="text-[10px] text-gray-600 w-20 shrink-0 truncate">{row.name}</span>
											<div class="flex-1 h-5 bg-white/5 rounded overflow-hidden">
												<div class="h-full rounded transition-all duration-700 flex items-center"
													style="width: {row.val}%; background: {row.model.color}{row.model.highlight ? '' : '99'}">
													<span class="ml-2 text-[9px] font-bold text-white tabular-nums">{row.val}%</span>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

			<!-- TAB: Error Analysis (Heatmap) -->
			{:else if activeTab === 'errors'}
				<div class="p-6 sm:p-10">
					<h3 class="text-lg font-semibold text-white mb-2">Top 5 Error Patterns by Model</h3>
					<p class="text-sm text-gray-500 mb-8">Error frequency across models — lower is better. Shinso's self-healing pipeline catches and corrects most errors.</p>

					<!-- Desktop heatmap -->
					<div class="hidden sm:block overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr>
									<th class="text-left text-xs font-medium text-gray-500 pb-3 pr-4 w-32">Error Code</th>
									{#each models as m}
										<th class="text-center text-xs font-medium pb-3 px-2 {m.highlight ? 'text-blue-400' : 'text-gray-500'}" style="min-width: 80px">{m.short}</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each errorPatterns as pattern}
									<tr>
										<td class="py-1.5 pr-4">
											<div class="text-xs font-mono text-gray-400">{pattern.code}</div>
											<div class="text-[10px] text-gray-600">{pattern.name}</div>
										</td>
										{#each pattern.values as val, i}
											<td class="py-1.5 px-2">
												<div class="mx-auto flex h-10 w-14 items-center justify-center rounded-lg text-sm font-bold {getHeatColor(val)} transition-all hover:scale-110">
													{val}
												</div>
											</td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Mobile version -->
					<div class="sm:hidden space-y-4">
						{#each errorPatterns as pattern}
							<div class="rounded-xl border border-white/5 bg-white/[0.02] p-4">
								<div class="mb-3">
									<span class="text-xs font-mono text-gray-400">{pattern.code}</span>
									<span class="text-xs text-gray-500 ml-2">{pattern.name}</span>
								</div>
								<div class="grid grid-cols-3 gap-2">
									{#each pattern.values as val, i}
										<div class="text-center">
											<div class="inline-flex h-8 w-10 items-center justify-center rounded-md text-xs font-bold {getHeatColor(val)}">{val}</div>
											<div class="text-[9px] text-gray-600 mt-0.5">{models[i].short}</div>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>

					<!-- Insight callout -->
					<div class="mt-8 rounded-xl bg-blue-500/5 border border-blue-500/10 p-4 flex gap-3">
						<div class="shrink-0 mt-0.5">
							<svg class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						</div>
						<p class="text-xs text-gray-400">Shinso's multi-pass self-healing pipeline detects and corrects errors during generation. The result: <strong class="text-white">near-zero null reference and scope errors</strong> — the two most costly bugs in production code.</p>
					</div>
				</div>

			<!-- TAB: Testing Rigor -->
			{:else if activeTab === 'rigor'}
				<div class="p-6 sm:p-10">
					<h3 class="text-lg font-semibold text-white mb-2">Testing Rigor Comparison</h3>
					<p class="text-sm text-gray-500 mb-8">Average number of test cases generated per contract. More tests = higher confidence in translation correctness.</p>

					<div class="flex items-end justify-around gap-4 sm:gap-8" style="height: 300px; padding-bottom: 2rem">
						{#each models as m, i}
							<div class="flex-1 max-w-28 flex flex-col items-center gap-2">
								<span class="text-sm sm:text-lg font-bold tabular-nums {m.highlight ? 'text-cyan-400' : 'text-gray-500'}">{m.testsPerContract}×</span>
								<div
									class="w-full rounded-t-lg transition-all duration-1000 {m.highlight ? 'bg-gradient-to-t from-cyan-600 to-cyan-400' : 'bg-white/10'}"
									style="height: {benchmarksVisible ? (m.testsPerContract / 12.4) * 240 : 0}px; transition-delay: {i * 0.1}s; {m.highlight ? 'box-shadow: 0 0 40px rgba(34, 211, 238, 0.2)' : ''}"
								></div>
								<span class="text-[10px] sm:text-xs text-center {m.highlight ? 'text-white font-medium' : 'text-gray-500'}">{m.short}</span>
							</div>
						{/each}
					</div>

					<!-- Dashed line at 1.0 -->
					<div class="ml-0 sm:ml-4 mt-4 flex items-center gap-2 text-xs text-gray-600">
						<div class="flex-1 border-t border-dashed border-gray-700"></div>
						<span>Industry baseline: 1.0× tests per contract</span>
						<div class="flex-1 border-t border-dashed border-gray-700"></div>
					</div>

					<!-- Insight -->
					<div class="mt-8 rounded-xl bg-cyan-500/5 border border-cyan-500/10 p-4 flex gap-3">
						<div class="shrink-0 mt-0.5">
							<svg class="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						</div>
						<p class="text-xs text-gray-400">Shinso generates <strong class="text-white">12.4× more tests per contract</strong> than any other model. This isn't just about accuracy — it's about <strong class="text-white">verifiable confidence</strong> in every translation. Each test is a data point that feeds back into the training pipeline.</p>
					</div>
				</div>
			{/if}
		</div>

		<!-- Language pairs -->
		<div class="fade-in-up mt-10 text-center">
			<div class="text-xs text-gray-600 mb-3 uppercase tracking-wider font-medium">Evaluated Languages</div>
			<div class="flex flex-wrap justify-center gap-2">
				{#each languages as lang}
					<span class="rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-gray-400">{lang}</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ============ DATA ENGINE ============ -->
<section id="data-engine" class="relative border-t border-white/5 py-24 sm:py-32">
	<div class="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/[0.03] blur-[100px]"></div>
	<div class="relative mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">Data Engine</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
				Powering the Next Generation of Code AI
			</h2>
			<p class="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed">
				Frontier models are bottlenecked by data quality. Shinso's transpiler doesn't just translate code — it generates <strong class="text-white">verified, production-grade parallel corpora</strong> at scale. The same engine that outperforms every model becomes the data factory that trains better ones.
			</p>
		</div>

		<div class="fade-in-up mt-16 grid gap-6 grid-cols-1 lg:grid-cols-3">
			<div class="lg:col-span-2 rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/[0.05] to-blue-500/[0.03] p-8 sm:p-10">
				<h3 class="text-xl font-bold text-white mb-2">The Data Flywheel</h3>
				<p class="text-sm text-gray-400 mb-8 max-w-lg">
					Better data → better models → better translations → more data. Shinso creates a compounding advantage that no foundation model lab can replicate internally.
				</p>
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div class="rounded-xl bg-white/5 border border-white/5 p-5">
						<div class="text-2xl font-bold text-cyan-400 mb-1">10M+</div>
						<div class="text-sm font-medium text-white">Verified Code Pairs</div>
						<div class="text-xs text-gray-500 mt-1">High-quality parallel translations across 15+ language pairs, each verified by compilation and test suites.</div>
					</div>
					<div class="rounded-xl bg-white/5 border border-white/5 p-5">
						<div class="text-2xl font-bold text-cyan-400 mb-1">94.2%</div>
						<div class="text-sm font-medium text-white">Compilation Verified</div>
						<div class="text-xs text-gray-500 mt-1">Every generated pair compiles. No garbage data. No hallucinated syntax. Production-grade signal only.</div>
					</div>
					<div class="rounded-xl bg-white/5 border border-white/5 p-5">
						<div class="text-2xl font-bold text-cyan-400 mb-1">8</div>
						<div class="text-sm font-medium text-white">Target Languages</div>
						<div class="text-xs text-gray-500 mt-1">Python, TypeScript, Rust, Go, C++, Java, Solidity, and Move — with more on the roadmap.</div>
					</div>
				</div>
			</div>

			<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
				<h3 class="text-lg font-bold text-white mb-4">Why This Matters</h3>
				<div class="space-y-5">
					<div>
						<div class="flex items-center gap-2 mb-1.5">
							<div class="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
							<span class="text-sm font-medium text-white">For AI Labs</span>
						</div>
						<p class="text-sm text-gray-500 pl-3.5">Train better code models with verified, high-signal parallel data — not noisy web scrapes.</p>
					</div>
					<div>
						<div class="flex items-center gap-2 mb-1.5">
							<div class="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
							<span class="text-sm font-medium text-white">For Enterprise</span>
						</div>
						<p class="text-sm text-gray-500 pl-3.5">Migrate codebases with the only AI that produces output you can actually ship to production.</p>
					</div>
					<div>
						<div class="flex items-center gap-2 mb-1.5">
							<div class="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
							<span class="text-sm font-medium text-white">For Researchers</span>
						</div>
						<p class="text-sm text-gray-500 pl-3.5">Access the largest verified code translation dataset ever created. Purpose-built for advancing code intelligence.</p>
					</div>
				</div>
			</div>
		</div>

		<div class="fade-in-up mt-8 rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
			<div class="shrink-0">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
					<svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>
				</div>
			</div>
			<p class="text-sm text-gray-300 leading-relaxed">
				<strong class="text-white">Scale for code.</strong> Just as Scale AI built the data infrastructure that powered the LLM revolution, Shinso is building the data engine for code intelligence. Our transpiler generates the verified training data that frontier labs need — but can't produce themselves.
			</p>
		</div>
	</div>
</section>

<!-- ============ TECHNOLOGY ============ -->
<section id="technology" class="bg-dots relative border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Technology</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">The Shinso Transpiler</h2>
			<p class="mt-6 text-base sm:text-lg text-gray-400">
				A purpose-built agentic system that translates, verifies, and self-corrects code across languages — producing output that compiles, runs, and passes tests.
			</p>
		</div>

		<div class="fade-in-up mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
			<div class="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.03]">
				<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
					<svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
				</div>
				<h3 class="text-lg font-semibold text-white">Multi-Language Support</h3>
				<p class="mt-3 text-sm leading-relaxed text-gray-400">Translate between Python, TypeScript, Rust, Go, C++, Java, Solidity, and Move with production-grade accuracy across 15+ language pairs.</p>
			</div>
			<div class="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.03]">
				<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
					<svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
				</div>
				<h3 class="text-lg font-semibold text-white">Agentic Self-Healing Pipeline</h3>
				<p class="mt-3 text-sm leading-relaxed text-gray-400">Multi-pass verification with automated error correction. The system iterates until output compiles and passes generated test suites.</p>
			</div>
			<div class="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.03]">
				<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
					<svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>
				</div>
				<h3 class="text-lg font-semibold text-white">3 Years of Curated Training Data</h3>
				<p class="mt-3 text-sm leading-relaxed text-gray-400">Proprietary training corpus built from 3 years of research at University of Houston. Purpose-built for code translation — not general-purpose web scrapes.</p>
			</div>
			<div class="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.03]">
				<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
					<svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				</div>
				<h3 class="text-lg font-semibold text-white">Automated Test Generation</h3>
				<p class="mt-3 text-sm leading-relaxed text-gray-400">Every translation ships with generated test suites. Verify functional equivalence automatically before deployment. No manual QA required.</p>
			</div>
		</div>

		<!-- Pipeline -->
		<div class="fade-in-up mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-10 overflow-x-auto">
			<div class="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Translation Pipeline</div>
			<div class="flex items-center justify-between gap-2 min-w-[600px] sm:min-w-0">
				{#each ['Source Code', 'AST Parse', 'Semantic Map', 'Generate', 'Self-Heal', 'Test', 'Output'] as step, i}
					<div class="flex items-center gap-2 sm:gap-3">
						<div class="flex flex-col items-center">
							<div class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs font-bold {i === 6 ? 'bg-blue-500 text-white' : 'border border-white/10 bg-white/5 text-gray-400'}">
								{i + 1}
							</div>
							<div class="mt-2 text-center text-[10px] sm:text-xs whitespace-nowrap {i === 6 ? 'font-medium text-blue-400' : 'text-gray-600'}">{step}</div>
						</div>
						{#if i < 6}
							<svg class="h-3 w-3 text-gray-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ============ ROADMAP TO 99% ============ -->
<section id="roadmap" class="relative border-t border-white/5 py-24 sm:py-32 overflow-hidden">
	<div class="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.03] blur-[120px]"></div>
	<div class="relative mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-400">Architecture</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Roadmap to 99% Accuracy</h2>
			<p class="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed">
				3 years of competitive advantage. A multi-stage agentic pipeline that combines specialized models, formal verification, and reinforcement learning — each layer compounding accuracy.
			</p>
		</div>

		<!-- Architecture overview — abstracted -->
		<div class="fade-in-up mt-16 grid gap-6 grid-cols-1 lg:grid-cols-3">

			<!-- Left: Multi-Agent Pipeline -->
			<div class="rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.03] p-6 sm:p-8">
				<div class="flex items-center gap-3 mb-5">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
						<svg class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
					</div>
					<h3 class="text-lg font-semibold text-white">Multi-Agent Pipeline</h3>
				</div>
				<p class="text-sm text-gray-400 mb-6">Specialized agents work in sequence — each one handling a different dimension of code translation.</p>
				<div class="space-y-3">
					{#each [
						{ step: 'Security Analysis', desc: 'Detect vulnerabilities and anti-patterns' },
						{ step: 'Repair Planning', desc: 'Architect the optimal translation strategy' },
						{ step: 'Code Generation', desc: 'Produce target-language output' },
						{ step: 'Iterative Refinement', desc: 'Self-correct until compilation succeeds' }
					] as item, i}
						<div class="flex items-start gap-3">
							<div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-[10px] font-bold text-indigo-400">{i + 1}</div>
							<div>
								<div class="text-sm font-medium text-white">{item.step}</div>
								<div class="text-xs text-gray-500">{item.desc}</div>
							</div>
						</div>
						{#if i < 3}
							<div class="ml-3 h-2 border-l border-dashed border-indigo-500/20"></div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Center: Hybrid Verification -->
			<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
				<div class="flex items-center gap-3 mb-5">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
						<svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
					</div>
					<h3 class="text-lg font-semibold text-white">Formal Verification</h3>
				</div>
				<p class="text-sm text-gray-400 mb-6">Every translation is verified through multiple independent signals — not just "does it look right."</p>
				<div class="space-y-3">
					{#each [
						{ step: 'AST & Type Analysis', desc: 'Deep structural parsing of source code' },
						{ step: 'Intermediate Representation', desc: 'Language-agnostic typed IR preserves semantics' },
						{ step: 'Compiler Feedback Loops', desc: 'Real compiler and prover signals guide generation' },
						{ step: 'Agentic Repair Pass', desc: 'Fix anti-patterns and preserve semantic equivalence' }
					] as item, i}
						<div class="flex items-start gap-3">
							<div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[10px] font-bold text-blue-400">{i + 1}</div>
							<div>
								<div class="text-sm font-medium text-white">{item.step}</div>
								<div class="text-xs text-gray-500">{item.desc}</div>
							</div>
						</div>
						{#if i < 3}
							<div class="ml-3 h-2 border-l border-dashed border-blue-500/20"></div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Right: Accuracy Roadmap -->
			<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
				<div class="flex items-center gap-3 mb-5">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
						<svg class="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
					</div>
					<h3 class="text-lg font-semibold text-white">Accuracy Roadmap</h3>
				</div>
				<p class="text-sm text-gray-400 mb-6">6 months from production. Each milestone compounds on the last.</p>

				<!-- Milestone bars -->
				<div class="space-y-4">
					<div>
						<div class="flex items-baseline justify-between mb-1.5">
							<span class="text-xs font-medium text-gray-400">M1 – M2</span>
							<span class="text-lg font-bold text-blue-400">75%</span>
						</div>
						<div class="h-3 w-full rounded-full bg-white/5 overflow-hidden">
							<div class="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400" style="width: 75%"></div>
						</div>
						<p class="text-[11px] text-gray-600 mt-1">Baseline translator + compile loop integration</p>
					</div>
					<div>
						<div class="flex items-baseline justify-between mb-1.5">
							<span class="text-xs font-medium text-gray-400">M3 – M4</span>
							<span class="text-lg font-bold text-indigo-400">85%</span>
						</div>
						<div class="h-3 w-full rounded-full bg-white/5 overflow-hidden">
							<div class="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400" style="width: 85%"></div>
						</div>
						<p class="text-[11px] text-gray-600 mt-1">Agentic repair + formal prover integration</p>
					</div>
					<div>
						<div class="flex items-baseline justify-between mb-1.5">
							<span class="text-xs font-medium text-gray-400">M5 – M6</span>
							<span class="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">90–99%</span>
						</div>
						<div class="h-3 w-full rounded-full bg-white/5 overflow-hidden">
							<div class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400" style="width: 95%"></div>
						</div>
						<p class="text-[11px] text-gray-600 mt-1">RL with compiler signals + model tuning + test harness</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom callout -->
		<div class="fade-in-up mt-8 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.03] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
			<div class="shrink-0">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
					<svg class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
				</div>
			</div>
			<p class="text-sm text-gray-300 leading-relaxed">
				<strong class="text-white">Why this can't be replicated.</strong> Shinso's architecture isn't a prompt wrapper — it's a vertically integrated system of specialized models, proprietary training data, and formal verification built over 3 years. Each layer reinforces the next. Competitors would need to rebuild the entire stack from scratch.
			</p>
		</div>
	</div>
</section>

<!-- ============ TEAM ============ -->
<section id="team" class="relative border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Team</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">World-Class Researchers</h2>
			<p class="mt-6 text-base sm:text-lg text-gray-400">
				Multi-exited founders backed by 3 years of dedicated AI research at the University of Houston.
			</p>
		</div>

		<div class="fade-in-up mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
			{#each team as t}
				<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 text-center">
					<div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
						<span class="text-2xl font-bold text-blue-400">{t.initials}</span>
					</div>
					<h3 class="text-base font-semibold text-white">{t.name}</h3>
					<div class="mt-1 text-sm font-medium text-blue-400">{t.role}</div>
					<p class="mt-3 text-sm leading-relaxed text-gray-500">{t.bio}</p>
					<div class="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1">
						{#each t.logos as logo}
							<span class="text-[11px] font-medium text-gray-600">{logo}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============ RECOGNITION ============ -->
<section class="bg-grid relative border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Recognition</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Peer-Reviewed & Award-Winning</h2>
		</div>

		<div class="fade-in-up mt-16 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
			<div class="glow rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8 text-center">
				<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
					<svg class="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
				</div>
				<h3 class="text-base sm:text-lg font-semibold text-white">ACM Distinguished Paper</h3>
				<p class="mt-2 text-sm text-gray-400">Distinguished Paper of the Year 2025 — the highest honor from the Association for Computing Machinery.</p>
			</div>
			<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 text-center">
				<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
					<svg class="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>
				</div>
				<h3 class="text-base sm:text-lg font-semibold text-white">University of Houston</h3>
				<p class="mt-2 text-sm text-gray-400">3 years of dedicated AI research partnership advancing the state of the art in code translation.</p>
			</div>
			<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 text-center">
				<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
					<svg class="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
				</div>
				<h3 class="text-base sm:text-lg font-semibold text-white">Backed by Leading Investors</h3>
				<p class="mt-2 text-sm text-gray-400">Supported by top-tier investors who believe in the future of AI-powered code intelligence and data infrastructure.</p>
			</div>
		</div>
	</div>
</section>

<!-- ============ CTA ============ -->
<section id="contact" class="relative border-t border-white/5 py-24 sm:py-32">
	<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
	<div class="relative mx-auto max-w-3xl px-6 text-center">
		<div class="fade-in-up">
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">The Data Layer for Code AI</h2>
			<p class="mt-6 text-base sm:text-lg text-gray-400">
				Whether you're training frontier models or migrating enterprise codebases, Shinso delivers the verified code data and translations you need.
			</p>
			<div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<a href="/access" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/25">
					Request Early Access
					<svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
				</a>
				<a href="mailto:research@shinso.ai" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-gray-300 transition-all hover:border-white/20 hover:bg-white/10">
					Read the Paper
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="border-t border-white/5 py-8 sm:py-12">
	<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
		<div class="flex items-center gap-2.5">
			<img src="/icon.svg" alt="Shinso" class="h-6 w-6" />
			<span class="text-sm font-semibold text-gray-500">Shinso AI</span>
		</div>
		<div class="flex items-center gap-4">
			<a href="/terms" class="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms</a>
			<p class="text-xs text-gray-600">© 2025 Shinso AI, Inc. All rights reserved.</p>
		</div>
	</div>
</footer>
