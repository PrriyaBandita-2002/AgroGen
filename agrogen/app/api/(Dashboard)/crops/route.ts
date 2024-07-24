import { Types } from "mongoose";
import connect from "../../../../lib/db";
import Crop from "../../../../lib/models/crop";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const crops = await Crop.find();
    return new NextResponse(JSON.stringify(crops), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching crops: ${error.message}`, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newCrop = new Crop(body);
    await newCrop.save();
    return new NextResponse(
      JSON.stringify({ message: "Crop is created", crop: newCrop }),
      { status: 201 } // Use 201 status for a successful resource creation
    );
  } catch (error: any) {
    return new NextResponse(`Error in creating crop: ${error.message}`, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { cropId, newDetails } = body;
    await connect();

    if (!cropId || !newDetails) {
      return new NextResponse(
        JSON.stringify({ message: "ID or new details not provided" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(cropId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid crop ID" }),
        { status: 400 }
      );
    }

    const updatedCrop = await Crop.findOneAndUpdate(
      { _id: new Types.ObjectId(cropId) },
      newDetails,
      { new: true }
    );

    if (!updatedCrop) {
      return new NextResponse(
        JSON.stringify({ message: "Crop not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Crop is updated", crop: updatedCrop }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`Error in updating crop: ${error.message}`, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const cropId = url.searchParams.get("cropId");

    await connect();

    if (!cropId) {
      return new NextResponse(
        JSON.stringify({ message: "Crop ID not provided" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(cropId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid crop ID" }),
        { status: 400 }
      );
    }

    const deletedCrop = await Crop.findByIdAndDelete(cropId);

    if (!deletedCrop) {
      return new NextResponse(
        JSON.stringify({ message: "Crop not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Crop deleted successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`Error in deleting crop: ${error.message}`, { status: 500 });
  }
};
