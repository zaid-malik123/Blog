"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

const RecentArticles = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All →
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Article Title</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Published
                </span>
              </TableCell>
              <TableCell>12</TableCell>
              <TableCell>Apr 8, 2026</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/dashboard/articles/12/edit`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                  <DeleteBtn/>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentArticles;

const DeleteBtn = () => {
  return (
    <form>
      <Button variant={"ghost"} size={"sm"} type="submit">Delete</Button>
    </form>
  )
}