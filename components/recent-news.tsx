import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface RecentNewsItemProps {
  type: string;
  title: string;
  body: string;
  link: string;
}

export function RecentNews() {
  const RecentNewsItem = ({ type, title, body, link }: RecentNewsItemProps) => {
    return (
      <Link href={link} target="_blank" className="">
        <div className="flex items-center py-6 px-2 hover:bg-primary/10 transition-all rounded-lg">
          <Avatar className="h-9 w-9">
            <AvatarFallback>📝</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <Badge>{type}</Badge>
            <div className="text-sm font-medium">{title}</div>
            <p className="text-sm text-muted-foreground">{body}</p>
          </div>
        </div>
      </Link>
    );
  };
  return (
    <div className="space-y-8">
      <RecentNewsItem
        type="Norway News"
        title="Uro og bråk natt til langfredag: Utestedbesøkende havnet i trøbbel."
        body="Både på Beitostølen, Gautefall, Hemsedal og Bømlo skapte berusede
            gjester problemer, og flere endte opp med å bli bortvist eller måtte
            tilbringe natten i arresten..."
        link="https://www.vg.no/nyheter/innenriks/i/769Kmo/fyllebraak-natt-til-langfredag-bortvist-fra-afterski"
      />
    </div>
  );
}
