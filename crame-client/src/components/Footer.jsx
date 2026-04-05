// Enhancement 1: Create and make a design for the Footer
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-zinc-950 border-t-4 border-[#ED1D24] text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-4">The Daily Bugle</h2>
                    <p className="text-sm leading-relaxed">Delivering the hard-hitting truth about masked menaces and global threats since 1939. Uncovering conspiracies and demanding pictures of Spider-Man!</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4">Classified Briefings</h3>
                    <ul className="space-y-3 text-sm font-bold uppercase tracking-wider">
                        <li><Link to="/files/project-insight" className="hover:text-[#ED1D24] transition-colors">Project Insight</Link></li>
                        <li><Link to="/files/gamma-research" className="hover:text-[#ED1D24] transition-colors">Gamma Research</Link></li>
                        <li><Link to="/files/accords-registry" className="hover:text-[#ED1D24] transition-colors">Accords Registry</Link></li>
                        <li><Link to="/restricted-access" className="hover:text-[#ED1D24] transition-colors opacity-50 italic">Top Secret [REDACTED]</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4">Anonymous Tip Line</h3>
                    <p className="text-sm mb-4 leading-relaxed">Did you spot a vigilante tearing up your neighborhood? Got dirt on standard operations? Submit a tip securely.</p>
                    <button className="bg-[#ED1D24] hover:bg-white hover:text-black text-white font-bold py-3 px-6 uppercase text-xs tracking-widest transition-colors w-full sm:w-auto">
                        Submit Tip
                    </button>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t-2 border-zinc-900 text-center text-xs font-bold tracking-widest uppercase opacity-50">
                &copy; {new Date().getFullYear()} The Daily Bugle Communications. Not affiliated with Stark Industries.
            </div>
        </footer>
    );
};

export default Footer;
