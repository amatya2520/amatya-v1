import { useAnnouncements } from '@/hooks/useShopify';

const AnnouncementBar = () => {
  const { data: announcements = [] } = useAnnouncements();

  if (announcements.length === 0) {
    return null;
  }

  // Duplicate for seamless marquee
  const duplicatedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="sticky top-0 z-50 bg-primary text-primary-foreground py-2.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicatedAnnouncements.map((announcement, index) => (
          <span
            key={`${announcement.id}-${index}`}
            className="mx-8 text-sm font-medium tracking-wide flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-golden" />
            {announcement.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
