import ExploreBtn from "@/components/ExploreBtn";
import {IEvent} from "@/database";
import EventCard from "@/components/EventCard";
import {notFound} from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventDetailsPage = async ({params}:{params:Promise<{slug:string}>}) => {
    // Destructure the slug from the params object.
    const {slug} = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const {event} = await request.json();
    if (!event) return notFound();


    return (
        <section id="event">
            <h1 className="text-center pb-1">The Hub for Every Dev <br /> Event you can't miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place.</p>
            <ExploreBtn />
            <div className="mt-20 space-y-7">
                <h3>Featured events</h3>
                <ul className='events'>
                    {event && event.length>0 && event.map((event: IEvent) => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>

    )
}
export default EventDetailsPage
