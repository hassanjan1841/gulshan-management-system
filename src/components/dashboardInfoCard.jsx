import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function  DashboardInfoCard({
  avatarImage,
  icon,
  detail,
  iconClassName,
}) {
  return (
    <div className=" bg-muted text-foreground rounded-xl py-3 px-2 sm:min-w-[150px] sm:max-w-[230px] w-full">
      <div className=" flex items-center justify-start sm:justify-center gap-5 max-sm:pl-5 ">
        <div>
          {avatarImage && (
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={avatarImage ? avatarImage : "/placeholder.svg"}
                alt="Profile"
              />
              <AvatarFallback className="text-foreground bg-muted">
                JD
              </AvatarFallback>
            </Avatar>
          )}
          <span
            className={
              "w-16 h-16 rounded-full flex items-center justify-center " +
              iconClassName
            }
          >
            {icon}
          </span>
        </div>
        <div>
          <p>{detail.title}</p>
          <h2>{detail.name}</h2>
        </div>
      </div>
    </div>
  );
}
