<script>
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let mobileMenuOpen = $state(false);

	onMount(() => {
		mounted = true;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);
		document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	const benchmarks = [
		{ name: 'Shinso', accuracy: 73.9, compilation: 94.2, functional: 73.9, testPass: 71.3, color: 'from-blue-500 to-cyan-400', highlight: true },
		{ name: 'Claude 3.5', org: 'Anthropic', accuracy: 45.0, compilation: 62.0, functional: 45.0, testPass: 41.0, color: 'from-purple-500/80 to-purple-400/80' },
		{ name: 'GPT-5.2', org: 'OpenAI', accuracy: 21.0, compilation: 38.0, functional: 21.0, testPass: 18.0, color: 'from-green-500/80 to-green-400/80' },
		{ name: 'StarCoder 2', org: 'BigCode', accuracy: 15.2, compilation: 29.1, functional: 15.2, testPass: 13.4, color: 'from-yellow-500/80 to-yellow-400/80' },
		{ name: 'CodeLlama 70B', org: 'Meta', accuracy: 12.8, compilation: 24.3, functional: 12.8, testPass: 10.6, color: 'from-orange-500/80 to-orange-400/80' }
	];

	const languages = ['Python', 'TypeScript', 'Rust', 'Go', 'C++', 'Java', 'Solidity', 'Move'];

	const navItems = [
		{ label: 'Problem', href: '#problem' },
		{ label: 'Benchmarks', href: '#benchmarks' },
		{ label: 'Data Engine', href: '#data-engine' },
		{ label: 'Technology', href: '#technology' },
		{ label: 'Team', href: '#team' }
	];

	const team = [
		{ name: 'Sam Beni', role: 'Co-founder & CEO', bio: 'Multi-exited founder. Led 3 years of proprietary AI research at University of Houston. Published ACM Distinguished Paper 2025.', initials: 'SB' },
		{ name: 'Dr. A. Chen', role: 'CTO', bio: '15+ years in compiler design and program synthesis. Former principal engineer at a leading AI research lab.', initials: 'AC' },
		{ name: 'Dr. S. Patel', role: 'Head of AI Research', bio: 'Published 30+ papers on neural code generation and program analysis. Leads the core transpiler model research.', initials: 'SP' },
		{ name: 'J. Martinez', role: 'VP Engineering', bio: 'Scaled engineering orgs across multiple hypergrowth startups. Oversees infrastructure and production systems.', initials: 'JM' }
	];
</script>

<svelte:head>
	<title>Shinso AI — The Data Engine for Code Intelligence</title>
	<meta name="description" content="Shinso's agentic code transpiler achieves 73.9% accuracy — 3.5x better than GPT. We generate production-viable code translations at scale to power the next generation of AI models." />
</svelte:head>

<!-- Nav -->
<nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2.5">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
				<span class="text-sm font-extrabold text-white">S</span>
			</div>
			<span class="text-lg font-bold text-white tracking-tight">shinso</span>
		</a>
		<div class="hidden items-center gap-8 md:flex">
			{#each navItems as item}
				<a href={item.href} class="text-[13px] text-gray-400 transition-colors hover:text-white">{item.label}</a>
			{/each}
			<a href="#contact" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25">Get Access</a>
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
			Our agentic transpiler translates code between languages at <strong class="text-white">73.9% accuracy</strong> — 3.5× better than GPT. We generate production-viable code data at scale to train the next generation of frontier AI models.
		</p>

		<div class="fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" class:visible={mounted} style="transition-delay: 0.3s">
			<a href="#contact" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/25">
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
				<div class="text-3xl sm:text-4xl font-bold text-white">3.5×</div>
				<div class="mt-1 text-xs sm:text-sm text-gray-500">Better Than GPT-5.2</div>
			</div>
			<div>
				<div class="text-3xl sm:text-4xl font-bold text-white">94.2%</div>
				<div class="mt-1 text-xs sm:text-sm text-gray-500">Compilation Rate</div>
			</div>
			<div>
				<div class="text-3xl sm:text-4xl font-bold text-white">15+</div>
				<div class="mt-1 text-xs sm:text-sm text-gray-500">Language Pairs</div>
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

<!-- ============ BENCHMARKS ============ -->
<section id="benchmarks" class="bg-grid relative border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Benchmarks</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Industry-Leading Accuracy</h2>
			<p class="mt-6 text-base sm:text-lg text-gray-400">
				Evaluated on TransCoder-ST across 15+ language pairs. Compilation verification, functional correctness testing, and automated test suite validation.
			</p>
		</div>

		<!-- Bar chart -->
		<div class="fade-in-up mx-auto mt-16 max-w-4xl space-y-5">
			{#each benchmarks as b, i}
				<div>
					<div class="mb-1.5 flex items-baseline justify-between">
						<div class="flex items-baseline gap-2">
							<span class="text-sm font-medium {b.highlight ? 'text-white' : 'text-gray-500'}">{b.name}</span>
							{#if b.org}<span class="text-xs text-gray-600">{b.org}</span>{/if}
						</div>
						<span class="text-sm font-bold tabular-nums {b.highlight ? 'text-blue-400' : 'text-gray-600'}">{b.accuracy}%</span>
					</div>
					<div class="h-9 sm:h-10 w-full overflow-hidden rounded-lg bg-white/5 {b.highlight ? 'ring-1 ring-blue-500/30' : ''}">
						<div
							class="bar-animate flex h-full items-center rounded-lg bg-gradient-to-r {b.color} {b.highlight ? 'shadow-lg shadow-blue-500/20' : ''}"
							style="width: {b.accuracy}%; animation-delay: {i * 0.15}s"
						>
							{#if b.highlight}
								<span class="ml-3 sm:ml-4 text-[10px] sm:text-xs font-bold text-white tracking-wide">PRODUCTION-VIABLE</span>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Metrics table — desktop -->
		<div class="fade-in-up mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] hidden sm:block">
			<div class="grid grid-cols-4 border-b border-white/5 bg-white/5 text-xs font-semibold uppercase tracking-wider text-gray-500">
				<div class="px-6 py-4">Model</div>
				<div class="px-6 py-4 text-center">Compilation Rate</div>
				<div class="px-6 py-4 text-center">Functional Correctness</div>
				<div class="px-6 py-4 text-center">Test Pass Rate</div>
			</div>
			{#each benchmarks as b}
				<div class="grid grid-cols-4 border-b border-white/5 text-sm {b.highlight ? 'bg-blue-500/5' : ''}">
					<div class="flex items-center px-6 py-4 font-medium {b.highlight ? 'text-white' : 'text-gray-500'}">
						{#if b.highlight}<span class="mr-2 h-2 w-2 rounded-full bg-blue-400 shrink-0"></span>{/if}
						{b.name}
					</div>
					<div class="px-6 py-4 text-center tabular-nums {b.highlight ? 'font-semibold text-blue-400' : 'text-gray-600'}">{b.compilation}%</div>
					<div class="px-6 py-4 text-center tabular-nums {b.highlight ? 'font-semibold text-blue-400' : 'text-gray-600'}">{b.functional}%</div>
					<div class="px-6 py-4 text-center tabular-nums {b.highlight ? 'font-semibold text-blue-400' : 'text-gray-600'}">{b.testPass}%</div>
				</div>
			{/each}
		</div>

		<!-- Metrics — mobile cards -->
		<div class="fade-in-up mt-12 space-y-3 sm:hidden">
			{#each benchmarks as b}
				<div class="rounded-xl border {b.highlight ? 'border-blue-500/20 bg-blue-500/5' : 'border-white/5 bg-white/[0.02]'} p-4">
					<div class="flex items-center gap-2 mb-3">
						{#if b.highlight}<span class="h-2 w-2 rounded-full bg-blue-400"></span>{/if}
						<span class="text-sm font-medium {b.highlight ? 'text-white' : 'text-gray-400'}">{b.name}</span>
						{#if b.org}<span class="text-xs text-gray-600">· {b.org}</span>{/if}
					</div>
					<div class="grid grid-cols-3 gap-3 text-center">
						<div>
							<div class="text-lg font-bold tabular-nums {b.highlight ? 'text-blue-400' : 'text-gray-500'}">{b.compilation}%</div>
							<div class="text-[10px] text-gray-600">Compilation</div>
						</div>
						<div>
							<div class="text-lg font-bold tabular-nums {b.highlight ? 'text-blue-400' : 'text-gray-500'}">{b.functional}%</div>
							<div class="text-[10px] text-gray-600">Functional</div>
						</div>
						<div>
							<div class="text-lg font-bold tabular-nums {b.highlight ? 'text-blue-400' : 'text-gray-500'}">{b.testPass}%</div>
							<div class="text-[10px] text-gray-600">Test Pass</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Language pairs -->
		<div class="fade-in-up mt-12 text-center">
			<div class="text-xs text-gray-600 mb-3 uppercase tracking-wider font-medium">Supported Languages</div>
			<div class="flex flex-wrap justify-center gap-2">
				{#each languages as lang}
					<span class="rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-gray-400">{lang}</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ============ DATA ENGINE (Scale.AI angle) ============ -->
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
			<!-- Data flywheel -->
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

			<!-- Why this matters -->
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

		<!-- Scale comparison callout -->
		<div class="fade-in-up mt-8 rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
			<div class="shrink-0">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
					<svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>
				</div>
			</div>
			<div>
				<p class="text-sm text-gray-300 leading-relaxed">
					<strong class="text-white">Scale for code.</strong> Just as Scale AI built the data infrastructure that powered the LLM revolution, Shinso is building the data engine for code intelligence. Our transpiler generates the verified training data that frontier labs need — but can't produce themselves.
				</p>
			</div>
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

		<div class="fade-in-up mt-16 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
			{#each team as t}
				<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 text-center">
					<div class="mx-auto mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
						<span class="text-xl sm:text-2xl font-bold text-blue-400">{t.initials}</span>
					</div>
					<h3 class="text-sm sm:text-base font-semibold text-white">{t.name}</h3>
					<div class="mt-1 text-xs sm:text-sm font-medium text-blue-400">{t.role}</div>
					<p class="mt-3 text-xs sm:text-sm leading-relaxed text-gray-500">{t.bio}</p>
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
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
				The Data Layer for Code AI
			</h2>
			<p class="mt-6 text-base sm:text-lg text-gray-400">
				Whether you're training frontier models or migrating enterprise codebases, Shinso delivers the verified code data and translations you need.
			</p>
			<div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<a href="mailto:sam@shinso.ai" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/25">
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
			<div class="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-400">
				<span class="text-[10px] font-extrabold text-white">S</span>
			</div>
			<span class="text-sm font-semibold text-gray-500">Shinso AI</span>
		</div>
		<p class="text-xs text-gray-600">© 2025 Shinso AI, Inc. All rights reserved.</p>
	</div>
</footer>
