import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Switch } from "../ui/switch";
import { Table, TableBody, TableRow, TableCell } from "../ui/table";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "../ui/pagination";

const ModuleNewsList = () => {
  const newsData = [
    {
      imageSrc: "https://generated.vusercontent.net/placeholder.svg",
      badgeVariant: "CNN",
      title: "The World's News at Your Fingertips",
      description:
        "The news you need to know, summarized for you. Get ready to be informed.",
      date: "2023-08-24 10:00 AM",
    },
    {
      imageSrc: "https://generated.vusercontent.net/placeholder.svg",
      badgeVariant: "BBC",
      title: "The Mystery of the Missing Socks",
      description: "Investigating the strange case of disappearing footwear.",
      date: "2023-08-24 10:00 AM",
    },
    {
      imageSrc: "https://generated.vusercontent.net/placeholder.svg",
      badgeVariant: "NYT",
      title: "The Secret to Perfect Pancakes",
      description:
        "Uncovering the breakfast breakthrough that's flipping the culinary world.",
      date: "2023-08-24 10:00 AM",
    },
    {
      imageSrc: "https://generated.vusercontent.net/placeholder.svg",
      badgeVariant: "FOX",
      title: "The Great UFO Cover-Up",
      description:
        "Are extraterrestrial visitors among us? The shocking truth revealed.",
      date: "2023-08-24 10:00 AM",
    },
    {
      imageSrc: "https://generated.vusercontent.net/placeholder.svg",
      badgeVariant: "TWITTER",
      title: "The Power of Hashtags",
      description: "How a simple symbol changed the way we communicate.",
      date: "2023-08-24 10:00 AM",
    },
  ];
  return (
    <>
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>News</CardTitle>
          <CardDescription>Latest news fetched from RSS feed.</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <Table>
            <TableBody>
              {newsData.map((news, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="News image"
                      className="aspect-post rounded-md object-cover overflow-hidden"
                      height={100}
                      src={news.imageSrc}
                      width={100}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{news.badgeVariant}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell className="text-sm">{news.description}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {news.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-row gap-x-2 items-center ">
                      <Label htmlFor={`summarized-${index}`}>Summarize</Label>
                      <Switch id={`summarized-${index}`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="rounded-full"
                          size="icon"
                          variant="ghost"
                        >
                          <DotsHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Read more</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View News</DropdownMenuItem>
                        <DropdownMenuItem>
                          View Summrized Version
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-xs text-muted-foreground">
            Showing&nbsp;
            <strong>1-10</strong> of <strong>32</strong>
            &nbsp;news
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ModuleNewsList;

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
