import { announcements } from '@/data/products';

const AnnouncementBar = () => {
  const duplicatedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicatedAnnouncements.map((announcement, index) => (
          <span
            key={index}
            className="mx-8 text-sm font-medium tracking-wide flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-golden" />
            {announcement}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
