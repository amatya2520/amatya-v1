import { useRef, useState, useEffect } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, PlayCircle, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReviews } from '@/hooks/useShopify';

const MEDIA_MIN_HEIGHT = 260;
const MEDIA_MAX_HEIGHT = 320;

const Testimonials = () => {
  const { data: testimonials = [] } = useReviews();
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const [activeIndex, setActiveIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState<Record<string, number>>({});
  const [videoDurations, setVideoDurations] = useState<Record<string, number>>({});
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});

  const updateActiveIndex = () => {
    const container = scrollRef.current;
    if (!container || testimonials.length === 0) return;
    const cardWidth = container.scrollWidth / testimonials.length;
    const index = Math.round(container.scrollLeft / Math.max(cardWidth, 1));
    setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
  };

  useEffect(() => {
    updateActiveIndex();
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => updateActiveIndex();
    const handleResize = () => updateActiveIndex();

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [testimonials.length]);

  useEffect(() => {
    setMutedVideos((prev) => {
      const next = { ...prev };
      let changed = false;

      testimonials.forEach((testimonial) => {
        if (next[testimonial.id] === undefined) {
          next[testimonial.id] = true;
          changed = true;
        }
      });

      Object.keys(next).forEach((id) => {
        if (!testimonials.find((testimonial) => testimonial.id === id)) {
          delete next[id];
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [testimonials]);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;
      const shouldBeMuted = mutedVideos[id] ?? true;
      if (video.muted !== shouldBeMuted) {
        video.muted = shouldBeMuted;
      }
    });
  }, [mutedVideos]);

  useEffect(() => {
    testimonials.forEach(({ id }) => {
      const video = videoRefs.current[id];
      if (!video) return;
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => undefined);
      }
    });
  }, [testimonials, mutedVideos]);

  if (testimonials.length === 0) {
    return null;
  }

  const handleVideoRef = (id: string) => (element: HTMLVideoElement | null) => {
    videoRefs.current[id] = element;
    if (element) {
      element.muted = mutedVideos[id] ?? true;
      element.playsInline = true;
      const playPromise = element.play();
      if (playPromise) {
        playPromise.catch(() => undefined);
      }
    }
  };

  const handleTimeUpdate = (id: string) => (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (!Number.isNaN(video.duration)) {
      setVideoDurations((prev) =>
        prev[id] === video.duration ? prev : { ...prev, [id]: video.duration }
      );
    }
    setVideoProgress((prev) => ({ ...prev, [id]: video.currentTime }));
  };

  const handleSeek = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value);
    const video = videoRefs.current[id];
    if (video && !Number.isNaN(nextTime)) {
      video.currentTime = nextTime;
    }
    setVideoProgress((prev) => ({ ...prev, [id]: nextTime }));
  };

  const toggleMute = (id: string) => {
    setMutedVideos((prev) => {
      const current = prev[id] ?? true;
      const nextMuted = !current;
      const updated = { ...prev, [id]: nextMuted };
      const video = videoRefs.current[id];
      if (video) {
        video.muted = nextMuted;
        if (video.paused) {
          const playPromise = video.play();
          if (playPromise) {
            playPromise.catch(() => undefined);
          }
        }
      }
      return updated;
    });
  };

  const formatTime = (seconds: number | undefined) => {
    if (!seconds || Number.isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const formatPrice = (value: unknown) => {
    if (typeof value === 'number') {
      return `₹${value.toLocaleString('en-IN')}`;
    }
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.includes('₹') ? value : `₹${value}`;
    }
    return null;
  };

  return (
    <section className="w-full overflow-x-hidden bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container max-w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
          <p className="mx-auto mt-3 max-w-md opacity-80">
            Real stories from our valued customers who trust Amatya
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => {
              const hasVideo = Boolean(testimonial.videoUrl);
              const hasImage = Boolean(testimonial.image);
              const hasMedia = hasVideo || hasImage;
              const isMuted = mutedVideos[testimonial.id] ?? true;
              const duration = videoDurations[testimonial.id] ?? 0;
              const progress = Math.min(videoProgress[testimonial.id] ?? 0, duration || 0);
              const product = testimonial.product;
              const productPrice = product ? formatPrice(product.price) : null;

              return (
                <motion.article
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative flex w-[78vw] max-w-[280px] flex-shrink-0 snap-center flex-col justify-between gap-4 rounded-3xl bg-primary-foreground/10 p-4 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.35)] backdrop-blur-md md:max-w-[300px]"
                >
                  <Quote className="absolute right-4 top-4 h-7 w-7 opacity-10 z-50" />

                  {hasMedia ? (
                    <div className="relative overflow-hidden h-96 rounded-[26px] flex justify-center items-center border border-primary/10 bg-background shadow-lg">
                      <div
                        className="flex items-center justify-center bg-primary-foreground/5"
                        style={{ minHeight: MEDIA_MIN_HEIGHT, maxHeight: MEDIA_MAX_HEIGHT }}
                      >
                        {hasVideo ? (
                          <video
                            ref={handleVideoRef(testimonial.id)}
                            controls={false}
                            playsInline
                            autoPlay
                            loop
                            muted={isMuted}
                            poster={testimonial.videoPreviewImage || testimonial.image}
                            className="h-full w-full object-contain"
                            onTimeUpdate={handleTimeUpdate(testimonial.id)}
                            onLoadedMetadata={handleTimeUpdate(testimonial.id)}
                          >
                            <source src={testimonial.videoUrl} type={testimonial.videoMimeType || 'video/mp4'} />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={testimonial.image}
                            alt={`${testimonial.name}'s review media`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        )}
                      </div>

                      {product && (
                        <Link
                          to={`/product/${product.slug}`}
                          className="group absolute bottom-2 left-[50%] -translate-x-[50%] w-[72%] flex items-center gap-3 rounded-2xl bg-background/95 px-3 py-2 text-foreground shadow-xl shadow-black/15 backdrop-blur transition hover:bg-background"
                        >
                          <div className="h-12 w-12 overflow-hidden rounded-xl bg-primary/10">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-widest text-primary">
                                {product.name.slice(0, 2)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold line-clamp-1">{product.name}</p>
                            {productPrice && <p className="text-[11px] opacity-70">{productPrice}</p>}
                          </div>
                        </Link>
                      )}

                      {hasVideo && (
                        <button
                            type="button"
                            onClick={() => toggleMute(testimonial.id)}
                            className="inline-flex absolute top-4 right-4 h-8 w-8 items-center justify-center rounded-full bg-white/25 text-muted hover:bg-white/35"
                            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                          >
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          </button>
                        // <div className="absolute bottom-4 right-4 flex w-[70%] items-center gap-3 rounded-full bg-background/85 px-3 py-2 text-foreground shadow-lg shadow-black/20 backdrop-blur">
                        //   <input
                        //     type="range"
                        //     min={0}
                        //     max={duration || 1}
                        //     step={0.1}
                        //     value={progress}
                        //     onChange={handleSeek(testimonial.id)}
                        //     className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-primary/20 accent-primary"
                        //   />
                        //   <span className="text-[11px] font-semibold">
                        //     {formatTime(progress)} / {formatTime(duration)}
                        //   </span>
                        // </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 rounded-[26px] border border-dashed border-primary/25 bg-background/60 p-6 text-primary">
                      <PlayCircle className="h-8 w-8 opacity-60" />
                      <p className="text-sm font-medium leading-relaxed opacity-80 line-clamp-3">“{testimonial.text}”</p>
                    </div>
                  )}

                  <div className="rounded-2xl bg-background/85 p-4 text-foreground shadow-lg backdrop-blur">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-golden text-golden" />
                      ))}
                    </div>
                    <p className="mt-3  text-sm font-medium text-primary/90">
                      “{testimonial.text}”
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em]">
                      <span>{testimonial.name}</span>
                      {testimonial.location && <span className="opacity-60">{testimonial.location}</span>}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = scrollRef.current.scrollWidth / testimonials.length;
                    scrollRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-5 bg-primary-foreground' : 'w-2.5 bg-primary-foreground/30'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
