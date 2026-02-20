export type EventItem = {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
};

export const events: EventItem[] = [
    {
        title: "JSConf 2026",
        image: "/images/event1.png",
        slug: "jsconf-2026",
        location: "Berlin, Germany",
        date: "May 15-17, 2026",
        time: "09:00 AM - 06:00 PM"
    },
    {
        title: "React Summit",
        image: "/images/event2.png",
        slug: "react-summit",
        location: "Amsterdam, Netherlands",
        date: "June 12, 2026",
        time: "10:00 AM - 07:00 PM"
    },
    {
        title: "Next.js Conf",
        image: "/images/event3.png",
        slug: "nextjs-conf",
        location: "San Francisco, USA",
        date: "October 24, 2026",
        time: "08:00 AM - 05:00 PM"
    },
    {
        title: "DevOps Days",
        image: "/images/event4.png",
        slug: "devops-days",
        location: "Austin, TX",
        date: "September 10, 2026",
        time: "09:00 AM - 04:30 PM"
    },
    {
        title: "ETH Global Hackathon",
        image: "/images/event5.png",
        slug: "eth-global-hackathon",
        location: "London, UK",
        date: "March 20-22, 2026",
        time: "24 Hours"
    },
    {
        title: "Google I/O 2026",
        image: "/images/event6.png",
        slug: "google-io-2026",
        location: "Mountain View, USA",
        date: "May 20, 2026",
        time: "10:00 AM - 06:00 PM"
    },
    {
        title: "AWS re:Invent",
        image: "/images/event-full.png",
        slug: "aws-reinvent",
        location: "Las Vegas, USA",
        date: "December 1-5, 2026",
        time: "08:00 AM - 08:00 PM"
    }
];
 export default events;