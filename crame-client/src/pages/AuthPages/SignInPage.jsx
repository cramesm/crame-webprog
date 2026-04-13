import { Link } from 'react-router-dom';
import Button from '../../components/Button';

// Enhancement 1: Make and revise design for the SignInPage
const inputClasses =
    'mt-2 w-full border-2 border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ED1D24] focus:bg-black rounded-none shadow-[2px_2px_0px_transparent] focus:shadow-[4px_4px_0px_#ED1D24]';

const actionButtonClassName = 'w-full rounded-none py-3 text-[11px] tracking-[0.2em] font-black uppercase';

const SignInPage = () => {
    return (
        <div className="bg-black border-l-4 border-[#ED1D24] p-8 sm:p-10 shadow-2xl shadow-red-900/10">
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl uppercase">Sign In Protocol</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400 uppercase tracking-[0.1em]">
                Access authorized personnel files and S.H.I.E.L.D. data archives.
            </p>

            <form className="mt-8 space-y-6">
                <div>
                    <label htmlFor="signin-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
                        Identification Email
                    </label>
                    <input
                        id="signin-email"
                        type="email"
                        placeholder="agent@shield.gov"
                        autoComplete="email"
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="signin-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
                        Security Clearance Code
                    </label>
                    <input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••••"
                        autoComplete="current-password"
                        className={inputClasses}
                    />
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-zinc-500">
                        At least Level 8 clearance required.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm mt-4">
                    <label className="flex items-center gap-3 text-zinc-400 cursor-pointer group">
                        <input type="checkbox" className="h-4 w-4 rounded-none border-2 border-zinc-700 bg-zinc-900 accent-[#ED1D24] appearance-none checked:bg-[#ED1D24] transition-all" />
                        <span className="text-[10px] uppercase tracking-[0.15em] group-hover:text-white transition">Remember Identity</span>
                    </label>
                    <button type="button" className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 transition hover:text-[#ED1D24]">
                        Override Password?
                    </button>
                </div>

                <div className="pt-4 border-t border-zinc-800 mt-8">
                    <Button type="submit" variant="primary" className={`${actionButtonClassName} bg-[#ED1D24] text-white hover:bg-red-700 border-none`}>
                        Initiate Login
                    </Button>
                </div>

                <div className="grid gap-3 pt-4 sm:grid-cols-2">
                    <Button type="button" variant="secondary" className={`${actionButtonClassName} border-2 border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-800 hover:border-zinc-700`}>
                        Log In via StarkNet
                    </Button>
                    <Button type="button" variant="secondary" className={`${actionButtonClassName} border-2 border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-800 hover:border-zinc-700`}>
                        Log In via Wakanda
                    </Button>
                </div>
            </form>

            <div className="mt-10 border-t-2 border-zinc-900 pt-6 text-[10px] uppercase tracking-widest text-zinc-500 text-center">
                Access Denied?{' '}
                <Link to="/auth/signup" className="font-bold text-[#ED1D24] transition hover:text-red-400">
                    Request Clearance
                </Link>
            </div>
        </div>
    );
};

export default SignInPage;