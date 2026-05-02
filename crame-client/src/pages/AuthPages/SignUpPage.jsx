import { Link } from 'react-router-dom';
import Button from '../../components/Button';

// Enhancement 2: Make and revise a design for the SignUpPage
const inputClasses =
    'mt-2 w-full border-2 border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ED1D24] focus:bg-black rounded-none shadow-[2px_2px_0px_transparent] focus:shadow-[4px_4px_0px_#ED1D24]';

const actionButtonClassName = 'w-full rounded-none py-3 text-[11px] tracking-[0.2em] font-black uppercase';

const SignUpPage = () => {
    return (
        <div className="bg-black border-l-4 border-zinc-800 p-8 sm:p-10 shadow-2xl">
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl uppercase">Register Agent</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400 uppercase tracking-widest">
                Create a new identity profile in the global database network.
            </p>

            <form className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            placeholder="Natasha"
                            autoComplete="given-name"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="last-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            type="text"
                            placeholder="Romanoff"
                            autoComplete="family-name"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="signup-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
                        Identification Email
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        placeholder="agent@shield.gov"
                        autoComplete="email"
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="signup-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
                        Security Code
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••••"
                        autoComplete="new-password"
                        className={inputClasses}
                    />
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-zinc-500">
                        Must survive Stark tech brute-force decryption. Use symbols.
                    </p>
                </div>

                <div className="pt-4 border-t border-zinc-800 mt-8">
                    <Button type="submit" variant="primary" className={`${actionButtonClassName} bg-zinc-200 text-black hover:bg-white border-none`}>
                        Create Profile
                    </Button>
                </div>

                <div className="grid gap-3 pt-4 sm:grid-cols-2">
                    <Button type="button" variant="secondary" className={`${actionButtonClassName} border-2 border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-800 hover:border-zinc-700`}>
                        Register via StarkNet
                    </Button>
                    <Button type="button" variant="secondary" className={`${actionButtonClassName} border-2 border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-800 hover:border-zinc-700`}>
                        Register via Wakanda
                    </Button>
                </div>
            </form>

            <div className="mt-10 border-t-2 border-zinc-900 pt-6 text-[10px] uppercase tracking-widest text-zinc-500 text-center">
                Already hold clearance?{' '}
                <Link to="/auth/signin" className="font-bold text-zinc-300 transition hover:text-white">
                    Access Portal
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;