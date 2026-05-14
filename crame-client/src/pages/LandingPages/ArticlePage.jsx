import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleByName } from '../../services/ArticleServices';
import NotFoundPage from '../NotFoundPage';

export default function ArticlePage() {
    const { name } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const { data } = await fetchArticleByName(name);
                setArticle(data);
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setLoading(false);
            }
        };
        loadArticle();
    }, [name]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="animate-pulse text-[#ED1D24] font-black tracking-widest text-2xl">DECRYPTING INTEL...</div>
            </div>
        );
    }

    if (!article) {
        return <NotFoundPage />;
    }

    return (
        <div className="bg-black min-h-screen text-white pt-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="max-w-3xl w-full">
                <h1 className="text-4xl font-black text-[#ED1D24] mb-8 uppercase tracking-wide">
                    {article.title}
                </h1>
                <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
                    {article.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}