'use server';
import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model";
import { unstable_cache } from 'next/cache';



export const getSimilarEventsBySlug = unstable_cache(async (slug: string) => {
    try {
        await connectToDatabase();
        const event = await Event.findOne({ slug }).lean();
        const events = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags }
        }).lean();

        return events.map(event => ({
            ...event,
            _id: event._id.toString()
        }));

    } catch {
        return [];
    }
},
    ["similar-events"],
    { revalidate: 60 }
);