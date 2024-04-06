import { TwitterScrapperConfig } from "@/types/twitter-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PenIcon, XIcon } from "lucide-react";
import AddTwitterCategorySheet from "@/components/twitter/sheets/add-twitter-category-sheet";
import DeleteTwitterRssCategoryDialog from "@/components/twitter/dialogs/delete-twitter-rss-category-dialog";
import EditTwitterCategorySheet from "@/components/twitter/sheets/edit-twitter-category-sheet";

interface TwitterRssCategoriesCardProps{
  twitterConfig: TwitterScrapperConfig;
  setTwitterConfig: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}
const TwitterRssCategoriesCard = ({twitterConfig,setTwitterConfig}: TwitterRssCategoriesCardProps) => {
  const [openAddCategoryDialog,setOpenAddCategoryDialog] = useState(false);
  const [openEditCategoryDialog,setOpenEditCategoryDialog] = useState(false);
  const [openDeleteCategoryDialog,setOpenDeleteCategoryDialog] = useState(false);


  const [selectedRssCategory, setSelectedRssCategory] = useState<string>("");

  const openAddCategory = () => {
    setOpenAddCategoryDialog(true);
  }

  const openEditCategory = (categoryName: string) => {
    setSelectedRssCategory(categoryName);
    setOpenEditCategoryDialog(true);
  }

  const openDeleteCategory = (categoryName: string) => {
    setSelectedRssCategory(categoryName);
    setOpenDeleteCategoryDialog(true);
  }

  return (
    <>
      <Card className="col-span-6 lg:col-span-3 h-full">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center gap-x-4">
              <span className="flex-1">Categories</span>
              <Button onClick={openAddCategory}>Add Category</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of Rss Categories</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Keywords Count</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                twitterConfig?.categories.map((t) =>
                  <TableRow key={t.category_name}>
                    <TableCell className="font-medium">{t.category_name}</TableCell>
                    <TableCell>{t.keywords.length}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-row gap-x-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditCategory(t.category_name)}><PenIcon className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteCategory(t.category_name)}><XIcon className="h-4 w-4"/></Button>
                      </div>

                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddTwitterCategorySheet open={openAddCategoryDialog} setOpen={setOpenAddCategoryDialog} twitterSettings={twitterConfig} updateTwitterSettings={setTwitterConfig}/>
      <EditTwitterCategorySheet open={openEditCategoryDialog} setOpen={setOpenEditCategoryDialog} twitterSettings={twitterConfig} updateTwitterSettings={setTwitterConfig} currentCategoryName={selectedRssCategory}/>
      <DeleteTwitterRssCategoryDialog open={openDeleteCategoryDialog} setOpen={setOpenDeleteCategoryDialog} categoryName={selectedRssCategory} twitterSettings={twitterConfig} updateTwitterSettings={setTwitterConfig}/>
    </>
  )
}

export default TwitterRssCategoriesCard;