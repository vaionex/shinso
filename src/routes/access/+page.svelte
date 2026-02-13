<script>
	import { onMount } from 'svelte';
	let mounted = $state(false);
	let formState = $state('idle'); // idle | submitting | success
	let formData = $state({ name: '', email: '', company: '', role: '', useCase: '', volume: '', message: '' });

	onMount(() => { mounted = true; });

	function handleSubmit(e) {
		e.preventDefault();
		formState = 'submitting';
		// Simulate — replace with real endpoint
		setTimeout(() => { formState = 'success'; }, 1200);
	}

	const steps = [
		{
			num: '01',
			title: 'Submit Application',
			desc: 'Fill out the request form with details about your organization, use case, and expected volume. Takes less than 2 minutes.',
			icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
		},
		{
			num: '02',
			title: 'Technical Review',
			desc: 'Our team evaluates your application to understand your requirements and ensure Shinso is the right fit. We review use case alignment, security needs, and integration scope.',
			icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'
		},
		{
			num: '03',
			title: 'Approval & Onboarding',
			desc: 'Approved applicants receive API credentials and documentation. Our engineering team schedules a kickoff call to help you integrate and get the most out of the platform.',
			icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
		},
		{
			num: '04',
			title: 'Production Access',
			desc: 'Start translating code at scale with full API access, dedicated support, and SLA guarantees. Ongoing optimization and model updates included.',
			icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'
		}
	];

	const criteria = [
		{ label: 'Enterprise or research organization', desc: 'We prioritize companies and institutions with clear production or research use cases.' },
		{ label: 'Defined code translation needs', desc: 'Active projects requiring cross-language migration, data generation, or code modernization.' },
		{ label: 'Technical integration capacity', desc: 'Engineering team ready to integrate via API. We provide SDKs for Python, TypeScript, and Go.' },
		{ label: 'Data handling compliance', desc: 'Ability to handle code data securely. We offer on-premise and VPC deployment for sensitive codebases.' }
	];

	const faqs = [
		{ q: 'How long does the approval process take?', a: 'Most applications are reviewed within 48 hours. Complex enterprise requests may take up to one week as we evaluate integration requirements.' },
		{ q: 'Is there a free tier or trial?', a: 'Approved applicants receive a sandbox environment with limited volume for evaluation. Full production access is available after the onboarding call.' },
		{ q: 'What use cases are you accepting?', a: 'Enterprise code migration, legacy modernization, ML training data generation, and academic research. We currently focus on organizations with clear production needs.' },
		{ q: 'Can I use Shinso for proprietary code?', a: 'Yes. We offer isolated environments and on-premise deployment. Your code never touches shared infrastructure. All translations are processed in your dedicated instance.' },
		{ q: 'What languages are supported?', a: 'Python, TypeScript, Rust, Go, C++, Java, Solidity, and Move — with more on the roadmap. Contact us if you need a specific language pair.' }
	];
</script>

<svelte:head>
	<title>Get Access — Shinso AI</title>
	<link rel="icon" type="image/svg+xml" href="/icon.svg" />
	<meta name="description" content="Request early access to Shinso's AI code translation platform. Learn about our approval process and start translating code at production-grade accuracy." />
	<meta property="og:title" content="Get Access — Shinso AI" />
	<meta property="og:description" content="Request early access to Shinso's AI code translation platform. Approval-based onboarding for enterprise and research teams." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://shinso.ai/access" />
	<meta property="og:image" content="https://shinso.ai/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Shinso AI" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Get Access — Shinso AI" />
	<meta name="twitter:description" content="Request early access to Shinso's AI code translation platform." />
	<meta name="twitter:image" content="https://shinso.ai/og.png" />
	<meta name="theme-color" content="#050508" />
	<link rel="canonical" href="https://shinso.ai/access" />
</svelte:head>

<!-- Nav (shared) -->
<nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2.5">
			<img src="/icon.svg" alt="Shinso" class="h-8 w-8" />
			<span class="text-lg font-bold text-white tracking-tight">Shinso</span>
		</a>
		<div class="flex items-center gap-6">
			<a href="/" class="text-[13px] text-gray-400 transition-colors hover:text-white hidden sm:block">← Back to Home</a>
			<a href="#apply" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25">Apply Now</a>
		</div>
	</div>
</nav>

<!-- Hero -->
<section class="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-grid overflow-hidden">
	<div class="pointer-events-none absolute top-1/3 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.04] blur-[120px]"></div>
	<div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
		<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm text-blue-400" class:opacity-0={!mounted} class:opacity-100={mounted} style="transition: opacity 0.5s">
			<span class="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
			Limited Early Access
		</div>
		<h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
			Get Access to Shinso
		</h1>
		<p class="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
			Shinso is currently available through an approval process. We work closely with each customer to ensure successful integration and deliver the best results for your specific use case.
		</p>
	</div>
</section>

<!-- How It Works -->
<section class="relative border-t border-white/5 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-3xl text-center mb-16">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Process</div>
			<h2 class="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
			<p class="mt-4 text-gray-400">From application to production in as little as one week.</p>
		</div>

		<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			{#each steps as step, i}
				<div class="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 group hover:border-blue-500/20 hover:bg-blue-500/[0.02] transition-all">
					<!-- Step number -->
					<div class="mb-5 flex items-center gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
							<svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={step.icon} /></svg>
						</div>
						<span class="text-xs font-bold text-blue-500/50 tracking-wider">{step.num}</span>
					</div>
					<h3 class="text-base font-semibold text-white mb-2">{step.title}</h3>
					<p class="text-sm text-gray-500 leading-relaxed">{step.desc}</p>

					<!-- Connector arrow (desktop) -->
					{#if i < 3}
						<div class="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
							<svg class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Approval Criteria -->
<section class="relative border-t border-white/5 py-24 sm:py-32 bg-dots">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-12 lg:gap-20 lg:grid-cols-2 items-start">
			<div>
				<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-400">Approval Criteria</div>
				<h2 class="text-3xl sm:text-4xl font-bold text-white">Who We're Looking For</h2>
				<p class="mt-4 text-gray-400 leading-relaxed">
					Shinso isn't a self-serve API — it's a partnership. We review every application to ensure mutual fit and deliver the highest quality results. Here's what we look for:
				</p>

				<div class="mt-10 space-y-6">
					{#each criteria as c, i}
						<div class="flex gap-4">
							<div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
								<svg class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
							</div>
							<div>
								<div class="text-sm font-semibold text-white">{c.label}</div>
								<div class="text-sm text-gray-500 mt-1">{c.desc}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right: what you get -->
			<div class="rounded-2xl border border-white/5 bg-white/[0.02] p-8 sm:p-10">
				<h3 class="text-lg font-semibold text-white mb-6">What Approved Partners Receive</h3>
				<div class="space-y-5">
					{#each [
						{ title: 'Dedicated API Access', desc: 'Production API keys with rate limits tailored to your volume. SDKs for Python, TypeScript, and Go.', accent: 'blue' },
						{ title: 'Sandbox Environment', desc: 'Isolated testing environment to evaluate translations before going to production.', accent: 'cyan' },
						{ title: 'Engineering Support', desc: 'Direct line to our engineering team. Kickoff call, integration guidance, and ongoing optimization.', accent: 'indigo' },
						{ title: 'Custom Model Tuning', desc: 'For high-volume partners, we fine-tune models on your specific language pairs and coding patterns.', accent: 'purple' },
						{ title: 'SLA & Security', desc: '99.9% uptime SLA. SOC 2 compliant. On-premise and VPC deployment available for sensitive codebases.', accent: 'blue' }
					] as item}
						<div class="flex gap-3">
							<div class="mt-1 h-1.5 w-1.5 rounded-full bg-{item.accent}-400 shrink-0"></div>
							<div>
								<div class="text-sm font-medium text-white">{item.title}</div>
								<div class="text-xs text-gray-500 mt-0.5">{item.desc}</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-8 rounded-xl bg-blue-500/5 border border-blue-500/10 p-4">
					<p class="text-xs text-gray-400 leading-relaxed">
						<strong class="text-white">Typical timeline:</strong> 48h application review → 1 week onboarding → production access. Enterprise contracts with custom SLAs available.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Application Form -->
<section id="apply" class="relative border-t border-white/5 py-24 sm:py-32">
	<div class="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/[0.03] blur-[100px]"></div>
	<div class="relative mx-auto max-w-3xl px-6">
		<div class="text-center mb-12">
			<div class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">Apply</div>
			<h2 class="text-3xl sm:text-4xl font-bold text-white">Request Access</h2>
			<p class="mt-4 text-gray-400">Tell us about your use case. We review every application personally.</p>
		</div>

		{#if formState === 'success'}
			<div class="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 sm:p-12 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
					<svg class="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				</div>
				<h3 class="text-xl font-semibold text-white">Application Submitted</h3>
				<p class="mt-3 text-gray-400 max-w-md mx-auto">Thank you for your interest in Shinso. Our team will review your application and respond within 48 hours.</p>
				<a href="/" class="mt-6 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
					← Back to homepage
				</a>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-10">
				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
						<input id="name" type="text" required bind:value={formData.name}
							class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-blue-500/50 focus:bg-white/[0.07]"
							placeholder="Jane Smith" />
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-300 mb-1.5">Work Email *</label>
						<input id="email" type="email" required bind:value={formData.email}
							class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-blue-500/50 focus:bg-white/[0.07]"
							placeholder="jane@company.com" />
					</div>
					<div>
						<label for="company" class="block text-sm font-medium text-gray-300 mb-1.5">Company / Organization *</label>
						<input id="company" type="text" required bind:value={formData.company}
							class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-blue-500/50 focus:bg-white/[0.07]"
							placeholder="Acme Corp" />
					</div>
					<div>
						<label for="role" class="block text-sm font-medium text-gray-300 mb-1.5">Role</label>
						<input id="role" type="text" bind:value={formData.role}
							class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-blue-500/50 focus:bg-white/[0.07]"
							placeholder="VP Engineering" />
					</div>
				</div>

				<div class="mt-5">
					<label for="useCase" class="block text-sm font-medium text-gray-300 mb-1.5">Primary Use Case *</label>
					<select id="useCase" required bind:value={formData.useCase}
						class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50 focus:bg-white/[0.07] appearance-none"
						style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%236b7280%22 stroke-width=%222%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/></svg>'); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px;">
						<option value="" disabled selected class="bg-[#0a0a12] text-gray-500">Select a use case</option>
						<option value="migration" class="bg-[#0a0a12]">Enterprise Code Migration</option>
						<option value="modernization" class="bg-[#0a0a12]">Legacy System Modernization</option>
						<option value="data" class="bg-[#0a0a12]">ML Training Data Generation</option>
						<option value="crossplatform" class="bg-[#0a0a12]">Cross-Platform Development</option>
						<option value="research" class="bg-[#0a0a12]">Academic Research</option>
						<option value="other" class="bg-[#0a0a12]">Other</option>
					</select>
				</div>

				<div class="mt-5">
					<label for="volume" class="block text-sm font-medium text-gray-300 mb-1.5">Expected Monthly Volume</label>
					<select id="volume" bind:value={formData.volume}
						class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50 focus:bg-white/[0.07] appearance-none"
						style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%236b7280%22 stroke-width=%222%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/></svg>'); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px;">
						<option value="" disabled selected class="bg-[#0a0a12] text-gray-500">Select volume</option>
						<option value="eval" class="bg-[#0a0a12]">Evaluation / Proof of Concept</option>
						<option value="small" class="bg-[#0a0a12]">Under 1,000 translations</option>
						<option value="medium" class="bg-[#0a0a12]">1,000 – 10,000 translations</option>
						<option value="large" class="bg-[#0a0a12]">10,000 – 100,000 translations</option>
						<option value="enterprise" class="bg-[#0a0a12]">100,000+ translations</option>
					</select>
				</div>

				<div class="mt-5">
					<label for="message" class="block text-sm font-medium text-gray-300 mb-1.5">Tell Us More</label>
					<textarea id="message" rows="4" bind:value={formData.message}
						class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-blue-500/50 focus:bg-white/[0.07] resize-none"
						placeholder="What languages are you translating between? What does your current workflow look like? Any specific requirements?"></textarea>
				</div>

				<button
					type="submit"
					disabled={formState === 'submitting'}
					class="mt-8 w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				>
					{#if formState === 'submitting'}
						<svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
						Submitting...
					{:else}
						Submit Application
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
					{/if}
				</button>

				<p class="mt-4 text-center text-xs text-gray-600">
					By submitting, you agree to our <a href="/terms" class="text-blue-400 hover:text-blue-300 underline">terms of service</a>. We'll never share your information with third parties.
				</p>
			</form>
		{/if}
	</div>
</section>

<!-- FAQ -->
<section class="relative border-t border-white/5 py-24 sm:py-32 bg-grid">
	<div class="mx-auto max-w-3xl px-6">
		<div class="text-center mb-12">
			<h2 class="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
		</div>

		<div class="space-y-4">
			{#each faqs as faq}
				<details class="group rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
					<summary class="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-medium text-white hover:bg-white/[0.02] transition-colors list-none">
						{faq.q}
						<svg class="h-4 w-4 text-gray-500 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
					</summary>
					<div class="px-6 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</div>
				</details>
			{/each}
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
