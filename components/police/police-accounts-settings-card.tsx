import { TwitterScrapperConfig } from "@/types/twitter-config";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SpinnerLoader from "@/components/ui/spinner-loader";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TableCaption } from "@/components/ui/table";
import { DeleteIcon, PenIcon, ImageIcon, CrossIcon, XIcon } from "lucide-react";
import EditTwitterAccountDialog from "@/components/twitter/dialogs/edit-twitter-account-dialog";
import DeleteTwitterAccountDialog from "@/components/twitter/dialogs/delete-twitter-account-dialog";
import AddTwitterAccountDialog from "@/components/twitter/dialogs/add-twitter-account-dialog";

interface TwitterAccountsSettingsCardProps {
  twitterConfig?: TwitterScrapperConfig;
  setTwitterConfig: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}

const PoliceAccountsSettingsCard = ({ twitterConfig, setTwitterConfig }: TwitterAccountsSettingsCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [selectedTwitterAccount, setSelectedTwitterAccount] = useState<string>("");

  async function onSubmit() {
    try {
      setIsLoading(true);
      const res = await axios.post<TwitterScrapperConfig>(
        "https://api.infokanal.com/update-config", {
          ...twitterConfig
        }
      );
      toast({
        variant: "default",
        title: "Updated!",
        description: "Twitter Settings has been updated."
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request."
      });
    } finally {
      setIsLoading(false);
    }
  }

  const openEdit = (username: string) => {
    setSelectedTwitterAccount(username);
    setOpenEditDialog(true);
  }

  const openDelete = (username: string) => {
    setSelectedTwitterAccount(username);
    setOpenDeleteDialog(true);
  }

  const openAdd = () => {
    setOpenAddDialog(true);
  }

  return (
    <>
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center gap-x-4">
              <div className="flex-1">Twitter Accounts</div>
              <Button onClick={openAdd}>Add Twitter Account</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <Table>
            <TableCaption>A list of twitter accounts will be scrapped</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Prefix</TableHead>
                <TableHead>Suffix</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                twitterConfig?.twitter_accounts.map((t) =>
                  <TableRow key={t.username}>
                    <TableCell className="font-medium">{t.username}</TableCell>
                    <TableCell>{t.prefix}</TableCell>
                    <TableCell>{t.suffix}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-row gap-x-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(t.username)}><PenIcon className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" onClick={() => openDelete(t.username)}><XIcon className="h-4 w-4"/></Button>
                      </div>

                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddTwitterAccountDialog  open={openAddDialog} setOpen={setOpenAddDialog} twitterSettings={twitterConfig!} updateTwitterSettings={setTwitterConfig}/>
      <EditTwitterAccountDialog  open={openEditDialog} setOpen={setOpenEditDialog} twitterName={selectedTwitterAccount} twitterSettings={twitterConfig!} updateTwitterSettings={setTwitterConfig}/>
      <DeleteTwitterAccountDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} twitterName={selectedTwitterAccount} twitterSettings={twitterConfig!} updateTwitterSettings={setTwitterConfig}/>

    </>
  );
};

export default PoliceAccountsSettingsCard;