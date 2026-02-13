import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle, Smartphone, Search, Utensils, Layout } from 'lucide-react';
import { Language, ProjectData } from '../types';
import Button from './Button';

interface ProjectDetailProps {
    project: ProjectData;
    lang: Language;
    onBack: () => void;
}

const CaseStudy: React.FC<ProjectDetailProps> = ({ project, lang, onBack }) => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isHostinec = project.id === 'hostinec';

    if (!isHostinec) {
        return (
            <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl text-white mb-4">Coming Soon</h2>
                <p className="text-slate-400 mb-8">Detail for {project.title[lang]} is being prepared.</p>
                <Button onClick={onBack} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {lang === 'CZ' ? 'Zpět na přehled' : 'Back to Overview'}
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 animate-in fade-in duration-500">

            {/* Navbar Placeholder for visual consistency */}
            <div className="h-20" />

            {/* Header Section */}
            <div className="relative border-b border-slate-800 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-teal-500 hover:text-teal-400 transition-colors mb-8 group font-medium"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        {lang === 'CZ' ? 'Zpět na hlavní stranu' : 'Back to Home'}
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/20 uppercase tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                                Hostinec U Tří Lip
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                                {lang === 'CZ'
                                    ? 'Kompletní digitální transformace tradiční české restaurace. Redesign zaměřený na okamžitou konverzi a lokální SEO dominanci.'
                                    : 'Complete digital transformation of a traditional Czech restaurant. Redesign focused on immediate conversion and local SEO dominance.'}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                                <div className="text-3xl font-bold text-teal-400">100%</div>
                                <div className="text-xs text-slate-500 uppercase mt-1">SEO Score</div>
                            </div>
                            <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                                <div className="text-3xl font-bold text-teal-400">&lt;1s</div>
                                <div className="text-xs text-slate-500 uppercase mt-1">Load Time</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - Specification Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

                {/* 1. SITEMAP */}
                <section className="grid md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-4">
                        <div className="sticky top-32">
                            <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400 mb-6 border border-teal-500/20">
                                <Layout className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                {lang === 'CZ' ? 'Struktura Webu' : 'Sitemap Structure'}
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                {lang === 'CZ'
                                    ? 'Hierarchie navržená pro maximální přehlednost. Žádné zbytečné klikání. Cesta k rezervaci je vždy kratší než 2 sekundy.'
                                    : 'Hierarchy designed for maximum clarity. No unnecessary clicks. The path to reservation is always shorter than 2 seconds.'}
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-8 grid gap-4 sm:grid-cols-2">
                        {[
                            { title: 'Homepage', desc: 'Rozcestník emocí. Okamžitá rezervace. Aktuální denní menu.', active: true },
                            { title: 'Menu (Jídelní lístek)', desc: 'HTML interaktivní formát. Filtrace dle alergenů. Fotografie top 3 jídel.', active: false },
                            { title: 'O nás (Příběh)', desc: 'Lokální dodavatelé, historie budovy, profil šéfkuchaře.', active: false },
                            { title: 'Kontakt', desc: 'Velká mapa, parkování, otevírací doba, rychlé tlačítko pro volání.', active: false },
                        ].map((item, i) => (
                            <div key={i} className={`p-6 rounded-2xl border ${item.active ? 'bg-slate-900 border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.1)]' : 'bg-slate-900/50 border-slate-800'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-teal-500 animate-pulse' : 'bg-slate-600'}`} />
                                    <h3 className="font-bold text-lg text-white">{item.title}</h3>
                                </div>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. WIREFRAME & UX */}
                <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
                    <div className="absolute top-0 right-0 p-32 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">
                                {lang === 'CZ' ? 'UX & Wireframe Homepage' : 'UX & Homepage Wireframe'}
                            </h2>
                        </div>

                        <div className="space-y-8">
                            {/* Hero Segment */}
                            <div className="flex flex-col md:flex-row gap-6 border-b border-slate-800 pb-8">
                                <div className="md:w-1/3">
                                    <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">01. Above The Fold</span>
                                    <h3 className="text-xl font-bold text-white mt-1">Hero Sekce</h3>
                                </div>
                                <div className="md:w-2/3 space-y-3">
                                    <p className="text-slate-300"><strong className="text-white">Copy:</strong> "Poctivá česká kuchyně pod korunami lip."</p>
                                    <p className="text-slate-300"><strong className="text-white">UX Cíl:</strong> Okamžitá emoce (video pozadí čepování piva) + Akce.</p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-slate-950 font-bold rounded-lg text-sm">
                                        CTA: Rezervovat stůl
                                    </div>
                                </div>
                            </div>

                            {/* Menu Teaser */}
                            <div className="flex flex-col md:flex-row gap-6 border-b border-slate-800 pb-8">
                                <div className="md:w-1/3">
                                    <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">02. Engagement</span>
                                    <h3 className="text-xl font-bold text-white mt-1">Menu Teaser</h3>
                                </div>
                                <div className="md:w-2/3 space-y-3">
                                    <p className="text-slate-300">Zobrazení 3 vizuálně nejatraktivnějších jídel (Svíčková, Pečené koleno, Domácí lívance).</p>
                                    <p className="text-sm text-slate-500 italic">Psychologie: Vyvolání chuti k jídlu vede k prokliku na celé menu.</p>
                                </div>
                            </div>

                            {/* Social Proof */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3">
                                    <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">03. Trust</span>
                                    <h3 className="text-xl font-bold text-white mt-1">Social Proof</h3>
                                </div>
                                <div className="md:w-2/3">
                                    <div className="flex gap-4 items-center p-4 bg-slate-950 rounded-lg border border-slate-800 max-w-sm">
                                        <div className="text-yellow-500 flex gap-0.5">★★★★★</div>
                                        <div className="text-slate-300 text-sm font-medium">4.8/5 na Google (320+ recenzí)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. HTML MENU SAMPLE */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="bg-[#fdfbf7] text-slate-900 p-8 rounded-xl shadow-2xl relative rotate-1 font-serif max-w-md mx-auto transform transition-transform hover:rotate-0">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full" />

                            <h3 className="text-center text-2xl font-bold mb-8 border-b-2 border-slate-900 pb-4 tracking-widest uppercase">Jídelní lístek</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-amber-700">Předkrmy</h4>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold">Domácí paštika</span>
                                        <span className="font-bold">145 Kč</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-snug">Z husích jater, s mandlemi, brusinkovým želé a naším kváskovým chlebem.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-amber-700">Hlavní Chody</h4>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold">Kančí guláš</span>
                                        <span className="font-bold">289 Kč</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-snug">Se šípkovou omáčkou, karlovarský knedlík, smažená cibulka.</p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold">Svíčková na smetaně</span>
                                        <span className="font-bold">265 Kč</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-snug">Hovězí zadní, brusinky, šlehačka, houskový knedlík.</p>
                                </div>
                            </div>

                            <div className="mt-8 text-center text-xs text-slate-500 uppercase tracking-widest">
                                Založeno 1924
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-6 border border-amber-500/20">
                            <Utensils className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            {lang === 'CZ' ? 'HTML Menu: Žádné PDF' : 'HTML Menu: No PDF'}
                        </h2>
                        <div className="space-y-4 text-slate-400">
                            <p>
                                Většina restaurací dělá chybu – nahrává menu jako obrázek nebo PDF.
                                <strong>To je špatně.</strong> Mobilní uživatel musí stahovat soubor a zoomovat. Google text nepřečte.
                            </p>
                            <ul className="space-y-3 mt-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <span><strong>Google Indexace:</strong> Vyhledávač přečte "Kančí guláš" a nabídne vás, když to někdo hledá.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <span><strong>Responzivita:</strong> Text se zalomí přesně podle šířky displeje telefonu.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <span><strong>Editace:</strong> Změna ceny trvá vteřinu, není třeba volat grafika.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 4. SEO & TECH */}
                <section className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 border border-blue-500/20">
                            <Search className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">SEO & Technical Excellence</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-white font-bold mb-4">Meta Data Strategy</h3>
                            <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-xs text-slate-400">
                                <div className="mb-2">
                                    <span className="text-purple-400">&lt;title&gt;</span>
                                    <span className="text-white">Hostinec U Tří Lip | Tradiční česká kuchyně v Brodu</span>
                                    <span className="text-purple-400">&lt;/title&gt;</span>
                                </div>
                                <div>
                                    <span className="text-purple-400">&lt;meta name="description"&gt;</span>
                                    <br />
                                    <span className="text-green-400 pl-4">"Poctivé suroviny, tankové pivo a zahrada s atmosférou. Rezervujte si stůl online ještě dnes."</span>
                                    <br />
                                    <span className="text-purple-400">/&gt;</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-4">Structured Data (JSON-LD)</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Implementace <code>Schema.org/Restaurant</code>. Díky tomu Google zobrazí otevírací dobu, cenovou hladinu a hodnocení přímo ve výsledcích vyhledávání (Rich Snippets).
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">Local SEO</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">Google Maps Pack</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">NAP Consistency</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Footer for Detail */}
                <div className="text-center pt-12 pb-12 border-t border-slate-900">
                    <h3 className="text-2xl text-white font-bold mb-6">Líbí se vám tento koncept?</h3>
                    <Button onClick={() => window.location.href = 'mailto:hello@zoneticgroup.com'}>
                        {lang === 'CZ' ? 'Poptat podobný web' : 'Inquire Similar Web'}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default CaseStudy;