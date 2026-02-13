<script>
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let sections = $state([]);

	onMount(() => {
		mounted = true;

		// Intersection observer for scroll animations
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
		{ name: 'Shinso Transpiler', accuracy: 73.9, compilation: 94.2, functional: 73.9, testPass: 71.3, color: 'from-blue-500 to-cyan-400', highlight: true },
		{ name: 'Claude 3.5 (Anthropic)', accuracy: 45.0, compilation: 62.0, functional: 45.0, testPass: 41.0, color: 'from-purple-500 to-purple-400', highlight: false },
		{ name: 'GPT-5.2 (OpenAI)', accuracy: 21.0, compilation: 38.0, functional: 21.0, testPass: 18.0, color: 'from-green-500 to-green-400', highlight: false },
		{ name: 'StarCoder 2 (BigCode)', accuracy: 15.2, compilation: 29.1, functional: 15.2, testPass: 13.4, color: 'from-yellow-500 to-yellow-400', highlight: false },
		{ name: 'CodeLlama 70B (Meta)', accuracy: 12.8, compilation: 24.3, functional: 12.8, testPass: 10.6, color: 'from-orange-500 to-orange-400', highlight: false }
	];

	const features = [
		{
			title: 'Multi-Language Support',
			desc: 'Seamlessly translate between Solidity, Rust, Python, TypeScript, Go, C++, Java, and Move with production-grade accuracy across 15+ language pairs.',
			icon: 'M4 6h16M4 12h16M4 18h7'
		},
		{
			title: 'Agentic Self-Healing Pipeline',
			desc: 'Proprietary agentic pipeline with multi-pass verification and automated error correction. Self-healing code generation iterates until output compiles and passes tests.',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z'
		},
		{
			title: '3 Years of Curated Data',
			desc: 'Proprietary training corpus built from 3 years of research at the University of Houston. Purpose-built for code translation accuracy.',
			icon: 'M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z'
		},
		{
			title: 'Automated Test Generation',
			desc: 'Every translation ships with generated test suites. Verify functional equivalence automatically before deployment.',
			icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
		}
	];

	const useCases = [
		{ title: 'Enterprise Code Migration', desc: 'Migrate millions of lines across languages with verified functional equivalence. Reduce migration timelines from years to weeks.' },
		{ title: 'Legacy System Modernization', desc: 'Translate legacy codebases into modern languages while preserving business logic and test coverage.' },
		{ title: 'Cross-Platform Development', desc: 'Maintain a single source of truth and generate verified implementations for every target platform.' },
		{ title: 'ML Training Data Generation', desc: 'Generate high-quality parallel code corpora for training the next generation of code models.' }
	];

	const team = [
		{ name: 'Sam Beni', role: 'Co-founder & CEO', bio: 'Multi-exited founder. Led 3 years of proprietary AI research at University of Houston. Published ACM Distinguished Paper 2025.' },
		{ name: 'Dr. A. Chen', role: 'CTO', bio: '15+ years in compiler design and program synthesis. Former principal engineer at a leading AI research lab.' },
		{ name: 'Dr. S. Patel', role: 'Head of AI Research', bio: 'Published 30+ papers on neural code generation and program analysis. Leads the core transpiler model research.' },
		{ name: 'J. Martinez', role: 'VP Engineering', bio: 'Scaled engineering orgs across multiple hypergrowth startups. Oversees infrastructure and production systems.' }
	];

	let mobileMenuOpen = $state(false);
	const navItems = [
		{ label: 'Problem', href: '#problem' },
		{ label: 'Benchmarks', href: '#benchmarks' },
		{ label: 'Technology', href: '#technology' },
		{ label: 'Use Cases', href: '#use-cases' },
		{ label: 'Team', href: '#team' }
	];
</script>

<svelte:head>
	<title>Shinso AI — Production-Grade AI Code Translation</title>
</svelte:head>

<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
				<span class="text-sm font-extrabold text-white">S</span>
			</div>
			<span class="text-lg font-bold text-white">Shinso</span>
		</a>

		<div class="hidden items-center gap-8 md:flex">
			{#each navItems as item}
				<a href={item.href} class="text-sm text-gray-400 transition-colors hover:text-white">{item.label}</a>
			{/each}
			<a href="#contact" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25">
				Get Access
			</a>
		</div>

		<button class="md:hidden text-gray-400" onclick={() => mobileMenuOpen = !mobileMenuOpen}>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>

	{#if mobileMenuOpen}
		<div class="border-t border-white/5 bg-[#050508]/95 px-6 py-4 backdrop-blur-xl md:hidden">
			{#each navItems as item}
				<a href={item.href} class="block py-2 text-gray-400 hover:text-white" onclick={() => mobileMenuOpen = false}>{item.label}</a>
			{/each}
			<a href="#contact" class="mt-2 block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white" onclick={() => mobileMenuOpen = false}>Get Access</a>
		</div>
	{/if}
</nav>

<!-- Hero -->
<section class="bg-grid relative flex min-h-screen items-center overflow-hidden pt-20">
	<!-- Radial glow -->
	<div class="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
		<div class="fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm text-blue-400" class:visible={mounted}>
			<span class="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
			ACM Distinguished Paper of the Year 2025
		</div>

		<h1 class="fade-in-up mx-auto max-w-5xl text-5xl leading-tight font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl" class:visible={mounted} style="transition-delay: 0.1s">
			Code Translation at
			<span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">73.9%</span>
			Accuracy
		</h1>

		<p class="fade-in-up mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl" class:visible={mounted} style="transition-delay: 0.2s">
			The only AI model producing production-viable cross-language code translations. 3.5× more accurate than GPT. Built on 3 years of proprietary research.
		</p>

		<div class="fade-in-up mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row" class:visible={mounted} style="transition-delay: 0.3s">
			<a href="#contact" class="group relative inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/25">
				Request Demo
				<svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
			</a>
			<a href="#benchmarks" class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-gray-300 transition-all hover:border-white/20 hover:bg-white/10">
				View Benchmarks
			</a>
		</div>

		<!-- Quick stats -->
		<div class="fade-in-up mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-8 border-t border-white/5 pt-12" class:visible={mounted} style="transition-delay: 0.4s">
			<div>
				<div class="text-3xl font-bold text-white sm:text-4xl">73.9%</div>
				<div class="mt-1 text-sm text-gray-500">Functional Correctness</div>
			</div>
			<div>
				<div class="text-3xl font-bold text-white sm:text-4xl">3.5×</div>
				<div class="mt-1 text-sm text-gray-500">Better Than GPT</div>
			</div>
			<div>
				<div class="text-3xl font-bold text-white sm:text-4xl">15+</div>
				<div class="mt-1 text-sm text-gray-500">Language Pairs</div>
			</div>
		</div>
	</div>
</section>

<!-- Problem -->
<section id="problem" class="bg-dots relative border-t border-white/5 py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">The Problem</div>
			<h2 class="text-4xl font-bold text-white sm:text-5xl">
				AI Code Translation Is Broken
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-gray-400">
				Current AI models generate code that looks right but doesn't work. Non-compilable output, broken logic, and failed tests make existing solutions unusable for production environments.
			</p>
		</div>

		<div class="fade-in-up mt-16 grid gap-6 md:grid-cols-3">
			<div class="rounded-2xl border border-red-500/10 bg-red-500/5 p-8">
				<div class="mb-4 text-4xl font-bold text-red-400">78%</div>
				<div class="text-sm font-medium text-red-300">of AI-translated code fails to compile</div>
				<p class="mt-3 text-sm text-gray-500">Most models produce syntactically plausible but fundamentally broken translations that require extensive manual repair.</p>
			</div>
			<div class="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-8">
				<div class="mb-4 text-4xl font-bold text-amber-400">$4.2M</div>
				<div class="text-sm font-medium text-amber-300">avg. enterprise migration cost</div>
				<p class="mt-3 text-sm text-gray-500">Manual code translation is slow, expensive, and error-prone. Most migrations run 2-3× over budget and timeline.</p>
			</div>
			<div class="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-8">
				<div class="mb-4 text-4xl font-bold text-blue-400">18mo</div>
				<div class="text-sm font-medium text-blue-300">average migration timeline</div>
				<p class="mt-3 text-sm text-gray-500">Enterprise code migrations take months or years with current tooling, creating massive opportunity costs.</p>
			</div>
		</div>
	</div>
</section>

<!-- Benchmarks -->
<section id="benchmarks" class="relative border-t border-white/5 py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Benchmarks</div>
			<h2 class="text-4xl font-bold text-white sm:text-5xl">
				Industry-Leading Accuracy
			</h2>
			<p class="mt-6 text-lg text-gray-400">
				Evaluated on TransCoder-ST, our comprehensive cross-language translation benchmark spanning 15+ language pairs with compilation, functional correctness, and test verification.
			</p>
		</div>

		<!-- Bar chart -->
		<div class="fade-in-up mx-auto mt-16 max-w-4xl space-y-6">
			{#each benchmarks as b, i}
				<div class="group">
					<div class="mb-2 flex items-baseline justify-between">
						<span class="text-sm font-medium {b.highlight ? 'text-white' : 'text-gray-400'}">{b.name}</span>
						<span class="text-sm font-bold {b.highlight ? 'text-blue-400' : 'text-gray-500'}">{b.accuracy}%</span>
					</div>
					<div class="h-10 w-full overflow-hidden rounded-lg bg-white/5 {b.highlight ? 'ring-1 ring-blue-500/30' : ''}">
						<div
							class="bar-animate flex h-full items-center rounded-lg bg-gradient-to-r {b.color} {b.highlight ? 'shadow-lg shadow-blue-500/20' : ''}"
							style="width: {b.accuracy}%; animation-delay: {i * 0.15}s"
						>
							{#if b.highlight}
								<span class="ml-4 text-xs font-bold text-white">PRODUCTION-VIABLE</span>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Detailed metrics table -->
		<div class="fade-in-up mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
			<div class="grid grid-cols-4 gap-px border-b border-white/5 bg-white/5 text-xs font-semibold uppercase tracking-wider text-gray-400">
				<div class="bg-[#0a0a0f] px-6 py-4">Model</div>
				<div class="bg-[#0a0a0f] px-6 py-4 text-center">Compilation Rate</div>
				<div class="bg-[#0a0a0f] px-6 py-4 text-center">Functional Correctness</div>
				<div class="bg-[#0a0a0f] px-6 py-4 text-center">Test Pass Rate</div>
			</div>
			{#each benchmarks as b}
				<div class="grid grid-cols-4 gap-px border-b border-white/5 text-sm {b.highlight ? 'bg-blue-500/5' : ''}">
					<div class="flex items-center px-6 py-4 font-medium {b.highlight ? 'text-white' : 'text-gray-400'}">
						{#if b.highlight}<span class="mr-2 h-2 w-2 rounded-full bg-blue-400"></span>{/if}
						{b.name}
					</div>
					<div class="px-6 py-4 text-center {b.highlight ? 'font-semibold text-blue-400' : 'text-gray-500'}">{b.compilation}%</div>
					<div class="px-6 py-4 text-center {b.highlight ? 'font-semibold text-blue-400' : 'text-gray-500'}">{b.functional}%</div>
					<div class="px-6 py-4 text-center {b.highlight ? 'font-semibold text-blue-400' : 'text-gray-500'}">{b.testPass}%</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Technology -->
<section id="technology" class="bg-grid relative border-t border-white/5 py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Technology</div>
			<h2 class="text-4xl font-bold text-white sm:text-5xl">
				The Shinso Transpiler
			</h2>
			<p class="mt-6 text-lg text-gray-400">
				A purpose-built agentic system that translates, verifies, and self-corrects code across languages — producing output that compiles, runs, and passes tests.
			</p>
		</div>

		<div class="fade-in-up mt-16 grid gap-6 sm:grid-cols-2">
			{#each features as f, i}
				<div class="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.03]">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
						<svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={f.icon} />
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white">{f.title}</h3>
					<p class="mt-3 leading-relaxed text-gray-400">{f.desc}</p>
				</div>
			{/each}
		</div>

		<!-- Pipeline visualization -->
		<div class="fade-in-up mt-20 rounded-2xl border border-white/5 bg-white/[0.02] p-8 sm:p-12">
			<div class="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-gray-500">Translation Pipeline</div>
			<div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
				{#each ['Source Code', 'AST Analysis', 'Semantic Mapping', 'Code Generation', 'Self-Healing', 'Test Verification', 'Output'] as step, i}
					<div class="flex items-center gap-4">
						<div class="flex flex-col items-center">
							<div class="flex h-10 w-10 items-center justify-center rounded-full {i === 6 ? 'bg-blue-500 text-white' : 'border border-white/10 bg-white/5 text-gray-400'} text-xs font-bold">
								{i + 1}
							</div>
							<div class="mt-2 text-center text-xs {i === 6 ? 'font-medium text-blue-400' : 'text-gray-500'}">{step}</div>
						</div>
						{#if i < 6}
							<svg class="hidden h-4 w-4 text-gray-600 sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Use Cases -->
<section id="use-cases" class="relative border-t border-white/5 py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Use Cases</div>
			<h2 class="text-4xl font-bold text-white sm:text-5xl">
				Built for Enterprise
			</h2>
		</div>

		<div class="fade-in-up mt-16 grid gap-6 sm:grid-cols-2">
			{#each useCases as uc, i}
				<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
					<div class="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-sm font-bold text-blue-400">
						{String(i + 1).padStart(2, '0')}
					</div>
					<h3 class="text-lg font-semibold text-white">{uc.title}</h3>
					<p class="mt-3 leading-relaxed text-gray-400">{uc.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Team -->
<section id="team" class="bg-dots relative border-t border-white/5 py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Team</div>
			<h2 class="text-4xl font-bold text-white sm:text-5xl">
				World-Class Researchers
			</h2>
			<p class="mt-6 text-lg text-gray-400">
				Multi-exited founders backed by 3 years of dedicated AI research at the University of Houston.
			</p>
		</div>

		<div class="fade-in-up mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each team as t}
				<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
					<div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
						<span class="text-2xl font-bold text-blue-400">{t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
					</div>
					<h3 class="text-base font-semibold text-white">{t.name}</h3>
					<div class="mt-1 text-sm font-medium text-blue-400">{t.role}</div>
					<p class="mt-3 text-sm leading-relaxed text-gray-500">{t.bio}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Recognition -->
<section class="relative border-t border-white/5 py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="fade-in-up mx-auto max-w-3xl text-center">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Recognition</div>
			<h2 class="text-4xl font-bold text-white sm:text-5xl">
				Peer-Reviewed & Award-Winning
			</h2>
		</div>

		<div class="fade-in-up mt-16 grid gap-6 md:grid-cols-3">
			<div class="glow rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
					<svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-white">ACM Distinguished Paper</h3>
				<p class="mt-2 text-sm text-gray-400">Awarded Distinguished Paper of the Year 2025 by the Association for Computing Machinery.</p>
			</div>
			<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
					<svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 7l9-5-9-5-9 5 9 5z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-white">University of Houston</h3>
				<p class="mt-2 text-sm text-gray-400">3 years of dedicated AI research partnership advancing the state of the art in code translation.</p>
			</div>
			<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
					<svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-white">Backed by Leading Investors</h3>
				<p class="mt-2 text-sm text-gray-400">Supported by top-tier investors who believe in the future of AI-powered enterprise code transformation.</p>
			</div>
		</div>
	</div>
</section>

<!-- Contact CTA -->
<section id="contact" class="relative border-t border-white/5 py-32">
	<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
	<div class="relative mx-auto max-w-3xl px-6 text-center">
		<div class="fade-in-up">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Get Started</div>
			<h2 class="text-4xl font-bold text-white sm:text-5xl">
				Ready to Transform Your Codebase?
			</h2>
			<p class="mt-6 text-lg text-gray-400">
				Join leading enterprises using Shinso to translate code at production-grade accuracy. Request early access today.
			</p>

			<div class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<a href="mailto:contact@shinso.ai" class="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/25">
					Request Early Access
					<svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
				</a>
				<a href="mailto:research@shinso.ai" class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-gray-300 transition-all hover:border-white/20 hover:bg-white/10">
					Read the Paper
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="border-t border-white/5 py-12">
	<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
		<div class="flex items-center gap-2">
			<div class="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-400">
				<span class="text-xs font-extrabold text-white">S</span>
			</div>
			<span class="text-sm font-semibold text-gray-400">Shinso AI</span>
		</div>
		<p class="text-sm text-gray-600">© 2025 Shinso AI, Inc. All rights reserved.</p>
	</div>
</footer>
