import { Marquee } from "@/components/ui/marquee"
import { useAnnouncements } from '@/hooks/useShopify';

const AnnouncementBar = () => {
  const { data: announcements = [] } = useAnnouncements();

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="flex h-11 w-full items-center overflow-hidden bg-primary text-primary-foreground shadow-sm">
      <Marquee
        repeat={6}
        pauseOnHover
        className="py-2"
      >
        {announcements.map((announcement) => (
          <span
            key={announcement.id}
            className="mx-8 text-sm font-medium "
          >
            {announcement.text}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default AnnouncementBar;
