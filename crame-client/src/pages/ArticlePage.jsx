import { useParams } from 'react-router-dom';
import articles from '../components/article-content';
import NotFoundPage from './NotFoundPage';

export default function ArticlePage() {
    const { articleId } = useParams();
    
    // Find the current article based on URL
    const article = articles.find(a => a.name === articleId);

    // If article not found, display 404
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