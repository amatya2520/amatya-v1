import Marquee from "react-fast-marquee";
import { useAnnouncements } from '@/hooks/useShopify';

const AnnouncementBar = () => {
  const { data: announcements = [] } = useAnnouncements();

  if (announcements.length === 0) {
    return null;
  }

  const repeatedAnnouncements = Array(4).fill(announcements).flat();

  return (
    <div className="flex h-11 w-full items-center overflow-hidden bg-primary/90 text-primary-foreground shadow-sm">
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover
        direction="left"
      >
        {repeatedAnnouncements.map((announcement, index) => (
          <span
            key={`${announcement.id}-${index}`}
            className="mx-8 text-sm font-medium whitespace-nowrap"
          >
            {announcement.text}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default AnnouncementBar;
