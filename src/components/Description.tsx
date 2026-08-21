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
            <p ref={descriptionRef} className={!expanded ? 'line-clamp-4' : ''}>
                {description}
            </p>

            {showMore && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="mt-2 text-[#49c916] hover:underline"
                >
                    {expanded ? 'See less' : 'See more'}
                </button>
            )}
        </div>
    );
}

export default Description;
