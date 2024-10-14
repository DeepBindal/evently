"use client";
import { IEvent } from "@/lib/mongodb/models/event.model";
import { SignedOut, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn } from "@clerk/clerk-react";
import Checkout from "./Checkout";

type CheckOutProps = {
  event: IEvent;
};

const CheckoutButton = ({ event }: CheckOutProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const isOrganizer = event.organizer._id == userId;
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <>
      {hasEventFinished ? (
        <p className="p-2 text-red-500">Sorry cannot buy tickets</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="rounded-full button" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId}/>
          </SignedIn>
        </>
      )}
    </>
  );
};

export default CheckoutButton;
