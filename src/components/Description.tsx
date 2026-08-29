import { useEffect, useRef, useState } from 'react';

interface DescriptionProps {
    description?: string;
}

function Description({ description }: DescriptionProps) {
    const [expanded, setExpanded] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const element = descriptionRef.current;
        if (!element) return;
        setShowMore(element.scrollHeight > element.clientHeight);
    }, [description]);

    return (
        <div>
            <p
                ref={descriptionRef}
                className={`text-text-secondary leading-relaxed transition-all duration-300 ${!expanded ? 'line-clamp-4' : ''}`}
            >
                {description}
            </p>

            {showMore && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="mt-3 text-brand hover:text-brand-light transition-colors duration-200 text-sm font-semibold flex items-center gap-1 group"
                >
                    {expanded ? 'See less' : 'See more'}
                    <span className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                        ↓
                    </span>
                </button>
            )}
        </div>
    );
}

export default Description;
