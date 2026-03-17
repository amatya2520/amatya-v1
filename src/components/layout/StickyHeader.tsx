import AnnouncementBar from './AnnouncementBar';
import Header from './Header';

const StickyHeader = () => {
  return (
    <div className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur">
      <AnnouncementBar />
      <Header />
    </div>
  );
};

export default StickyHeader;
