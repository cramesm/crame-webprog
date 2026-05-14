import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserServices';

const inputClasses =
    'mt-2 w-full border-2 border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ED1D24] focus:bg-black rounded-none shadow-[2px_2px_0px_transparent] focus:shadow-[4px_4px_0px_#ED1D24]';

const actionButtonClassName = 'w-full rounded-none py-3 text-[11px] tracking-[0.2em] font-black uppercase';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const id = e.target.id;
        let field = id.replace('signup-', '');
        if (field === 'first-name') field = 'firstName';
        if (field === 'last-name') field = 'lastName';
        
        setForm({ ...form, [field]: e.target.value });
    };

    // Enhancement 3: Implemented functional Agent Registration (SignUp)
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await createUser({
                ...form,
                username: form.email.split('@')[0], // Default username
                type: 'viewer', // Default role for new signups
                isActive: true
            });
            navigate('/auth/signin');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.message || 'Failed to register agent. Network encryption error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black border-l-4 border-[#ED1D24] p-8 sm:p-10 shadow-2xl">
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl uppercase">Register Agent</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400 uppercase tracking-widest">
                Create a new identity profile in the global database network.
            </p>

            {error && (
                <div className="mt-4 p-3 border border-[#ED1D24] bg-red-950/30 text-[#ED1D24] text-[11px] uppercase tracking-widest font-bold">
                    [REGISTRY ERROR]: {error}
                </div>
            )}

            <form onSubmit={handleSignUp} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            required
                            value={form.firstName}
                            onChange={handleChange}
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
                            required
                            value={form.lastName}
                            onChange={handleChange}
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
                        required
                        value={form.email}
                        onChange={handleChange}
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
                        required
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••••"
                        autoComplete="new-password"
                        className={inputClasses}
                    />
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-zinc-500">
                        Must survive Stark tech brute-force decryption. Use symbols.
                    </p>
                </div>

                <div className="pt-4 border-t border-zinc-800 mt-8">
                    <Button type="submit" disabled={loading} variant="primary" className={`${actionButtonClassName} bg-[#ED1D24] text-white hover:bg-red-700 border-none`}>
                        {loading ? 'REGISTERING...' : 'Create Profile'}
                    </Button>
                </div>
            </form>

            <div className="mt-10 border-t-2 border-zinc-900 pt-6 text-[10px] uppercase tracking-widest text-zinc-500 text-center">
                Already hold clearance?{' '}
                <Link to="/auth/signin" className="font-bold text-[#ED1D24] transition hover:text-red-400">
                    Access Portal
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;