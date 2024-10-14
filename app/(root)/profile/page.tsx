import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth, Session } from "@clerk/nextjs/server";
import Link from "next/link";

const page = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organisedEvents = await getEventsByUser({ userId, page: 1, limit: 6 });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold">My Tickets</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Explore more events</Link>
          </Button>
        </div>
      </section>
      {/* <section className="wrapper my-8">
    <Collection
          data={events?.data}
          emptyTitle="No event tickets purchased yet."
          emptyStateSubtext="Plenty of events to explore!"
          collectionType="My_Tickets"
          limit={6}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
    </section> */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold">Events Organised</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/events/create">Create a event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={organisedEvents?.data}
          emptyTitle="No events organised yet."
          emptyStateSubtext="Go create some now!"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default page;
