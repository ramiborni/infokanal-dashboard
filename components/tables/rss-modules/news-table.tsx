"use client";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable, Row
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent, SelectGroup,
  SelectItem, SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon, EraserIcon, LinkIcon, SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import { RssNews } from "@/types/news";
import { useToast } from "@/components/ui/use-toast";
import SpinnerLoader from "@/components/ui/spinner-loader";
import { Source } from "@/types/module";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { Checkbox } from "@/components/ui/checkbox";

interface DataTableProps<TData, TValue> {
  slang: string;
  sources: Source[];
  //data: TData[];
  searchKey: string;
  pageSizeOptions?: number[];
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}



export function NewsTable<TData, TValue>({
                                           sources,
                                           slang,
                                           // data,
                                           searchKey,
                                           pageSizeOptions = [10, 20, 30, 40, 50]
                                         }: DataTableProps<TData, TValue>) {

  const [newsData, setNewsData] = useState<RssNews[]>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [filterSource, setFilterSource] = useState("");

  const { toast } = useToast();



  const updateAllowToSummarize = async (value:any,row: Row<RssNews>) => {
    console.log(value)
    try{
      const res = await axios.put(`${API_URL}/feed/modules/undefined/news/`, {
        feed_id: row.original.feed_id,
        allowed_to_summarize: value
      });


      const updatedItems = newsData.map(item => {
        if (item.feed_id === row.original.feed_id) {
          return { ...item, allowed_to_summarize: value };
        }
        return item;
      });
      setNewsData(
        updatedItems
      )
    }catch (e) {

    }
  }

  const columns: ColumnDef<RssNews>[] = [
    {
      accessorKey: "image_url",
      header: "News Image",
      cell: ({ row }) => (
        <img
          alt="News image"
          className="aspect-post rounded-md object-cover overflow-hidden"
          height={450}
          src={row.original.image_url || "/no-image.jpg"}
          width={450}
        />
      ),
    },
    {
      accessorKey: "rss_feed_source",
      header: "Source",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.rss_feed_source.source_name}</Badge>
      ),
    },
    {
      accessorKey: "feed_title",
      header: "Title"
    },
    {
      accessorKey: "feed_content",
      header: "Content"
    },
    {
      accessorKey: "pub_date",
      header: "Published Date",
      cell: ({row}) => (
        <TableCell className="hidden md:table-cell">

          {dayjs(row.original.pub_date).format("DD.MM.YYYY hh:mm A")}

        </TableCell>
      )
    },
    {
      accessorKey: "allowed_to_summarize",
      header: "Allowed To Summarize",
      cell: ({ row, table }) => (
        <Checkbox
          checked={newsData.find(n => n.feed_id === row.original.feed_id)?.allowed_to_summarize}
          onCheckedChange={(value) => updateAllowToSummarize(value,row)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "feed_item_url",
      header: "News URL",
      cell: ({row, table}) => (
       <a href={row.original.feed_item_url}>
         <Button size="icon" variant="ghost">
           <LinkIcon className="text-primary"/>
         </Button>
       </a>
      )
    }
  ];


  const table = useReactTable<RssNews>({
    data: newsData ?? [],
    //@ts-ignore
    columns,
    pageCount: totalPages ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: { pageIndex, pageSize }
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true
  });




  const getNewsList = async () => {
    try {
      setLoading(true);
      const query = table.getColumn(searchKey)?.getFilterValue() as string || "";
      const res = await axios.get(`${API_URL}/feed/modules/${slang}/news/?source=${filterSource}&query=${query}&page=${pageIndex}&limit=${pageSize}`);
      setNewsData(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't fetch news, please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("USE EFFECT TABLE");
    getNewsList().then();
  }, [pageIndex, pageSize, filterSource]);

  const TableLoading = () => {
    return <div className="flex flex-col py-4 px-0 items-center align-center justify-center">
      <SpinnerLoader></SpinnerLoader>
    </div>;
  };

  const FilledDataTable = () => {
    return <>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </>;
  };


  const updateFilterSource = async (value: string) => {
    setFilterSource(value);
  };

  const resetRssSource = async () => {
    setFilterSource("");
  };

  const SelectSource = () => {
    return (
      <Select value={filterSource} onValueChange={updateFilterSource}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter sources" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <div className="flex flex-row">
              <SelectLabel className="flex-1">Rss Sources</SelectLabel>
            </div>
            {
              sources.map(
                (source) => <SelectItem key={source.source_name} value={source.source_name}>
                  {source.source_name}
                </SelectItem>
              )
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };


  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row gap-x-3">
        <Input
          placeholder={`Search News Titles...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />
        <Button onClick={() => getNewsList()}>
          <SearchIcon /> &nbsp;
          Search
        </Button>
        <div className="flex-1"></div>
        <SelectSource />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={resetRssSource} variant="outline" size="icon">
                <EraserIcon className="text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset Source Filter</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ScrollArea className="rounded-md border h-[calc(80vh-220px)]">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              loading ? <TableLoading /> : <FilledDataTable />
            }
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col gap-2 sm:flex-row items-center justify-end space-x-2 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">
                Rows per page
              </p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
