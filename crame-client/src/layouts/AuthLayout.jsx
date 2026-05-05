import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <section className="min-h-screen bg-black text-white">
            <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
                <div className="relative flex items-center justify-center border-b-4 border-[#ED1D24] bg-zinc-950 p-8 sm:p-10 lg:border-b-0 lg:border-r-4 lg:border-[#ED1D24] lg:p-16 overflow-hidden">
                    <img 
                        src="https://comicbook.com/wp-content/uploads/sites/4/2025/06/avengers-end-game-poster.jpg?resize=1536" 
                        alt="Marvel Movie Characters" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale hover:grayscale-0 transition-all duration-[3s]" 
                    />
                    <div className="relative z-10 flex w-full max-w-md items-center justify-center border-4 border-zinc-800 bg-black/80 p-8 sm:p-10 shadow-2xl shadow-red-900/40 transform hover:scale-105 transition duration-500">
                        <div className="flex aspect-video w-full max-w-[18rem] overflow-hidden items-center justify-center p-2">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Marvel_Cinematic_Universe_logo.png/500px-Marvel_Cinematic_Universe_logo.png"
                              alt="Marvel Cinematic Universe Logo"
                              className="w-full h-full object-contain filter drop-shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                <main className="flex items-center bg-zinc-950 px-6 py-10 sm:px-10 lg:px-16">
                    <div className="mx-auto w-full max-w-md">
                        <Outlet />
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AuthLayout;