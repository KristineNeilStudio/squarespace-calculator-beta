interface AnnouncementBarProps {
  message?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = "The BETA version is best experienced on desktop. Mobile updates coming soon!",
}) => {
  return (
    <div className="bg-accent-redLight text-accent-red py-3 px-4 text-center relative z-50 flex justify-center items-center shadow-sm mb-4">
      <span className="text-sm font-medium font-body">{message}</span>
    </div>
  );
};

export default AnnouncementBar;
