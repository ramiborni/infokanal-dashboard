import { TwitterScrapperConfig } from "@/types/twitter-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PenIcon, XIcon } from "lucide-react";
import EditPoliceCategorySheet from "@/components/police/sheets/edit-police-category-sheet";


interface PoliceRssCategoriesCardProps{
  twitterConfig: TwitterScrapperConfig;
  setTwitterConfig: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}
const PoliceRssCategoriesCard = ({twitterConfig,setTwitterConfig}: PoliceRssCategoriesCardProps) => {
  const [openEditCategoryDialog,setOpenEditCategoryDialog] = useState(false);


  const [selectedRssCategory, setSelectedRssCategory] = useState<string>("");

  const openEditCategory = (categoryName: string) => {
    setSelectedRssCategory(categoryName);
    setOpenEditCategoryDialog(true);
  }

  return (
    <>
      <Card className="col-span-6 lg:col-span-3 h-full">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center gap-x-4">
              <span className="flex-1">Categories</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of Rss Categories</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Municipalities Count</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                twitterConfig?.categories.map((t) =>
                  <TableRow key={t.category_name}>
                    <TableCell className="font-medium">{t.category_name}</TableCell>
                    <TableCell>{t.police_municipalities.length}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-row gap-x-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditCategory(t.category_name)}><PenIcon className="h-4 w-4"/></Button>
                      </div>

                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <EditPoliceCategorySheet open={openEditCategoryDialog} setOpen={setOpenEditCategoryDialog} twitterSettings={twitterConfig} updateTwitterSettings={setTwitterConfig} currentCategoryName={selectedRssCategory}/>
    </>
  )
}

export default PoliceRssCategoriesCard;