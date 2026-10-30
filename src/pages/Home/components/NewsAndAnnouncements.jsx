import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";

import {
    Play,
    Pause,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Newspaper,
} from "lucide-react";

// Exact Content from your image
const newsData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
        title: "House Magazine 'Kshitij' - June, 2026",
        link: "#",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
        title: "House Magazine 'Kshitij' - March, 2026",
        link: "#",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop",
        title: "The December, 2025 issue of Kshitij Magazine",
        link: "#",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
        title: "House Magazine 'Kshitij' - September, 2025",
        link: "#",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        title: "House Magazine 'Kshitij' - June, 2025",
        link: "#",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        title: "House Magazine 'Kshitij' - June, 2025",
        link: "#",
    },
];

const NewsAndAnnouncements = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const scrollRef = useRef(null);
    const isProgrammaticScroll = useRef(false);
    const scrollTimeoutRef = useRef(null);

    const scrollToSlide = useCallback((index) => {
        const container = scrollRef.current;
        if (!container) return;

        const card = container.children[index];
        if (!card) return;

        const maxScroll = container.scrollWidth - container.clientWidth;
        const targetScroll = Math.min(
            card.offsetLeft - container.offsetLeft,
            maxScroll
        );

        isProgrammaticScroll.current = true;

        container.scrollTo({
            left: Math.max(0, targetScroll),
            behavior: "smooth",
        });

        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 700);
    }, []);

    const goToSlide = useCallback(
        (index) => {
            const nextIndex = (index + newsData.length) % newsData.length;
            setCurrentIndex(nextIndex);
            scrollToSlide(nextIndex);
        },
        [scrollToSlide]
    );

    const nextSlide = useCallback(() => {
        goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    // Auto Play
    useEffect(() => {
        if (!isPlaying || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = (prev + 1) % newsData.length;
                scrollToSlide(next);
                return next;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [isPlaying, isHovered, scrollToSlide]);

    // Detect manual scrolling
    const handleScroll = () => {
        if (isProgrammaticScroll.current) return;

        const container = scrollRef.current;
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(container.children).forEach((card, index) => {
            const distance = Math.abs(
                card.offsetLeft - container.offsetLeft - scrollLeft
            );
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        setCurrentIndex(closestIndex);
    };

    useEffect(() => {
        return () => clearTimeout(scrollTimeoutRef.current);
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 ">
            
            {/* Background Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
               
            />

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary-pale/40 blur-3xl" />

            <div className="relative z-10 mx-auto">
                
                {/* Section Heading */}
                <h2 className="mb-10 text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl lg:text-[42px]">
                    News & Announcements
                </h2>

                {/* Slider Container with Arrows on Sides */}
                <div className="relative">
                    
                    {/* LEFT ARROW */}
                    <button
                        type="button"
                        onClick={prevSlide}
                        aria-label="Previous"
                        className="app_card rounded_custom absolute -left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white text-primary-dark transition-all duration-300 hover:border-primary-blue hover:bg-primary-pale/30 hover:text-primary-blue sm:-left-5"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Cards Container */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 py-4"
                    >
                        {newsData.map((news, index) => (
                            <article
                                key={news.id}
                                data-card
                                className="app_card rounded_custom group relative flex w-[320px] shrink-0 snap-start flex-col overflow-hidden bg-white p-5 transition-all duration-300 hover:border-primary-blue hover:shadow-[0_16px_40px_rgba(30,70,130,0.12)]"
                            >
                                {/* Image (Thumbnail Style) */}
                                <div className="relative mb-5 h-[180px] w-full overflow-hidden rounded_custom border border-neutral-grey-01 bg-neutral-linen">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Card Content */}
                                <div className="flex flex-1 flex-col">
                                    
                                    {/* Title */}
                                    <h3 className="mb-4 line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-primary-dark transition-colors duration-300 group-hover:text-primary-blue">
                                        {news.title}
                                    </h3>

                                    {/* Divider */}
                                    <div className="mb-4 h-px w-full bg-neutral-grey-01/30" />

                                    {/* Read More Link */}
                                    <div className="mt-auto">
                                        <a
                                            href={news.link}
                                            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-blue transition-colors duration-200 hover:text-primary-dark"
                                        >
                                            Read More
                                            <ArrowUpRight
                                                size={18}
                                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                            />
                                        </a>
                                    </div>
                                </div>

                                {/* Bottom Hover Accent */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-dark to-primary-light transition-all duration-500 group-hover:w-full" />
                            </article>
                        ))}
                    </div>

                    {/* RIGHT ARROW */}
                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next"
                        className="app_card rounded_custom absolute -right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white text-primary-dark transition-all duration-300 hover:border-primary-blue hover:bg-primary-pale/30 hover:text-primary-blue sm:-right-5"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Play/Pause Button - Bottom Right */}
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsPlaying((prev) => !prev)}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className="app_card rounded_custom flex h-11 w-11 items-center justify-center bg-white text-primary-dark transition-all duration-300 hover:border-primary-blue hover:bg-primary-pale/30 hover:text-primary-blue"
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="mt-4 flex items-center justify-center gap-2.5">
                    {newsData.map((news, index) => (
                        <button
                            key={news.id}
                            type="button"
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentIndex === index
                                    ? "w-6 bg-primary-blue"
                                    : "w-2 bg-neutral-grey-02 hover:bg-primary-sky"
                            }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default NewsAndAnnouncements;