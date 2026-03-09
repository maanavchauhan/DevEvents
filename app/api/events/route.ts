import {NextRequest, NextResponse} from "next/server";
import {v2 as cloudinary} from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const formData = await req.formData();
        // try to parse the form data into a JSON object
        let event;
        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            // status 400: bad request
            return NextResponse.json({message: "Invalid JSON Data Format."}, {status: 400});
        }

        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json({message: "Image file is required."}, {status: 400})
        }
        let tags=JSON.parse(formData.get("tags") as string);
        let agenda=JSON.parse(formData.get("agenda") as string);

        // changing the format of the container holding the bytes.
        // (kind of changing the lang to something clouditionary can read).
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult= await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type:'image',folder:'DevEvent'},(error, result) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve(result);
                }
            }).end(buffer);
        })

        event.image = (uploadResult as {secure_url: string }).secure_url;
        const createdEvent = await Event.create({
            ...event,
            tags:tags,
            agenda:agenda,
        });
        // console.log(formData);
        // status 201: created
        return NextResponse.json({message: "Event Created Successfully.", event: createdEvent}, {status: 201});


    } catch (e){
        console.error(e);
        // status 500: internal server error
        return NextResponse.json({message: "Event Creation Failed.", error: e instanceof Error ? e.message: "Unknown"}, {status:500});
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const events = await Event.find().sort({createdAt:-1});
        return NextResponse.json({message: "Event Fetched Successfully.", events}, {status: 200})
    } catch (e) {
        return NextResponse.json({message: "Event Fetching Failed.", error:e}, {status: 500})
    }
}
