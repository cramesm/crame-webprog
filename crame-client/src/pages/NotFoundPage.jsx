// Enhancement 3: Make a design for the NotFoundPage
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex w-full flex-col min-h-screen bg-black text-white px-4">
            <div className="max-w-4xl w-full mx-auto mt-24 border-4 border-[#ED1D24] bg-zinc-950 p-8 shadow-[12px_12px_0px_#ED1D24] relative overflow-hidden">
                {/* Glitch lines / decorative scanlines */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-zinc-800 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500/20 shadow-[0_0_8px_4px_rgba(237,29,36,0.3)] pointer-events-none"></div>

                <div className="relative z-10">
                    <p className="text-[#ED1D24] text-xs font-black uppercase tracking-[0.3em] mb-2 font-mono">
                        Security Clearance: Level 7 Required
                    </p>
                    <h1 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
                        Error <span className="text-[#ED1D24]">404</span>
                                                                                                                                                              </h1>
                    
                    <div className="bg-[#ED1D24] py-2 px-4 inline-block mb-6">
                        <h2 className="text-black font-bold uppercase tracking-widest text-lg">
                            File Expunged or Classified
                        </h2>
                    </div>

                    <div className="space-y-4 font-mono text-sm sm:text-base text-zinc-400 max-w-2xl">
                        <p>
                            &gt; INITIATING PROTOCOL: DIRECTIVE 0-0-0
                        </p>
                        <p>
                            &gt; ACCESS DENIED. The record you are attempting to access has been <span className="bg-zinc-800 text-transparent px-2">redacted by order of the</span> Director.
                        </p>
                        <p className="opacity-60">
                            &gt; Timeline variance detected. Please report to the nearest TVA operative immediately. Continued attempts to access this sector will result in immediate extraction.
                        </p>
                    </div>

                    <div className="mt-12 flex items-center border-t-2 border-zinc-900 pt-8">
                        <Link 
                            to="/" 
                            className="bg-zinc-900 border-2 border-zinc-700 hover:border-[#ED1D24] hover:bg-[#ED1D24] hover:text-white text-zinc-300 font-bold py-3 px-8 uppercase tracking-widest text-sm transition-all shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none"
                        >
                            Return to Base
                        </Link>
                        <span className="ml-6 text-xs text-zinc-600 font-mono hidden sm:inline-block">
                            [ System Status: Active • Monitoring ]
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}